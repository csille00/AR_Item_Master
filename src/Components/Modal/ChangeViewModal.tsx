import React from 'react';
import Button from "../Util/Button.tsx";
import {Modal} from "../Util/Modal.tsx";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    columns: string[];
    allColumns: string[]
    setColumns: (columns: string[]) => void;
    initialColumns: string[]
}

export const ChangeViewModal: React.FC<ModalProps> = ({isOpen, onClose, columns, setColumns, initialColumns, allColumns}) => {

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

    const handleReset = () => {
        setColumns(initialColumns)
    }

    if (!isOpen) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Column Filter"
            width="max-w-xl"
            footer={
                <>
                    <Button text="Select All" onClick={handleSelectAll} style="bg-argold text-sm text-white px-2 py-1 rounded-md hover:bg-darkgold hover:text-white" />
                    <Button text="Deselect All" onClick={handleDeselectAll} style="bg-lightgr text-sm text-white py-1 rounded-md hover:bg-argray hover:text-white" />
                    <Button text="Reset Default" onClick={handleReset} style="text-sm border border-lightgr text-argray py-1 rounded-md hover:bg-lightgr hover:text-white" />
                </>
            }
        >
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
        </Modal>
    );
};

// export default FilterModal;