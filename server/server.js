const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
var oracledb = require('oracledb');
var dbconfig = require('../server/dbConfig');
const { connectString } = require("../server/dbConfig");

const app = express();
const port = 3030; // react의 기본값은 3000이니까 3000이 아닌 아무 수

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.autoCommit = true;

app.get('/select', async function (request, response) {
    try {
        let conn = await oracledb.getConnection(dbconfig);
        let result = await conn.execute("select * from test");

        dataStr = JSON.stringify(result);
        arrStr = JSON.stringify(result.rows);
        var arr = JSON.parse(arrStr);

        console.log(arr);
        console.log(arrStr);

        conn.release(response.send(arr));
    } catch (err) {
        console.log(err);
        conn.release();
        response.send(err);
    }
})


app.get('/', (req, res) => {
    res.send('test')
})

app.post("/signIn", async (req, res) => {
    try {
        console.log(req.body)
        let conn = await oracledb.getConnection(dbconfig);

        let sql = "select member_id, web_id from member where web_id = :web_id and password = :password";
        let data = [
            req.body.signIn_ID,
            req.body.signIn_PW
        ]

        let result = await conn.execute(sql, data);

        dataStr = JSON.stringify(result);
        arrStr = JSON.stringify(result.rows);
        var arr = JSON.parse(arrStr);
        console.log(dataStr);

        conn.release(res.send(arrStr));
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});


app.post("/join", async (req, res) => {
    try {
        let conn = await oracledb.getConnection(dbconfig);

        let sql = "INSERT INTO member" + " values(member_seq.NEXTVAL,:web_id,:password,:email,:phone,:ok_ad)";
        let data = [
            req.body.web_id,
            req.body.password,
            req.body.email,
            req.body.phone,
            req.body.ok_ad
        ]

        let result = await conn.execute(sql, data);

        dataStr = JSON.stringify(result);
        arrStr = JSON.stringify(result.rowsAffected);
        var arr = JSON.parse(arrStr);
        console.log(arr);

        conn.release(res.send(arr));
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

app.get("/menu_list", async (req, res) => {
    const reqMenu = req.query.MENU;
    try {
        console.log(reqMenu);
        let conn = await oracledb.getConnection(dbconfig);
        let sql
        if (reqMenu === '0') {
            sql = "select MENU_ID, CATEGORY_ID, M_TITLE, M_PRICE, IMG_URL from menu";
        } else {
            sql = "select MENU_ID, CATEGORY_ID, M_TITLE, M_PRICE, IMG_URL from menu where category_id =" + reqMenu;
        }
        console.log(sql);
        let result = await conn.execute(sql);

        dataStr = JSON.stringify(result);
        arrStr = JSON.stringify(result.rows);
        var arr = JSON.parse(arrStr);
        console.log(dataStr);

        conn.release(res.send(arrStr));
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

app.get("/menu", async (req, res) => {
    try {
        console.log(req.body)
        let conn = await oracledb.getConnection(dbconfig);

        let sql = "select * from category";
        let result = await conn.execute(sql);

        dataStr = JSON.stringify(result);
        arrStr = JSON.stringify(result.rows);
        var arr = JSON.parse(arrStr);
        console.log(dataStr);

        conn.release(res.send(arrStr));
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

app.get("/detail", async (req, res) => {
    const menu_id = req.query.menu_id;
    try {
        console.log(menu_id);
        let conn = await oracledb.getConnection(dbconfig);

        let sql = "select * from menu where menu_id =" + menu_id;
        let result = await conn.execute(sql);
        let detail = result.rows;

        let result2 = await conn.execute("select sub_menu_id from menu_sub_menu where menu_id =" + menu_id);
        const sub_id_list = [];
        result2.rows.forEach((item, index) => {
            sub_id_list.push(item.SUB_MENU_ID);
        })

        let result3;
        const sub_list = [];
        for await (const item of sub_id_list) {
            result3 = await conn.execute("select * from sub_menu where sub_menu_id =" + item);
            sub_list.push(result3.rows[0]);
        }

        detail.push(sub_list);
        arrStr = JSON.stringify(detail);

        console.log(JSON.parse(arrStr));

        conn.release(res.send(arrStr));
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})

app.post("/order", async (req, res) => {
    try {
        console.log(req.body);
        let conn = await oracledb.getConnection(dbconfig);

        let sql = " INSERT INTO receipt" + " VALUES(receipt_seq.NEXTVAL, :MEMBER_ID, :MENU_ID, SYSDATE)" + " RETURNING RECEIPT_ID INTO :R_ID";
        let data = {
            MEMBER_ID: Number(req.body.member_id),
            MENU_ID: req.body.menu_id,
            R_ID: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
        }

        console.log(data);

        let result = await conn.execute(sql, data);

        console.log(result.outBinds.R_ID[0]);
        let result2;
        for await (const item of req.body.sub_list) {
            let sql2 = " INSERT INTO RECEIPT_SUB_MENU" + " VALUES(receipt_sub_menu_seq.NEXTVAL, :RECEIPT_ID, :SUB_MENU_ID)";
            let data2 = {
                RECEIPT_ID: result.outBinds.R_ID[0],
                SUB_MENU_ID: item
            }

            console.log(data2);

            result2 = await conn.execute(sql2, data2);
        }
        console.log(result2);

        dataStr = JSON.stringify(result2);
        arrStr = JSON.stringify(result2.rowsAffected);
        var arr = JSON.parse(arrStr);
        console.log(arr);

        conn.release(res.send(result2));
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

app.listen(port, () => {
    console.log(`Connect at https://localhost:${port}`);
})