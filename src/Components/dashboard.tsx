import React from "react";
import useClient from "../hooks/useClient.tsx";
import {StylesList} from "./stylesList.tsx";


const Dashboard: React.FC = () => {
    const client = useClient()
    const logOut = async () => {
        await client.auth.signOut()
    }

    return (
        <>
            <button onClick={logOut}>Log out</button>
            <StylesList styleId={"ELS"}/>
        </>
    )
}

export default Dashboard