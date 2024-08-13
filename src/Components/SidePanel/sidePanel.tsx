import {SupabaseClient} from "@supabase/supabase-js";
import {NavLink} from "react-router-dom";
import React from "react";

interface SidePanelProps {
    client: SupabaseClient
}

const SidePanel: React.FC<SidePanelProps> = ({client}) => {

    const logOut = async () => {
        console.log("sign out")
        await client.auth.signOut()
    }
    const hoverClasses = (isActive: boolean): string =>
        `text-3xl mb-10 flex items-center hover:font-bold text-left font-light pl-4 ${isActive
            ? 'text-argold font-bold hover:text-argold'
            : 'font-light text-lightgr hover:text-lightgr'}`

    const renderIcon = (isActive: boolean, svg: string, svg2?: string) => (
        <svg xmlns="http://www.w3.org/2000/svg"
             fill="none"
             viewBox="0 0 24 24"
             strokeWidth={1}
             stroke={isActive ? "#A6947A" : "#BABCBE"}
             className="size-10 mr-3"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d={svg}/>
            {svg2 && (
                <path strokeLinecap="round" strokeLinejoin="round" d={svg2}/>
            )}


        </svg>
    );


    return (
        <div className="flex flex-col bg-argray h-full shadow-md p-2">
            <div className="mb-10 mt-4">
                <img src={'https://www.alexisrussell.com/cdn/shop/files/ar-logo-white-520_500x.png?v=1620051910'}
                     alt="Logo" className="w-full"/>
            </div>
            <div className="">
                <NavLink
                    to={"/"}
                    className={({isActive}) => (hoverClasses(isActive))}
                >
                    {({isActive}) => (
                        <>
                            {renderIcon(isActive, "M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z")}
                            Jewelry
                        </>)
                    }
                </NavLink>
                <NavLink
                    to={"/stone"}
                    className={({isActive}) => (hoverClasses(isActive))}
                >
                    {({isActive}) => (
                        <>
                            {renderIcon(isActive, "M16.712 4.33a9.027 9.027 0 0 1 1.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 0 0-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 0 1 0 9.424m-4.138-5.976a3.736 3.736 0 0 0-.88-1.388 3.737 3.737 0 0 0-1.388-.88m2.268 2.268a3.765 3.765 0 0 1 0 2.528m-2.268-4.796a3.765 3.765 0 0 0-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 0 1-1.388.88m2.268-2.268 4.138 3.448m0 0a9.027 9.027 0 0 1-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0-3.448-4.138m3.448 4.138a9.014 9.014 0 0 1-9.424 0m5.976-4.138a3.765 3.765 0 0 1-2.528 0m0 0a3.736 3.736 0 0 1-1.388-.88 3.737 3.737 0 0 1-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 0 1-1.652-1.306 9.027 9.027 0 0 1-1.306-1.652m0 0 4.138-3.448M4.33 16.712a9.014 9.014 0 0 1 0-9.424m4.138 5.976a3.765 3.765 0 0 1 0-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 0 1 1.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 0 0-1.652 1.306A9.025 9.025 0 0 0 4.33 7.288")}
                            Stones
                        </>)
                    }
                </NavLink>
                <NavLink
                    to={"/addJewelry"}
                    className={({isActive}) => (hoverClasses(isActive))}
                >
                    {({isActive}) => (
                        <>
                            {renderIcon(isActive, "M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z")}
                            Add Product
                        </>)
                    }
                </NavLink>
                <NavLink
                    to={"/admin"}
                    className={({isActive}) => (hoverClasses(isActive))}
                >
                    {({isActive}) => (
                        <>
                            {renderIcon(
                                isActive,
                                "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z",
                                "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            )}
                            Admin
                        </>)
                    }
                </NavLink>
            </div>
            <div className="mt-auto fixed bottom-0">
                <NavLink
                    to={"/"}
                    className={(hoverClasses(false))}
                    onClick={logOut}
                >
                    {({isActive}) => (
                        <>
                            {renderIcon(
                                false,
                                "M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                            )}
                            Logout
                        </>)
                    }
                </NavLink>
            </div>
        </div>
    );
};

export default SidePanel;