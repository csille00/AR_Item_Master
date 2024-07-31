import LabeledInput, {LabeledInputType} from "./Util/LabeledInput.tsx";
import Button from "./Util/Button.tsx";
import React, {useState} from "react";

interface AddFormProps {
    title: string;
    addProduct: (formData: { [key: string]: string }) => void;
    columns: { label: string; type: LabeledInputType }[];
}

const AddForm: React.FC<AddFormProps> = ({ title, addProduct, columns }) => {
    const [formData, setFormData] = useState<{ [key: string]: string }>({});

    const handleChange = (label: string, event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [label]: event.target.value
        });
    };

    const handleSubmit = (event: React.FormEvent | undefined) => {
        if(!event) return;
        event.preventDefault();
        addProduct(formData);
    };

    const handleClear = () => {

        const clearedData = Object.keys(formData).reduce((acc, key) => {
            acc[key] = '';
            return acc;
        }, {} as { [key: string]: string });
        setFormData(clearedData);
    };


    return (
        <div className="m-10 bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-center mb-4 px-10">
                <h1 className="text-4xl font-medium py-10">{title}</h1>
            </div>
            <div className="flex justify-center">
                <form onSubmit={handleSubmit}>
                    {columns.map((column, index) => (
                        <div className="mb-4" key={index}>
                            <LabeledInput
                                label={column.label}
                                type={column.type}
                                placeholder={`Enter ${column.label.toLowerCase()}`}
                                value={formData[column.label] || ''}
                                onChange={(e) => handleChange(column.label, e)}
                            />
                        </div>
                    ))}
                    <div className="flex justify-end mt-4 space-x-4">
                        <Button
                            text="Clear"
                            onClick={handleClear}
                            style="bg-superlightgr rounded-lg"
                        />
                        <Button
                            text="Add Product"
                            onClick={handleSubmit} // Updated here to use handleSubmit
                            style="bg-argold rounded-lg"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddForm;