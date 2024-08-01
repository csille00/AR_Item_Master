import logoutIcon from "../../assets/logout.svg"
import jewelIcon from "../../assets/jewel.svg"
import sparkleIcon from "../../assets/sparkle.svg"
import addIcon from "../../assets/add.svg"
import adminIcon from "../../assets/admin.svg"
import logoSrc from "../../assets/Logo.png"
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

    return (
        <div className="flex flex-col items-center bg-argray h-full shadow-md p-2">
            <div className="mb-10 mt-4">
                <img src={logoSrc} alt="Logo" className="w-full"/>
            </div>
            <div className="mb-auto">
                <Button
                    icon={sparkleIcon}
                    text={"Jewelry"}
                    onClick={() => navigate('/')}
                />

                <Button
                    icon={jewelIcon}
                    text={"Stones"}
                    onClick={() => navigate('/stone')}
                />

                <Button
                    icon={addIcon}
                    text={"Add Jewelry"}
                    onClick={() => navigate('/addJewelry')}
                />

                <Button
                    icon={addIcon}
                    text={"Add Stone"}
                    onClick={() => navigate('/addStone')}
                />

                <Button
                    icon={adminIcon}
                    text={"Admin"}
                    onClick={() => navigate('/admin')}
                />
            </div>
            <div className="mt-auto fixed bottom-0">
                <Button
                    icon={logoutIcon}
                    onClick={logOut}
                    text={"Log Out"}
                />
            </div>
        </div>
    );
};

export default SidePanel;