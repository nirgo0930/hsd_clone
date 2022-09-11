import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import HeadUI from "./HeadUI";

let main_price = 0;
let add_total = 0;
let total = main_price + add_total;
let sub_check_list = [];

function isChecked(input, price) {
    var remember = document.getElementById("sub_checkbox_" + input);
    if (remember.checked) {
        add_total += price;
        total = main_price + add_total;
        document.getElementById("add_price").innerText = "(+" + add_total + ")";
        document.getElementById("total_price").innerText = total + "원";
        sub_check_list.push(input);
    } else {
        add_total -= price;
        total = main_price + add_total;
        document.getElementById("add_price").innerText = "(+" + add_total + ")";
        document.getElementById("total_price").innerText = total + "원";
        const idx = sub_check_list.indexOf(input);
        sub_check_list.splice(idx, 1);
    }
    console.log(sub_check_list);
}

function Detail() {
    const navigate = useNavigate();
    const state = useLocation().state;
    main_price = 0;
    add_total = 0;
    total = main_price + add_total;
    sub_check_list = [];
    sub_check_list = [];
    axios.get("http://localhost:3030/detail", {
        params: {
            menu_id: state.menu_id
        }
    })
        .then((response) => {
            document.getElementById("datail-content").remove();
            let newContent = document.createElement("div");
            newContent.id = "detail-content";

            let detail_data = response.data[0];
            let sub_data = response.data[1];

            console.log(response.data);

            document.getElementById("detail-img").src = "images/" + detail_data.IMG_URL;

            let title = document.createElement("h3");
            title.innerHTML = detail_data.M_TITLE;
            newContent.appendChild(title);

            let info = document.createElement("p");
            info.innerHTML = "<br/>" + detail_data.INFO + "<br/><br/>";
            newContent.appendChild(info);

            sub_data.forEach((item) => {
                let sub_item = document.createElement("div");
                sub_item.className = "sub_item";
                sub_item.id = "sub_item_" + item.SUB_MENU_ID;

                let sub_item_check = document.createElement("input");
                sub_item_check.type = "checkbox";
                sub_item_check.className = "sub_item_check";
                sub_item_check.id = "sub_checkbox_" + item.SUB_MENU_ID;
                sub_item_check.onchange = (event) => { isChecked(item.SUB_MENU_ID, item.SUB_PRICE) };

                let sub_item_title = document.createElement("p");
                sub_item_title.innerHTML = item.SUB_TITLE;

                let sub_item_price = document.createElement("span");
                sub_item_price.className = "price_text";
                sub_item_price.innerText = "+" + item.SUB_PRICE + "원";

                sub_item.appendChild(sub_item_check);
                sub_item.appendChild(sub_item_title);
                sub_item.appendChild(sub_item_price);

                newContent.appendChild(sub_item);
            })

            newContent.appendChild(document.createElement("hr"));

            let price = document.createElement("div");
            price.id = "main_price";
            main_price = detail_data.M_PRICE;
            price.innerText = detail_data.M_PRICE;

            let add_price = document.createElement("span");
            add_price.id = "add_price";
            add_price.className = "price_text";
            add_price.innerText = "(+" + add_total + ")"

            let total_price = document.createElement("span");
            total_price.id = "total_price";
            total_price.innerText = (detail_data.M_PRICE + add_total) + "원";


            price.appendChild(add_price);
            price.appendChild(total_price);
            newContent.appendChild(price);

            let order_container = document.createElement("div");
            order_container.id = "order_container";

            let order_btn = document.createElement("button");
            order_btn.id = "order_btn";
            order_btn.className = "btn";
            order_btn.innerText = "구매하기";
            order_btn.onclick = () => {
                axios.post("http://localhost:3030/order", {
                    member_id: sessionStorage.getItem('member_ID'),
                    menu_id: state.menu_id,
                    sub_list: sub_check_list
                })
                    .then((response) => {
                        if (response.status === 200) {
                            alert("주문 성공");
                        } else {
                            alert("Error : " + response.status + "/" + response.status);
                        }
                        navigate('/');
                    });

            }

            order_container.appendChild(order_btn);
            newContent.appendChild(order_container);

            document.getElementById("detail-body").appendChild(newContent);
        })


    return (
        <div className="container">
            <HeadUI></HeadUI>
            <div id="detail-container">
                <div id="detail-head">
                    <h1 onClick={() => navigate(-1)}>← 전체 메뉴</h1>
                </div>
                <div id="detail-body">
                    <img id="detail-img"></img>
                    <div id="datail-content"></div>
                </div>
            </div>
        </div>
    );
}

export default Detail;