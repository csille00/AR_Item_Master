import React from "react";
import {LabeledInputType} from "../../Definitions/enum.ts";

interface LabeledInputProps {
    label: string;
    type: LabeledInputType;
    placeholder?: string | null
    style?: string | null;
    value: string;
    required: boolean
    options?: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const LabeledInput: React.FC<LabeledInputProps> = ({ label, type, placeholder = null, style = null, value, required, options, onChange }) => {

    const labeledInput = `py-2 flex justify-between items-center ${style ?? ''}`;

    return (
        <label className={labeledInput}>
            {label}
            {required && <span style={{ color: 'red' }}> *</span>}
            {type === LabeledInputType.SELECT && options ? (
                <select
                    className="p-2 rounded-lg border"
                    name="mySelect"
                    value={value}
                    onChange={onChange}
                >
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            ) : (

                <input
                    className="p-2 rounded-lg border"
                    name="myInput"
                    type={type}
                    placeholder={placeholder ?? ""}
                    value={value}
                    onChange={onChange}
                />
            )}
        </label>
    );
};
export default LabeledInput