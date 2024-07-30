import './App.css'
import Authentication from "./Components/auth.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Jewelry from "./Components/Jewelry.tsx";
import AddForm from "./Components/AddForm.tsx";
import Layout from "./Components/Layout.tsx";
import Stone from "./Components/Stone.tsx";
import Logout from "./Components/Logout.tsx";
import useClient from "./hooks/useClient.tsx";

function App() {
    const queryClient = new QueryClient();
    const client = useClient()

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Authentication/>
                <Routes>
                    <Route path="/" element={<Layout client={{client}}/>}>
                        <Route index element={<Jewelry/>}/>
                        <Route path="stone" element={<Stone/>}/>
                        <Route path="add" element={<AddForm/>}/>
                        <Route path="logout" element={<Logout/>}/>
                        {/*<Route path="admin" element={<Admin />}>*/}
                        {/*<Route path="*" element={<NoPage />} />*/}
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    )
}

export default App
