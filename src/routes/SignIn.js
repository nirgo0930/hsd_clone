import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import HeadUI from './HeadUI';
import axios from 'axios';

function SingIn() {
    const navigate = useNavigate();
    const [info, setInfo] = useState({
        signIn_ID: "",
        signIn_PW: "",
    })

    const handleChange = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value,
        });
    }

    const submitSignIn = event => {
        event.preventDefault();

        console.log(info);

        axios.post("http://localhost:3030/signIn", info)
            .then((response) => {
                console.log(response.data[0]);
                if (response.data[0] === undefined) {
                    alert('입력하신 정보가 일치하지 않습니다.')
                }
                else if (response.data[0].WEB_ID === info.signIn_ID) {
                    sessionStorage.setItem('signIn_ID', info.signIn_ID);
                    sessionStorage.setItem('member_ID', response.data[0].MEMBER_ID);
                    console.log(info);
                    navigate('/');
                }
            });
    };


    return (
        <div className="container">
            <HeadUI></HeadUI>
            <div id="signIn_Container">
                <form id="signIn_form" onSubmit={submitSignIn}>
                    <input type="text" onChange={handleChange} name="signIn_ID" className="signIn_ID" placeholder='ID' />
                    <br />
                    <input type="password" onChange={handleChange} name="signIn_PW" className="signIn_PW" placeholder='Password' />
                    <br /><br />
                    <button type="submit">로그인</button>
                </form>
            </div>
        </div>
    )

}

export default SingIn;