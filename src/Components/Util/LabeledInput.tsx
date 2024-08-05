import React from "react";
import {LabeledInputType} from "../../Definitions/enum.ts";
import {Option} from "../../Definitions/DropdownOption.ts";

interface LabeledInputProps {
    label: string;
    type: LabeledInputType;
    style?: string | null;
    boxStyle?: string | null;
    value: string;
    required: boolean
    options?: Option[];
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, label?: string) => void;
}

const LabeledInput: React.FC<LabeledInputProps> = ({ label, type, placeholder = null, style = null, boxStyle = null, value, required, options, onChange }) => {

    const labeledInput = `py-2 ${style ?? ''}`;
    const inputBox = `${boxStyle ?? ''}`;

    return (
        <div  className={labeledInput}>
            <label>
                <div className="inline mx-4">
                    {label}
                    {required && <span style={{color: 'red'}}> *</span>}
                </div>
            </label>
            {type === LabeledInputType.SELECT && options ? (
                <select
                    className={inputBox}
                    name="mySelect"
                    value={value}
                    onChange={onChange}
                >
                    <option disabled={required} value="">--</option>
                    {options.map((option, index) => (
                        <option key={index} value={option.id}>
                            {option.description}
                        </option>
                    ))}
                </select>
            ) : (

                <input
                    className={inputBox}
                    name="myInput"
                    type={type}
                    // placeholder={placeholder ?? ""}
                    value={value}
                    onChange={onChange}
                />
            )}
        </div>
    );
};
export default LabeledInput