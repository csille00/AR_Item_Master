import ButtonAndIcon from "../Util/ButtonAndIcon.tsx";
// import {logout} from "../../assets/LogOut.png"
import logout from "../../assets/LogOut.png"
import jewel from "../../assets/Jewel.png"
import diamond from "../../assets/DiamondRing.png"
import add from "../../assets/Add.png"
import settings from "../../assets/Settings.png"
import logoSrc from "../../assets/Logo.png"
import {SupabaseClient} from "@supabase/supabase-js";


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

    return (
        <div className="fixed top-0 left-0 h-full w-64 bg-argray shadow-md flex flex-col p-4">
            <div className="mb-4 p-4">
                <img src={logoSrc} alt="Logo" className="w-full" />
            </div>
            <div className="mb-auto">
                <ButtonAndIcon
                    icon = {diamond}
                    text = {"Jewelry"}
                    onClick = {buttonClicked}
                />

                <ButtonAndIcon
                    icon = {jewel}
                    text = {"Stones"}
                    onClick = {buttonClicked}
                />

                <ButtonAndIcon
                    icon = {add}
                    text = {"Add Form"}
                    onClick = {buttonClicked}
                />

                <ButtonAndIcon
                    icon = {settings}
                    text = {"Admin"}
                    onClick = {buttonClicked}
                />
            </div>
            <div className="mt-auto">
                <ButtonAndIcon
                   icon={logout}
                   onClick={logOut}
                   text={"Log Out"}
                />
            </div>
        </div>
    );
};

export default SidePanel;