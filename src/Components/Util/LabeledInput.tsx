import React from "react";

interface LabeledInputProps {
    label: string;
    type: LabeledInputType;
    placeholder?: string | null
    style?: string | null;
    value: string;
    options?: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export enum LabeledInputType {
    String = "text",
    Number = "number",
    DateTime = "datetime-local",
    ProductId = "text",
    Select = "select"  // Add a type for select
}

const LabeledInput: React.FC<LabeledInputProps> = ({ label, type, placeholder = null, style = null, value, options, onChange }) => {

    const labeledInput = `py-2 flex justify-between items-center ${style ?? ''}`;

    return (
        <label className={labeledInput}>
            {label}
            {type === LabeledInputType.Select && options ? (
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