import {Outlet} from "react-router-dom";
import useClient from "../hooks/useClient.tsx";
import {useEffect, useState} from "react";
import Authentication from "./Authentication.tsx";

const AuthProtectedRoute = () => {
    const client = useClient()
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        client.auth.getSession().then(({data: {session}}) => {
            setIsAuthenticated(!!session)
        })
    })
    if (!isAuthenticated) {
        return <Authentication/>;
    }
    return <Outlet/>;
};

export default AuthProtectedRoute;