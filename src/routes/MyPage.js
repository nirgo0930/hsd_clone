import axios from "axios";
import { useNavigate } from "react-router-dom";
import HeadUI from "./HeadUI";

function MyPage() {
    let navigate = useNavigate();

    const info = {
        member_ID: sessionStorage.getItem('member_ID'),
    }

    axios.post("http://localhost:3030/myInfo", info)
        .then((response) => {
            console.log(response.data);

            if (document.getElementById("table_body")!=null) {
                document.getElementById("table_body").remove();
            }

            let t_body = document.createElement("tbody");
            t_body.id = "table_body";
            for (const [index, item] of (response.data).entries()) {
                let content = document.createElement("tr");

                let id = document.createElement("th");
                id.scope = "row";
                id.innerText = item.RECEIPT_ID;

                let detail = document.createElement("td");
                detail.innerText = item.DETAIL;

                let price = document.createElement("td");
                price.innerText = item.SUM;

                let date = document.createElement("td");
                date.innerText = item.RECEIPT_DATE;

                content.appendChild(id);
                content.appendChild(detail);
                content.appendChild(price);
                content.appendChild(date);

                t_body.appendChild(content);
            }

            document.getElementById("t_main").appendChild(t_body);
        });

    return (
        <div className="container">
            <HeadUI></HeadUI>
            <div id="myInfo">
                <h1>구매내역</h1>
                <hr /><br />
                <table className="table" id="t_main">
                    <thead>
                        <tr>
                            <th scope="col">주문번호</th>
                            <th scope="col">상세내역</th>
                            <th scope="col">구매금액</th>
                            <th scope="col">주문일자</th>
                        </tr>
                    </thead>
                </table>

            </div>
        </div>
    );
}

export default MyPage;