interface LabeledInputProps {
    label: string;
    type: LabeledInputType;
    placeholder?: string | null
    style?: string | null;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export enum LabeledInputType {
    String = "text",
    Number = "number",
    DateTime = "datetime-local",
    ProductId = "text" // Assuming ProductId is a string
}

const LabeledInput: React.FC<LabeledInputProps> = ({ label, type, placeholder = null, style = null, onChange }) => {
    const labeledInput = `py-2 flex justify-between items-center ${style ?? ''}`;

    return (
        <>
            <label className={labeledInput}>
                {label}
                <input
                    className="p-2 rounded-lg border"
                    name="myInput"
                    type={type}
                    placeholder={placeholder ?? ""}
                    onChange={onChange}
                />
            </label>
        </>
    );
};
export default LabeledInput