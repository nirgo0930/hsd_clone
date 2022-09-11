import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import SingIn from '../routes/SignIn';
import Store from '../routes/Store';
import Home from '../routes/Home';
import Join1 from '../routes/Join1';
import Join2 from '../routes/Join2';
import Menu from '../routes/Menu';
import Detail from '../routes/Menu_Detail';
import MyPage from '../routes/MyPage';


function AppRouter(props) {
    let checkAccept = useSelector((state) => state.accept_basic)
    // console.log(checkAccept);

    return (<>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home></Home>} exact={true} />
                <Route path="/SignIn" element={<SingIn></SingIn>} />
                <Route path="/MyPage" element={<MyPage></MyPage>} />
                <Route path="/store" element={<Store></Store>} />
                <Route path="/Join" element={checkAccept === 1 ? <Join2 ></Join2> : <Join1></Join1>} />
                <Route path="/Menu" element={<Menu></Menu>} />
                <Route path="/Menu_Detail" element={<Detail></Detail>} />
            </Routes>
        </BrowserRouter>
    </>);
}

export default AppRouter;