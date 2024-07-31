import logout from "../../assets/LogOut.png"
import jewel from "../../assets/Jewel.png"
import diamond from "../../assets/DiamondRing.png"
import add from "../../assets/Add.png"
import settings from "../../assets/Settings.png"
import logoSrc from "../../assets/Logo.png"
import {SupabaseClient} from "@supabase/supabase-js";
import Button from "../Util/Button.tsx";
import {useNavigate} from "react-router-dom";


interface SidePanelProps {
    client: SupabaseClient
}


const SidePanel: React.FC<SidePanelProps> = ({client}) => {

    const logOut = async () => {
        await client.auth.signOut()
    }

    const buttonClicked = () => {
        console.log("clicked")
    }

    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center bg-argray h-full shadow-md p-2">
            <div className="mb-10 mt-4">
                <img src={logoSrc} alt="Logo" className="w-full"/>
            </div>
            <div className="mb-auto">
                <Button
                    icon={diamond}
                    text={"Jewelry"}
                    onClick={() => navigate('/')}
                />

                <Button
                    icon={jewel}
                    text={"Stones"}
                    onClick={() => navigate('/stone')}
                />

                <Button
                    icon={add}
                    text={"Add"}
                    onClick={() => navigate('/add')}
                />

                <Button
                    icon={settings}
                    text={"Admin"}
                    onClick={() => navigate('/admin')}
                />
            </div>
            <div className="mt-auto fixed bottom-0">
                <Button
                    icon={logout}
                    onClick={logOut}
                    text={"Log Out"}
                />
            </div>
        </div>
    );
};

export default SidePanel;