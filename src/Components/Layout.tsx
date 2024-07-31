import React, {ReactNode} from 'react';
import SidePanel from "./SidePanel/sidePanel.tsx";
import { Outlet } from 'react-router-dom';

class LayoutProps {
    client: any;
}

const Layout: React.FC<LayoutProps> = ({ client }) => {
    return (
        <>
            <div className="bg-superlightgr">
                <div className="grid grid-cols-6 gap-2 h-screen w-screen">
                    <div className="col-span-1">
                        <SidePanel client={client}/>
                    </div>
                    <div className="col-span-5">
                        <Outlet />
                    </div>
                </div>
            </div>
            {/*<Footer />*/}
        </>
    );
}

export default Layout;