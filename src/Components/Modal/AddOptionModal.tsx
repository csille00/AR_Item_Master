import React, {useEffect, useState} from 'react';
import Button from "../Util/Button.tsx";
import {Error} from "../Util/Error.tsx";
import {Modal} from "../Util/Modal.tsx";
import LabeledInput from "../Util/LabeledInput.tsx";
import {Bounce, toast} from "react-toastify";
import {GenericModalProps} from "../../Definitions/props.ts";
import {FormColumn} from "../../Definitions/FormColumn.ts";
import {AdminTableConfig} from "../../Definitions/FormConfig/adminConfig.ts";

export interface AddOptionModalProps extends GenericModalProps {
    onAddOption: (option: {[key: string]: any}) => Promise<void>;
    selectedTable: string;
}

export function AddOptionModal({
                                      isOpen,
                                      onClose,
                                      onAddOption,
                                      selectedTable,
                                  }: AddOptionModalProps): React.JSX.Element {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<{ [key: string]: any }>({});
    const [columns, setColumns] = useState<FormColumn[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        if (formData) {
            try {
                setIsLoading(true);
                await onAddOption(formData);
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
            } catch (error) {
                console.error((error as Error).message);
                setError(`Failed to update. Please try again later.`);
            } finally {
                setIsLoading(false);
                onClose();
            }
        }
    };

    useEffect(() => {
        const fetchFormConfig = async () => {
            setIsLoading(true);
            try {
                const configObj = new AdminTableConfig()
                const config = await configObj.getAdminTableConfig(selectedTable);
                setColumns(config);
            } catch (error) {
                setError("Failed to fetch form config: " + (error as Error).message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFormConfig();
    }, []);

    const handleChange = (label: string, event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [label]: event.target.value
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={"Add"}
            width="max-w-sm"
            noX={true}
            isLoading={isLoading}
            error={error}
            footer={
                <>
                    <Button text="Add" onClick={handleSubmit}
                            style="bg-argold text-sm text-white py-1 rounded-md hover:bg-darkgold hover:text-white" />
                    <Button text="Cancel" onClick={onClose}
                            style="bg-superlightgr text-sm text-argray py-1 rounded-md hover:bg-lightgr hover:text-white" />
                </>
            }
        >
            <div className="flex flex-col m-4 space-y-4">
                <form onSubmit={handleSubmit} className="">
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
        </Modal>
    );
}