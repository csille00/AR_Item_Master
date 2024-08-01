import React, {SVGProps} from "react";

interface ButtonProps {
    icon?: string | null;
    text: string;
    style?: string | null;
    onClick: (event?: React.FormEvent | undefined) => void;
}

const Button: React.FC<ButtonProps> = ({icon = null, text, onClick, style = ""}) => {

    const styles = `btn flex items-center py-1 px-2 mb-4 bg-argray text-left hover:outline-none ${style}`;

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
                <span className="mr-2 h-6 w-6">
                    <img src={icon}/>
                </span>
            )}
            <span className="p-2 font-light text-xl text-lightgr hover:text-lightgr hover:font-bold">
                {text}
            </span>
        </a>
    );
};

export default Button;
