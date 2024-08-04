import React, {useEffect, useState} from "react";
import LabeledInput from "../Util/LabeledInput.tsx";
import Button from "../Util/Button.tsx";
import {FormColumn} from "../../Definitions/FormColumn.ts";
import {Option} from "../../Definitions/DropdownOption.ts";
import {ArJewelryMasterColumns, LabeledInputType} from "../../Definitions/enum.ts";
import {useNavigate} from "react-router-dom";

interface SharedFormProps {
    title: string;
    fetchColumns: (type: string) => Promise<FormColumn[]>;
    fetchProductTypes: () => Promise<Option[] | undefined>;
    initialType: string;
    submitForm: (formData: { [key: string]: string | number }, columns: FormColumn[]) => Promise<boolean>;
}

export const AddForm: React.FC<SharedFormProps> = ({
                                                       title,
                                                       fetchColumns,
                                                       fetchProductTypes,
                                                       initialType,
                                                       submitForm,
                                                   }) => {
    const [productTypes, setProductTypes] = useState<Option[]>([]);
    const [columns, setColumns] = useState<FormColumn[]>([]);
    const [type, setType] = useState<string>(initialType);
    const [formData, setFormData] = useState<{ [key: string]: string }>({[ArJewelryMasterColumns.TYPE]: initialType});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getProductTypes = async () => {
            setIsLoading(true);
            try {
                const data = await fetchProductTypes();
                if (data) {
                    setProductTypes(data);
                }
            } catch (error) {
                console.error("Failed to fetch product types:", error);
                setError("Failed to fetch product types: " + (error as Error).message);
            } finally {
                setIsLoading(false);
            }
        };

        getProductTypes();
    }, [fetchProductTypes]);

    useEffect(() => {
        const fetchFormConfig = async () => {
            setIsLoading(true);
            try {
                const config = await fetchColumns(type);
                //set none value at the top of each select option
                config.forEach(col => {
                    col.options?.unshift({description: "--"})
                })
                config.unshift(new FormColumn("Type", LabeledInputType.SELECT, true, productTypes));
                setColumns(config);
            } catch (error) {
                console.error("Failed to fetch form config:", error);
                setError("Failed to fetch form config: " + (error as Error).message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFormConfig();
    }, [type, productTypes, fetchColumns]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const handleChange = (label: string, event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (label === 'Type') setType(event.target.value);
        setFormData({
            ...formData,
            [label]: event.target.value
        });
    };

    const handleSubmit = async (event: React.FormEvent | undefined) => {
        if (!event) return;
        event.preventDefault();
        columns.push(new FormColumn("Type", LabeledInputType.SELECT, true, productTypes))
        formData[ArJewelryMasterColumns.TYPE] = type
        const valid = await submitForm(formData, columns)
        if (!valid) {
            return
        }
        handleClear()
    };

    const handleClear = () => {
        const clearedData = Object.keys(formData).reduce((acc, key) => {
            if (key !== ArJewelryMasterColumns.TYPE) {
                acc[key] = '';
            }
            return acc;
        }, {} as { [key: string]: string });
        setFormData(clearedData);
    };

    return (
        <div className="flex">
            <div className="w-60" style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                <button onClick={() => navigate('/addJewelry')}
                        className="bg-argray text-white hover:text-white rounded w-32 text-center mb-2">
                    Jewelry
                </button>
                <button onClick={() => navigate('/addStone')}
                        className="bg-superlightgr text-argray hover:text-argray border border-argray rounded w-32 text-center">
                    Stone
                </button>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 mt-6 mr-6">
                <div className="flex justify-center mb-2 px-10">
                    <h1 className="text-4xl font-medium py-8">{title}</h1>
                </div>
                <div className="flex justify-center">
                    <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-2">
                        {columns.map((column, index) => (
                            <div className="mb-4" key={index}>
                                <LabeledInput
                                    label={column.label}
                                    type={column.type}
                                    value={formData[column.label] || ''}
                                    required={column.required}
                                    options={column.options?.map(option => option.description) || []}
                                    onChange={(e) => handleChange(column.label, e)}
                                />
                            </div>
                        ))}
                    </form>
                </div>
                <div className="flex justify-center mt-4">
                    <Button text="Clear" onClick={handleClear}
                            style="bg-superlightgr rounded-lg text-argray hover:text-argray mx-2"/>
                    <Button text="Add Product" onClick={handleSubmit}
                            style="bg-argold rounded-lg text-white hover:text-white mx-2"/>
                </div>
            </div>
        </div>
    );
};

export default AddForm;
