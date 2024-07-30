import React from "react";

interface ButtonProps {
    icon?: string | null;
    text: string;
    style?: string | null;
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ icon = null, text, onClick, style = "" }) => {

    const styles = `m-2 btn flex items-center py-1 px-2 mb-2 bg-argray text-left hover:outline-none ${style}`;

    return (
        <a
            role="button"
            onClick={onClick}
            className={styles}
            onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    onClick();
                }
            }}
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
