import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import HeadUI from './HeadUI';


function Join2() {
    const navigate = useNavigate();

    const tempOk = useSelector(
        (state) => (state && state.accept_ad)
    );

    const [info, setInfo] = useState({
        web_id: "",
        password: "",
        email: "",
        phone: "",
        ok_ad: tempOk,
    })

    const handleChange = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value,
        });
        console.log(info);
    }

    const submitInfo = event => {
        event.preventDefault();

        console.log(info);

        axios.post("http://localhost:3030/join", info)
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    alert("회원 가입 성공");
                } else {
                    alert("Error : " + response.status + "/" + response.status);
                }
                navigate('/');
            });
    };


    return (
        <div className="container" id="join2_box">
            <HeadUI></HeadUI>
            <div id="join_detail_box">
                <form id="user_info_form" onSubmit={submitInfo}>
                    <label htmlFor="input_id">ID&nbsp;&nbsp;</label>
                    <input type="text" placeholder="ID" className="input_id" onChange={handleChange} name="web_id" />
                    <br />
                    <label htmlFor="input_pw">PASSWORD&nbsp;&nbsp;</label>
                    <input type="password" placeholder="PASSWORD" className="input_pw" onChange={handleChange} name="password" />
                    <br />
                    <label htmlFor="email">E-MAIL&nbsp;&nbsp;</label>
                    <input type="email" placeholder="email@test.com" className="email" onChange={handleChange} name="email" />
                    <br />
                    <label htmlFor="phone">PHONE&nbsp;&nbsp;</label>
                    <input type="tel" placeholder="01012341234" className="phone" onChange={handleChange} name="phone" />
                    <br />
                    <div id="submit_box">                        
                        <button type="submit">가입</button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Join2;