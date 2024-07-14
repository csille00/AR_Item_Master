import React from "react";

interface ButtonAndIconProps {
    icon: string; // React node for rendering an icon
    text: string;
    onClick: () => void;
}

const ButtonAndIcon: React.FC<ButtonAndIconProps> = ({ icon, text, onClick }) => {
    return (
        <a
            className="button flex items-center w-full py-4 px-6 mb-2 bg-argray text-left hover:outline-none"
            onClick={onClick}
        >
            <img src={icon} alt={text} className="mr-2 h-6 w-6" /> {/* Replace with your image import */}
            <span className="p-2 font-extralight text-lightgr hover:text-white hover:font-bold ">{text}</span>
        </a>
    );
};

export default ButtonAndIcon;