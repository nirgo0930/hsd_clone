import HeadUI from "./HeadUI";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

let navigate;

function sideBar() {
    axios.get("http://localhost:3030/menu")
        .then((response) => {
            let body = document.getElementById("sideBar_Body");
            body.remove();

            let newBody = document.createElement("div");
            newBody.id = "sideBar_Body";
            document.getElementById("sideBar").appendChild(newBody);

            response.data.forEach((item) => {
                if (item.PARENT === null) {
                    let doc = document.createElement("div");
                    doc.className = "accordion-item";
                    doc.id = "cID_" + item.CATEGORY_ID;

                    let tempHead = document.createElement("h2");
                    tempHead.className = "accordion-header";
                    tempHead.id = "Head_" + item.CATEGORY_ID;

                    let tempHeadBtn = document.createElement("button");
                    tempHeadBtn.id = "HBtn_" + item.CATEGORY_ID;
                    tempHeadBtn.className = "accordion-button";
                    tempHeadBtn.type = "button";

                    tempHeadBtn.innerText = item.C_TITLE;

                    tempHead.appendChild(tempHeadBtn);
                    doc.appendChild(tempHead);

                    newBody.appendChild(doc);
                } else {
                    let tempHeadBtn = document.getElementById("HBtn_" + item.PARENT);
                    tempHeadBtn.setAttribute("data-bs-toggle", "collapse");
                    tempHeadBtn.setAttribute("data-bs-target", (".Parent_" + item.PARENT));
                    let tempAtt = "";
                    if (tempHeadBtn.getAttribute("aria-controls") != null) {
                        tempAtt = tempHeadBtn.getAttribute("aria-controls")
                    }
                    tempHeadBtn.setAttribute("aria-controls", tempAtt + " Collapse_" + item.CATEGORY_ID);
                    tempHeadBtn.setAttribute("aria-expanded", "false");

                    let tempBodyContainer = document.createElement("div");
                    tempBodyContainer.className = "accordion-collapse collapse show Parent_" + item.PARENT;
                    tempBodyContainer.id = "Collapse_" + item.CATEGORY_ID;
                    tempBodyContainer.setAttribute("aria-labelledby", "Head_" + item.PARENT);
                    tempBodyContainer.setAttribute("data-parent", "#sideBar");

                    let tempBody = document.createElement("div");
                    tempBody.className = "accordion-body";
                    tempBody.innerText = item.C_TITLE;
                    tempBody.onclick = (() => { requestMenu(item.CATEGORY_ID) })

                    tempBodyContainer.appendChild(tempBody);
                    document.getElementById("cID_" + item.PARENT).appendChild(tempBodyContainer);
                }

            });
            requestMenu(0);
        });
}

function requestMenu(select) {
    let selectMenu = document.getElementById("Collapse_" + select);
    // console.log("selectMenu() called : " + selectMenu);

    document.getElementById("Category1").innerText = selectMenu.parentNode.childNodes[0].innerText;
    document.getElementById("Category2").innerText = selectMenu.innerText;

    axios.get("http://localhost:3030/menu_list", {
        params: {
            MENU: select
        }
    })
        .then((response) => {
            console.log(response.data);
            setList(response.data)
        });
}

function setList(data) {
    let list_container = document.getElementById("Menu_Body");
    let list = document.getElementById("Menu_List");
    list.remove();

    let newList = document.createElement("div");
    newList.id = "Menu_List";
    newList.className = "row";

    data.map((item) => {
        console.log(item);
        let card = document.createElement("div");
        card.className = "card"


        card.onclick = (() => {
            navigate('/Menu_Detail', { state: { menu_id: item.MENU_ID } });
        });


        let cardBody = document.createElement("div");
        cardBody.className = "card-body";

        let c_img = document.createElement("img");
        c_img.className = "card-img";
        c_img.src = "images/" + item.IMG_URL;

        let c_title = document.createElement("h5");
        c_title.className = "card-title";
        c_title.innerText = item.M_TITLE;

        let c_price = document.createElement("p");
        c_price.className = "card-text";
        c_price.innerText = item.M_PRICE;

        cardBody.appendChild(c_img);
        cardBody.appendChild(c_title);
        cardBody.appendChild(c_price);
        card.appendChild(cardBody);

        newList.appendChild(card);
    })

    list_container.appendChild(newList);
}

export default function Menu() {
    navigate = useNavigate();
    sideBar()

    return (
        <div className="container">
            <HeadUI></HeadUI>
            <div id="menu_container">
                <div id="Menu_Side">
                    <div className="accordion" id="sideBar">
                        <div className="accordion-item" id="cID_0">
                            <h2 className="accordion-header" id="Head_0">
                                <button id="HBtn_0" className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target=".Parent_0" aria-controls="Collapse_0" aria-expanded="false">전체 메뉴
                                </button>
                            </h2>
                            <div className="accordion-collapse collapse show Parent_0" id="Collapse_0" aria-labelledby="Head_0" data-parent="#sideBar">
                                <div className="accordion-body" onClick={() => { requestMenu(0) }} >전체 메뉴</div>
                            </div>
                        </div>
                        <div id="sideBar_Body">

                        </div>
                    </div>
                </div>
                <div id="Menu_Body">
                    <div id="Menu_Category_Title">
                        <h5 id="Category1">-</h5>
                        <h3 id="Category2">-</h3>
                    </div>
                    <div id="Menu_List" className="row">
                    </div>
                </div>
            </div>
        </div>
    );
}