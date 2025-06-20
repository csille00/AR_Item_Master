import React, {useEffect, useState} from "react";
import LabeledInput from "../Util/LabeledInput.tsx";
import Button from "../Util/Button.tsx";
import {FormColumn} from "../../../Definitions/FormColumn.ts";
import {Option} from "../../../Definitions/DropdownOption.ts";
import {LabeledInputType} from "../../../Definitions/enum.ts";
import {NavLink} from "react-router-dom";
import {ArLoader} from "../Util/Loading.tsx";
import {Bounce, toast, ToastContainer} from "react-toastify";
import {Error} from "../Util/Error.tsx";

interface SharedFormProps {
    title: string;
    fetchColumns: (type: string) => Promise<FormColumn[]>;
    fetchProductTypes: () => Promise<Option[] | undefined>;
    initialType: string;
    typeValue: string
    submitForm: (formData: { [key: string]: string | number }, columns: FormColumn[]) => Promise<string | null>;
}

export const AddForm: React.FC<SharedFormProps> = ({
                                                       title,
                                                       fetchColumns,
                                                       fetchProductTypes,
                                                       initialType,
                                                       typeValue,
                                                       submitForm,
                                                   }) => {
    const [productTypes, setProductTypes] = useState<Option[]>([]);
    const [columns, setColumns] = useState<FormColumn[]>([]);
    const [type, setType] = useState<string>(initialType);
    const [formData, setFormData] = useState<{ [key: string]: string }>({[typeValue]: initialType});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
                setColumns(config);
            } catch (error) {
                setError("Failed to fetch form config: " + (error as Error).message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFormConfig();
    }, [type, productTypes, fetchColumns]);

    if (isLoading) {
        return <ArLoader/>
    }

    if (error) {
        return <Error message={error}/>
    }

    const handleChange = (label: string, event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (label === typeValue) {
            setType(event.target.value);
        }
        setFormData({
            ...formData,
            [label]: event.target.value
        });
    };

    const handleSubmit = async (event: React.FormEvent | undefined) => {
        if (!event) return;
        event.preventDefault();
        formData[typeValue] = type

        for (const column of columns) {
            if (column.required && (formData[column.label] === undefined || formData[column.label] === '')) {
                alert(`${column.label} is required.`);
                return
            }
            if (
                column.type == LabeledInputType.NUMBER
                && column.constraint
                && (Number(formData[column.label]) < column.constraint.low || Number(formData[column.label]) > column.constraint.high)
            ) {
                alert(`${column.label} must be between ${column.constraint.low} and ${column.constraint.high}.`);
                return
            }
        }

        const error = await submitForm(formData, columns)
        setError(error) //this function will return null on success, and an error string on error, which means I can just set the error to the result
        handleClear()

        toast.success('Success!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    };

    const handleClear = () => {
        const clearedData = Object.keys(formData).reduce((acc, key) => {
            if (key !== typeValue) {
                acc[key] = '';
            }
            return acc;
        }, {} as { [key: string]: string });
        setFormData(clearedData);
    };

    const hoverClasses = (isActive: boolean): string =>
        `border border-argray rounded text-center text-lg px-11 py-4 mx-3
            ${isActive
            ? 'bg-argray text-white hover:text-white'
            : 'bg-superlightgr text-argray hover:text-argray'}`

    return (
        <>
            <div className="m-12">
                <NavLink to={'/addJewelry'} className={({isActive}) => (hoverClasses(isActive))}>
                    Jewelry
                </NavLink>
                <NavLink to={'/addStone'} className={({isActive}) => (hoverClasses(isActive))}>
                    Stone
                </NavLink>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 mx-10 my-4">
                <div className="flex justify-center px-10">
                    <h1 className="text-4xl font-medium py-4">{title}</h1>
                </div>
                <div>
                    <LabeledInput
                        label={typeValue}
                        type={LabeledInputType.SELECT}
                        required={true}
                        onChange={(e) => handleChange(typeValue, e)}
                        value={formData[typeValue]}
                        options={productTypes}
                        style="mb-4"
                        boxStyle="p-2 rounded-lg border w-44"
                    />
                    <form onSubmit={handleSubmit} className="grid grid-cols-4">
                        {columns.map((column, index) => (
                            <div className="mb-4" key={index}>
                                <LabeledInput
                                    label={column.label}
                                    type={column.type}
                                    value={formData[column.label] || ''}
                                    required={column.required}
                                    options={column.options}
                                    onChange={(e) => handleChange(column.label, e)}
                                    style="flex justify-between items-center"
                                    boxStyle="p-2 rounded-lg border w-36"
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
            <ToastContainer/>
        </>
    );
};

export default AddForm;
