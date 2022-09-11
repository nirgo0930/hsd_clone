import React from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import HeadUI from "./HeadUI";


function Join() {
    let dispatch = useDispatch();
    const navigate = useNavigate();
    const checkAccept = event => {
        event.preventDefault();

        var accepts = document.getElementsByClassName("join_accept");
        // Array.prototype.map.call(accepts, function (accept) {
        //     console.log(accept.checked);
        // });

        if (accepts[2].checked) {
            dispatch({ type: 'ADVERTISEMENT' })
        } else {
            dispatch({ type: 'BASIC' })
        }

        navigate('/join');
    }


    return (
        <div className="container">
            <HeadUI></HeadUI>
            <div id="join_body">
                <div id="join_left">
                    <div id="join_left_head">
                        <h1>회원가입</h1>
                    </div>
                    <h1>01</h1>
                    <h5>이용약관</h5><br />
                    <div id="join_left_msg">
                        회원가입을 위해서 이용약관 및
                        개인정보 수집 및 이용에 대한
                        안내를 읽고 동의해주세요.
                    </div>
                </div>

                <div id="join_accept_box">
                    <form onSubmit={checkAccept}>
                        <ul>
                            <li>이용약관</li>
                            <input type="checkbox" className="join_accept" id="accept1" required /> 동의합니다
                            <li>개인정보 수집 및 활용동의</li>
                            <input type="checkbox" className="join_accept" id="accept2" required /> 동의합니다
                            <li>마케팅 활용목적 동의</li>
                            <input type="checkbox" className="join_accept" id="accept_Ad" /> 동의합니다
                            {/* <br /><br />
                            <input type="button" id="check_all" value={"전체 동의"} /> */}
                            <li style={{ listStyle: "none" }}>
                                <div id="join_next_box">
                                    <br/>
                                    <button type="submit" id="join_next">다음</button>
                                </div>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        </div>
    );
}


export default Join;