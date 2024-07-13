import React from "react";

interface ButtonAndIconProps {
    icon: string; // React node for rendering an icon
    text: string;
    onClick: () => void;
}

const ButtonAndIcon: React.FC<ButtonAndIconProps> = ({ icon, text, onClick }) => {
    return (
        <button
            className="flex items-center w-full py-4 px-6 mb-2 bg-argray hover:bg-white text-left focus:outline-none focus:ring-0"
            onClick={onClick}
        >
            <img src={icon} alt={text} className="mr-2 h-6 w-6" /> {/* Replace with your image import */}
            <span className="p-2 font-extralight ">{text}</span>
        </button>
    );
};

export default ButtonAndIcon;