import React, {useEffect, useState} from 'react';
import Button from "../Util/Button.tsx";
import {Modal} from "../Util/Modal.tsx";
import {GenericModalProps} from "../../Definitions/props.ts";
import LabeledInput from "../Util/LabeledInput.tsx";
import {DefaultJewelryViews} from "../../Definitions/DefaultJewelryViews.ts";
import {LabeledInputType} from "../../Definitions/enum.ts";
import {DefaultViews} from "../../Definitions/DefaultViews.ts";

interface ChangeViewModalProps extends GenericModalProps {
    columns: string[];
    allColumns: string[]
    setColumns: (columns: string[]) => void;
    rowGenerator: DefaultViews
}

export const ChangeViewModal: React.FC<ChangeViewModalProps> = ({
                                                                    isOpen,
                                                                    onClose,
                                                                    label,
                                                                    columns,
                                                                    setColumns,
                                                                    rowGenerator,
                                                                    allColumns
                                                                }) => {
    const rowOptions = rowGenerator.rowOptions
    const [defaultView, setDefaultView] = useState<string>(Object.keys(rowOptions)[0]); // Initialize with the first key

    useEffect(() => {
        const defaultColumns = rowOptions[defaultView]?.map(option => option.description) || [];

        if (JSON.stringify(defaultColumns) !== JSON.stringify(columns)) {
            setColumns(defaultColumns);
        }
    }, [defaultView, rowOptions, columns, setColumns]);


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
        setDefaultView('default');
    };

    const handleDefaultViewChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDefaultView(event.target.value);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={label}
            width="max-w-xl"
            footer={
                <>
                    <Button text="Select All" onClick={handleSelectAll}
                            style="bg-argold text-sm text-white px-2 py-1 rounded-md hover:bg-darkgold hover:text-white"/>
                    <Button text="Deselect All" onClick={handleDeselectAll}
                            style="bg-lightgr text-sm text-white py-1 rounded-md hover:bg-argray hover:text-white"/>
                    <Button text="Reset Default" onClick={handleReset}
                            style="text-sm border border-lightgr text-argray py-1 rounded-md hover:bg-lightgr hover:text-white"/>
                </>
            }
        >
            <form className="flex flex-col items-center">
                {/* Dropdown container */}
                <div className="mb-4">
                    <LabeledInput
                        label="Default Views"
                        type={LabeledInputType.SELECT}
                        required={false}
                        value={defaultView}
                        onChange={handleDefaultViewChange}
                        options={Object.keys(rowOptions).map(key => ({id: key, description: key}))}
                        style="flex justify-between items-center"
                        boxStyle="p-2 rounded-lg border w-36"
                    />
                </div>

                {/* Checkboxes container */}
                <div className="grid grid-cols-3 gap-1">
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
                </div>
            </form>

        </Modal>
    );
};
