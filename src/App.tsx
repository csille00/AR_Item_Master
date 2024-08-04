import './App.css'
import Authentication from "./Components/Authentication.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Jewelry from "./Components/Jewelry.tsx";
import Layout from "./Components/Layout.tsx";
import Stone from "./Components/Stone.tsx";
import Logout from "./Components/Logout.tsx";
import Admin from "./Components/Admin.tsx";
import AddJewelryForm from "./Components/Add/AddJewelryForm.tsx";
import AddStoneForm from "./Components/Add/AddStoneForm.tsx";
import AuthProtectedRoute from "./Components/AuthProtectedRoute.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthProtectedRoute />}>
                    <Route path="" element={<Layout/>}>
                        <Route index element={<Jewelry/>}/>
                        <Route path="stone" element={<Stone/>}/>
                        <Route path="addJewelry" element={<AddJewelryForm/>}/>
                        <Route path="addStone" element={<AddStoneForm/>}/>
                        {/*<Route path="logout" element={<Logout />} />*/}
                        <Route path="admin" element={<Admin/>}/>
                        {/*<Route path="*" element={<NoPage />} />*/}
                    </Route>
                </Route>
                <Route path="*" element={<Authentication/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
