// import React, { Component } from 'react'
// import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import HeadUI from "./HeadUI";

function Home() {
    let dispatch = useDispatch();
    dispatch({ type: 'INIT' })
    
    return (
        <div className="container">
            <HeadUI></HeadUI>
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
                <div className="carousel-indicators">
                    <button data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"></button>
                    <button data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></button>
                    <button data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="d-block w-100" src="/images/main_img_01.jpg" alt="First slide" />
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src="/images/main_img_02.jpg" alt="Second slide" />
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src="/images/main_img_03.jpg" alt="Third slide" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;