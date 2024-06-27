import "./App.css";
import Login from "./components/form/login/Login";
import {AuthContext} from "./components/utils/AuthContext.jsx";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import IsNotLogged from "./components/utils/IsNotLogged.jsx";
import Registration from "./components/form/registration/Registration.jsx";
import HomePage from "./components/HomePage.jsx";
import Unauthorized from "./components/Unauthorized.jsx";
import CategoryPage from "./components/pages/CategoryPage.jsx";
import IsLogged from "./components/utils/IsLogged.jsx";
import {useContext} from "react";
import Navbar from "./components/Navbar/NavBar.jsx";
import AddAdvertisementPage from "./components/pages/AddAdvertisementPage.jsx";
import CategoryList from "./components/CategoryList.jsx";


function App() {
    const { isAuthenticated } = useContext(AuthContext);
    return (
        <>
            <BrowserRouter>
                {isAuthenticated && <Navbar />}
                <Routes>

                    <Route path="/" element={<IsNotLogged/>}>
                        <Route path="login" element={<Login/>}/>
                        <Route path="register" element={<Registration/>}/>
                    </Route>
                    <Route path="/" element={<IsLogged/>}>
                        <Route path="home" element={<HomePage/>}/>
                        <Route path="add/advertisement" element={<AddAdvertisementPage/>}/>
                        <Route path="category/add" element={<CategoryPage/>}/>
                        <Route path="category/all" element={<CategoryList/>} />
                    </Route>
                    <Route path="unauthorized" element={<Unauthorized/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}



export default App;
