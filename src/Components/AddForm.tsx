import LabeledInput, {LabeledInputType} from "./Util/LabeledInput.tsx";
import Button from "./Util/Button.tsx";
import React, {useEffect, useState} from "react";
import {FormColumn} from "../Definitions/FormColumn.ts";
import {getFormConfig} from "../Definitions/formConfig.ts";
import {getProductTypesFromClient} from "../model/queries/productTypeDAO.ts";
import {Option} from "../Definitions/DropdownOption.ts";

interface AddFormProps {
    title: string;
    addProduct: (formData: { [key: string]: string }) => void;
}

//TODO: I have accidentally made this now a jewelry specific thing. Figure out how to take the type stuff out and make it passed in
//TODO: I also need to get the options to render correctly
//TODO: I also need to set the type properly

const AddForm: React.FC<AddFormProps> = ({ title, addProduct }) => {
    const [formData, setFormData] = useState<{ [key: string]: string }>({});
    const [productTypes, setProductTypes] = useState<Option[]>([{description:'test'}]);
    const [columns, setColumns] = useState<FormColumn[]>([]);
    const [type, setType] = useState<string>('ENG');

    useEffect(() => {
        const getProductTypes = async () => {
            try {
                const data = await getProductTypesFromClient();
                if (data) {
                    // data.forEach(option => console.log(option))
                    setProductTypes(data);
                }
            } catch (error) {
                console.error("Failed to fetch product types:", error);
            }
        };

        getProductTypes();
    }, []);

    useEffect(() => {
        const fetchFormConfig = async () => {
            const config = await getFormConfig(type);
            setColumns(config);

            if (type === 'ENG') {
                config.unshift({ label: "Type", type: LabeledInputType.Select, options: productTypes });
            }
        };
        columns.forEach(col => console.log(col.options))

        fetchFormConfig();

    }, [productTypes, type]);

    const handleChange = (label: string, event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (label === 'Type') setType(event.target.value);
        setFormData({
            ...formData,
            [label]: event.target.value
        });
    };

    const handleSubmit = (event: React.FormEvent | undefined) => {
        if (!event) return;
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
                                options={
                                    column.options?.map(option => option.description) || []
                                }
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
                            onClick={handleSubmit}
                            style="bg-arbrown rounded-lg"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddForm;