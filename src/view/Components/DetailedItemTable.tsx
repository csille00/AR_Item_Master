import React, {useEffect, useMemo, useState} from "react";
import {Tables} from "../../Definitions/generatedDefinitions.ts";
import {FormColumn} from "../../Definitions/FormColumn.ts";
import {Error} from "./Util/Error.tsx";
import {ArLoader} from "./Util/Loading.tsx";
import LabeledInput from "./Util/LabeledInput.tsx";
import {LabeledInputType} from "../../Definitions/enum.ts";
import Button from "./Util/Button.tsx";
import {useNavigate} from "react-router-dom";
import backIcon from "../../assets/back.svg";

interface ItemTableProps {
    fetchColumns: () => Promise<FormColumn[]>
    itemSku: string;
    fetchItem: (sku: string) => Promise<Tables<"ar_jewelry_master"> | null>
    transformColumn: (col: string) => string
    onSubmitEdit: (data: { [key: string]: string | number }, columns: FormColumn[]) => Promise<string | null>;
    breakPattern: number[];
}

const ItemTable: React.FC<ItemTableProps> = ({
                                                 fetchColumns,
                                                 itemSku,
                                                 fetchItem,
                                                 transformColumn,
                                                 onSubmitEdit,
                                                 breakPattern
                                             }) => {
    const [editingKey, setEditingKey] = useState<string | null>(null);
    const [editedValue, setEditedValue] = useState<string | number>("");
    const [columns, setColumns] = useState<FormColumn[]>([]);
    const [item, setItem] = useState<any>(null);
    const [formData, setFormData] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [nonce, setNonce] = useState(0);
    const navigate = useNavigate();

    // Fetch columns once or when fetchColumns changes
    useEffect(() => {
        const fetchFormConfig = async () => {
            setIsLoading(true);
            try {
                const config = await fetchColumns();
                setColumns(config);
            } catch (error) {
                setError("Failed to fetch form config: " + (error as Error).message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchFormConfig();
    }, [fetchColumns]);

    // Fetch item when itemSku changes
    useEffect(() => {
        const getItem = async () => {
            const data = await fetchItem(itemSku);
            if (data) {
                setItem(data);
                setFormData(prevFormData => ({
                    ...prevFormData,
                    ...Object.fromEntries(Object.entries(data))
                }));
                console.log("ITEM: ", data);
            }
        };
        getItem();
    }, [itemSku, fetchItem, nonce]);

    // Memoize the columns to avoid recalculating on every render
    const memoizedColumns = useMemo(() => columns, [columns]);

    const handleEdit = (key: string, value: any) => {
        setEditingKey(key);
        setEditedValue(value);

        setFormData(prevFormData => ({
            ...prevFormData,
            [key]: value
        }));
        console.log("edited value", value, ' ', key);
        console.log("form data: ", formData);
    };

    const handleSave = async () => {
        setIsLoading(true);
        if (editingKey) {
            for (const column of memoizedColumns) {
                const col = transformColumn(column.label)
                if (
                    column.type === LabeledInputType.NUMBER
                    && column.constraint
                    && (Number(formData[col] ?? 0) < column.constraint.low || Number(formData[col] ?? 0) > column.constraint.high)
                ) {
                    alert(`${column.label} must be between ${column.constraint.low} and ${column.constraint.high}.`);
                    setIsLoading(false);
                    return;
                }
            }

            await onSubmitEdit(formData, memoizedColumns);
            setEditingKey(null);
            setNonce(prevNonce => prevNonce + 1);
        }
        setIsLoading(false);
    };

    const getFormDataValue = (column: string): string => {
        const data = formData[transformColumn(column)] ?? ''
        if (data.toString() === 'true') return 'Yes'
        else if (data.toString() === 'false') return 'No'
        else return data
    }

    if (isLoading) {
        return <ArLoader/>;
    }

    if (error) {
        return <Error message={error}/>;
    }

    const renderInput = (column: FormColumn): React.ReactElement => {
        return (
            <LabeledInput
                label={column.label}
                type={column.type}
                value={getFormDataValue(column.label)}
                required={false}
                options={column.options}
                onChange={(e) => handleEdit(transformColumn(column.label), e.target.value)}
                style="flex justify-end items-center"
                boxStyle="p-2 rounded-lg border w-36"
            />
        );
    }

    const determineBreak = (index: number, breakPattern: number[]) => {
        if (breakPattern.includes(index + 1)) {
            return <div className="col-span-full mb-10"></div> // Empty div to create space
        }
    }

    return (
        <div className="mx-6 border border-lightgr rounded-lg mt-10 bg-white">
            <div className="flex justify-start ml-2 my-2">
                <Button
                    onClick={() => navigate(-1)}
                    icon={backIcon}
                    style="mt-4"
                />
            </div>
            <div className="flex justify-between mb-6 mx-6">
                <div className="col">
                    <h1 className="text-4xl font-medium text-argray my-4">{item.prod_name}</h1>
                </div>
                <div className="col flex my-2">
                    <Button text="Reset" onClick={handleSave}
                            style="bg-superlightgr rounded-lg text-argray hover:text-argray mx-4"/>
                    <Button text="Update Product" onClick={handleSave}
                            style="bg-argold rounded-lg text-white hover:text-white mx-2"/>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <form onSubmit={handleSave} className="grid grid-cols-4">
                    {memoizedColumns.map((column, index) => (
                        <>
                            <div className="mb-3 mr-4" key={index}>
                                {renderInput(column)}
                            </div>
                            {determineBreak(index, breakPattern)}
                        </>
                    ))}
                </form>
            </div>
        </div>

    );
};

export default ItemTable;