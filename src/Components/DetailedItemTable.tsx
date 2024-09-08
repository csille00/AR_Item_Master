import React, {useEffect, useState} from "react";
import {Tables} from "../Definitions/generatedDefinitions.ts";

interface ItemTableProps {
    itemSku: string;
    fetchItem: (sku: string) => (sku) => Promise<Tables<"ar_jewelry_master"> | null>
    onEdit: (sku: string, key: string, value: any) => Promise<void>;
}

const ItemTable: React.FC<ItemTableProps> = ({ itemSku, fetchItem, onEdit }) => {
    const [editingKey, setEditingKey] = useState<string | null>(null); // Track the currently edited key
    const [editedValue, setEditedValue] = useState<string | number>("");
    const [item, setItem] = useState<any>('');

    useEffect(() => {
        const getItem = async () => {
            const data = await fetchItem(itemSku)
            if(data){
                console.log(Object.keys(data))
                setItem(data)
            }
        }
        getItem().then()
    }, []);

    const handleEdit = async (key: string, value: any) => {
        setEditingKey(key);
        setEditedValue(value);
        console.log("edited value", editedValue)
    };

    const handleSave = async () => {
        if (editingKey) {
            await onEdit(item.sku_number, editingKey, editedValue);
            setEditingKey(null); // Exit edit mode after saving
            window.location.reload();
        }
    };

    const renderValue = (value: any) => {
        // Handle different value types (e.g., nested objects, arrays)
        if (typeof value === "object" && value !== null) {
            return value.description || JSON.stringify(value);
        }
        return String(value);
    };

    return (
        <div className="mx-4 border border-lightgr rounded-lg mt-10 bg-white">
            <table className="table-auto w-full text-left text-argray">
                <thead className="bg-lightgray">
                <tr>
                    <th className="p-4">Key</th>
                    <th className="p-4">Value</th>
                    <th className="p-4">Actions</th>
                </tr>
                </thead>
                <tbody>
                {Object.keys(item).map((key) => (
                    <tr key={key}>
                        <td className="p-4 font-bold">{key}</td>
                        <td className="p-4">
                            {editingKey === key ? (
                                <input
                                    type="text"
                                    className="border rounded p-2 w-full"
                                    value={editedValue}
                                    onChange={(e) => setEditedValue(e.target.value)}
                                />
                            ) : (
                                renderValue(item[key])
                            )}
                        </td>
                        <td className="p-4">
                            {editingKey === key ? (
                                <button
                                    className="bg-argold text-white px-4 py-2 rounded"
                                    onClick={handleSave}
                                >
                                    Save
                                </button>
                            ) : (
                                <button
                                    className="bg-lightgray text-argray px-4 py-2 rounded"
                                    onClick={() => handleEdit(key, item[key])}
                                >
                                    Edit
                                </button>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ItemTable;
