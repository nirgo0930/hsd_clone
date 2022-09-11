import React from 'react'
import { Link } from 'react-router-dom';


function isLogin() {
    // console.log(sessionStorage.getItem('signIn_ID'))
    if (sessionStorage.getItem('signIn_ID') !== null) {
        return (
            <>
                <li> {sessionStorage.getItem('signIn_ID')}님 어서오세요</li>
                |
                <li>
                    <Link to="/MyPage">내 정보</Link>
                </li>
                |
                <li>
                    <Link to="/SignIn" onClick={() => sessionStorage.removeItem('signIn_ID')}>로그아웃</Link>
                </li>
            </>
        )
    } else {
        return <li><Link to="/SignIn">로그인</Link></li>;
    }
}


function HeadUI() {
    return (
        <>
            <div id="HeadUI">
                <ul>
                    {isLogin()}
                    |
                    <li>
                        <Link to="/Join">회원가입</Link>
                    </li>
                </ul>
            </div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand logo" to="/"></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item dropdown">
                                <div className="nav-link" id="navbarDropdown">
                                    Menu
                                </div>
                                <div className="dropdown-menu dropdown-content">
                                    <Link className="dropdown-item" to="/Menu">전체 메뉴</Link>
                                    <Link className="dropdown-item" to="#">Another action</Link>
                                    <div className="dropdown-divider"></div>
                                    <Link className="dropdown-item" to="#">Something else here</Link>
                                </div>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Store">Store</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default HeadUI;