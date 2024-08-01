import React, {ReactNode, useEffect, useState} from 'react';
import SidePanel from "./SidePanel/sidePanel.tsx";
import {Outlet} from 'react-router-dom';
import {SupabaseClient} from "@supabase/supabase-js";
import useClient from "../hooks/useClient.tsx";
import Authentication from "./Authentication.tsx";

const Layout = () => {
    const client = useClient()

    return (
        <>
            <div className="bg-superlightgr">
                <div className="grid grid-cols-6 gap-2 h-screen w-screen">
                    <div className="col-span-1">
                        <SidePanel client={client}/>
                    </div>
                    <div className="col-span-5">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </>
    );


}

export default Layout;