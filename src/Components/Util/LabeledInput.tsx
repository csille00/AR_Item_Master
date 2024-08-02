import React from "react";

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

export enum LabeledInputType {
    STRING = "text",
    NUMBER = "number",
    DATETIME = "datetime-local",
    SELECT = "select"  // Add a type for select
}

const LabeledInput: React.FC<LabeledInputProps> = ({ label, type, placeholder = null, style = null, value, required, options, onChange }) => {

    const labeledInput = `py-2 flex justify-between items-center ${style ?? ''}`;

    return (
        <div className="flex justify-start items-center">
            <label className={labeledInput}>
                <div className="inline mx-4">
                    {label}
                    {required && <span style={{color: 'red'}}> *</span>}
                </div>
            </label>
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
                    className="p-2 rounded-lg border w-20"
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