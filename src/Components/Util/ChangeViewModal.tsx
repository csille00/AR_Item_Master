import React from 'react';
import {ArJewelryMasterColumns} from "../../Definitions/enum.ts";
import Button from "./Button.tsx";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    columns: string[];
    setColumns: (columns: string[]) => void;
}

export const ChangeViewModal: React.FC<ModalProps> = ({isOpen, onClose, columns, setColumns}) => {
    // const [filterOption, setFilterOption] = useState<string>('option1');
    const allColumns = Object.values(ArJewelryMasterColumns);

    const handleToggleColumn = (column: string) => {
        if (columns.includes(column)) {
            setColumns(columns.filter(c => c !== column));
        } else {
            setColumns([...columns, column]);
        }
    };

    const handleSelectAll = () => {
        setColumns(allColumns);
    };

    const handleDeselectAll = () => {
        setColumns([]);
    };


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-argray bg-opacity-50">
            <div className="bg-white p-4 rounded-md w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Column Filter</h2>
                    <button onClick={onClose} className="text-argray bg-white text-xl">
                        &times;
                    </button>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Columns:
                    </label>
                    {allColumns.map((column, index) => (
                        <div key={index}>
                            <input
                                type="checkbox"
                                checked={columns.includes(column)}
                                onChange={() => handleToggleColumn(column)}
                            />
                            <label className="ml-2">{column}</label>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mb-4">
                    <Button text="Select All" onClick={handleSelectAll} style="bg-lightgr text-white px-4 py-2 rounded-md hover:bg-argray" />
                    <Button text="Deselect All" onClick={handleDeselectAll} style="bg-lightgr text-white px-4 py-2 rounded-md hover:bg-argray" />
                </div>
            </div>
        </div>
    );
};

// export default FilterModal;