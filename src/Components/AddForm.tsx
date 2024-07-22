import LabeledInput, {LabeledInputType} from "./Util/LabeledInput.tsx";
import Button from "./Util/Button.tsx";
import React, {useState} from "react";

interface AddFormProps {
    title: string;
    addProduct: (formData: { [key: string]: string }) => void;
    columns: { label: string; type: LabeledInputType }[];
}

const AddForm: React.FC<AddFormProps> = ({title, addProduct, columns}) => {
    const [formData, setFormData] = useState<{ [key: string]: string }>({});

    const handleChange = (label: string, value: string) => {
        setFormData({
            ...formData,
            [label]: value
        });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        addProduct(formData);
    };

    const onClick = () => {
        console.log("add product clicked")
    }

    return (
        <div className="m-10 bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-center mb-4 px-10">
                <h1 className="text-4xl font-medium py-10">{title}</h1>
            </div>
            <div className="flex justify-center">
                <form className="" onSubmit={handleSubmit}>
                    {columns.map((column, index) => (
                        <div className="mb-4" key={index}>
                            <LabeledInput
                                label={column.label}
                                type={column.type}
                                onChange={(e) => handleChange(column.label, e.target.value)}
                            />
                        </div>
                    ))}
                    <div className="flex justify-end mt-4">
                        <Button
                            text="Clear"
                            onClick={onClick}
                            style="bg-superlightgr rounded-lg"
                        />
                        <Button
                            text="Add Product"
                            onClick={onClick}
                            style="bg-arbrown rounded-lg"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddForm;