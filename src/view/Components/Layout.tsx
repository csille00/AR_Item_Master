import SidePanel from "./SidePanel/sidePanel.tsx";
import {Outlet} from 'react-router-dom';
import useClient from "../hooks/useClient.tsx";

const Layout = () => {
    const client = useClient()

    return (
        <>
            <div className="grid grid-cols-6 h-screen w-screen">
                <div className="col-span-1">
                    <SidePanel client={client}/>
                </div>
                <div className="col-span-5 bg-superlightgr">
                    <Outlet/>
                </div>
            </div>
        </>
    );


}

export default Layout;