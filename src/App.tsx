import './App.css'
import Authentication from "./view/Components/Authentication.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Jewelry from "./view/Components/Jewelry.tsx";
import Layout from "./view/Components/Layout.tsx";
import Stone from "./view/Components/Stone.tsx";
import Admin from "./view/Components/Admin/Admin.tsx";
import AddJewelryForm from "./view/Components/Add/AddJewelryForm.tsx";
import AddStoneForm from "./view/Components/Add/AddStoneForm.tsx";
import AuthProtectedRoute from "./view/Components/AuthProtectedRoute.tsx";
import JewelryDetailsPage from "./view/Components/JewelryDetailsPage.tsx";
import StoneDetailsPage from "./view/Components/StoneDetailsPage.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthProtectedRoute/>}>
                    <Route path="" element={<Layout/>}>
                        <Route index element={<Jewelry/>}/>
                        <Route path="stone" element={<Stone/>}/>
                        <Route path="addJewelry" element={<AddJewelryForm/>}/>
                        <Route path="addStone" element={<AddStoneForm/>}/>
                        <Route path="admin" element={<Admin/>}/>
                        <Route path="productDetails/jewelry/:sku" element={<JewelryDetailsPage/>}/>
                        <Route path="productDetails/stone/:sku" element={<StoneDetailsPage/>}/>
                    </Route>
                </Route>
                <Route path="*" element={<Authentication/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
