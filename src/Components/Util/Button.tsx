import React from "react";

interface ButtonProps {
    icon?: string | null;
    text: string;
    style?: string | null;
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ icon = null, text, onClick, style = "" }) => {

    return (
        <a
            className={`m-2 btn flex items-center py-1 px-2 mb-2 text-left hover:outline-none ${style ? style : ''}`}
            onClick={onClick}
        >
            {icon && (
                <img
                    src={icon}
                    className="mr-2 h-6 w-6"
                    alt={text}
                />
            )}
            <span className="p-2 font-extralight text-lightgr hover:text-white hover:font-bold">
                {text}
            </span>
        </a>
    );
};

export default Button;
