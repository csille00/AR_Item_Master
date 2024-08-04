import logoutIcon from "../../assets/logout.svg"
import jewelIcon from "../../assets/jewel.svg"
import sparkleIcon from "../../assets/sparkle.svg"
import addIcon from "../../assets/add.svg"
import adminIcon from "../../assets/admin.svg"
import {SupabaseClient} from "@supabase/supabase-js";
import Button from "../Util/Button.tsx";
import {useNavigate} from "react-router-dom";
import React from "react";

interface SidePanelProps {
    client: SupabaseClient
}

const SidePanel: React.FC<SidePanelProps> = ({client}) => {

    const logOut = async () => {
        console.log("sign out")
        await client.auth.signOut()
    }

    const navigate = useNavigate();
    const btnStyle = "bg-argray font-light text-lightgr hover:text-white text-xl mb-4 text-left"

    return (
        <div className="flex flex-col items-center bg-argray h-full shadow-md p-2">
            <div className="mb-10 mt-4">
                <img src={'https://www.alexisrussell.com/cdn/shop/files/ar-logo-white-520_500x.png?v=1620051910'} alt="Logo" className="w-full"/>
            </div>
            <div className="mb-auto">
                <Button
                    icon={sparkleIcon}
                    text={"Jewelry"}
                    onClick={() => navigate('/')}
                    style={btnStyle}
                />

                <Button
                    icon={jewelIcon}
                    text={"Stones"}
                    onClick={() => navigate('/stone')}
                    style={btnStyle}
                />

                <Button
                    icon={addIcon}
                    text={"Add Product"}
                    onClick={() => navigate('/addJewelry')}
                    style={btnStyle}
                />

                <Button
                    icon={adminIcon}
                    text={"Admin"}
                    onClick={() => navigate('/admin')}
                    style={btnStyle}
                />
            </div>
            <div className="mt-auto fixed bottom-0">
                <Button
                    icon={logoutIcon}
                    onClick={logOut}
                    text={"Log Out"}
                    style={btnStyle}
                />
            </div>
        </div>
    );
};

export default SidePanel;