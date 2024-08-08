import React from 'react';
import Button from "./Button.tsx";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    columns: string[];
    allColumns: string[]
    setColumns: (columns: string[]) => void;
}

export const ChangeViewModal: React.FC<ModalProps> = ({isOpen, onClose, columns, setColumns, allColumns}) => {

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
            <div className="bg-white p-4 rounded-md w-full max-w-xl max-h-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Column Filter</h2>
                    <button onClick={onClose} className="text-argray bg-white text-xl">
                        &times;
                    </button>
                </div>
                <div className="mb-4">
                    <form className="grid grid-cols-3 gap-1">
                        {allColumns.map((column, index) => (
                            <div key={index} className="text-left pl-6">
                                <input
                                    type="checkbox"
                                    checked={columns.includes(column)}
                                    onChange={() => handleToggleColumn(column)}
                                />
                                <label className="ml-2">{column}</label>
                            </div>
                        ))}
                    </form>
                </div>
                <div className="flex justify-between mb-4 mt-4">
                    <Button text="Select All" onClick={handleSelectAll} style="bg-argold text-sm text-white px-2 py-1 rounded-md hover:bg-darkgold hover:text-white" />
                    <Button text="Deselect All" onClick={handleDeselectAll} style="bg-lightgr text-sm text-white py-1 rounded-md hover:bg-argray hover:text-white" />
                    <Button text="Reset Default" onClick={handleDeselectAll} style="text-sm border border-lightgr text-argray py-1 rounded-md hover:bg-lightgr hover:text-white" />
                </div>
            </div>
        </div>
    );
};

// export default FilterModal;