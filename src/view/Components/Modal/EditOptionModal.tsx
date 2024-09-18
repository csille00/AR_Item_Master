import React, {useState} from 'react';
import Button from "../Util/Button.tsx";
import {Error} from "../Util/Error.tsx";
import {Modal} from "../Util/Modal.tsx";
import LabeledInput from "../Util/LabeledInput.tsx";
import {LabeledInputType} from "../../../Definitions/enum.ts";
import {Bounce, toast} from "react-toastify";
import {GenericModalProps} from "../../../Definitions/props.ts";

export interface ChangeOptionModalProps extends GenericModalProps {
    option: { [key: string]: any };
    onUpdateOption: (option: { [key: string]: any }) => Promise<void>;
}

export const EditOptionModal: React.FC<ChangeOptionModalProps> = ({
                                                                      isOpen,
                                                                      onClose,
                                                                      option,
                                                                      onUpdateOption,
                                                                  }) => {
    const [newOption, setNewOption] = useState<{ [key: string]: any }>(option);  // Initialize with the passed option
    const [isLoading, setIsLoading] = useState(false);  // Set loading to false initially
    const [error, setError] = useState<string | null>(null);

    const handleApply = async () => {
        if (newOption) {
            try {
                setIsLoading(true);
                await onUpdateOption(newOption);
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
                setError(`Failed to update ${newOption.description}. Please try again later.`);
            } finally {
                setIsLoading(false);
                onClose();
            }
        }
    };

    const renderInput = (key: string, value: any) => {
        if (key === 'id') {
            return null; // Skip rendering for 'id' or any specific column you want to exclude
        }

        let type: LabeledInputType;
        if (typeof value === 'number') {
            type = LabeledInputType.NUMBER;
        } else {
            type = LabeledInputType.STRING;
        }

        return (
            <LabeledInput
                label={key.toUpperCase()}
                type={type}
                onChange={(e) => setNewOption({
                    ...newOption,
                    [key]: type === LabeledInputType.NUMBER ? Number(e.target.value) : e.target.value
                })}
                value={type === LabeledInputType.NUMBER ? newOption[key] : `${newOption[key]}`}
                placeholder={`Enter ${key}`}
                required={false}
                style=""
                boxStyle="p-2 rounded-lg border w-44"
            />
        );
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={"Edit"}
            width="max-w-md"
            noX={true}
            isLoading={isLoading}
            error={error}
            footer={
                <>
                    <Button text="Apply" onClick={handleApply}
                            style="bg-argold text-sm text-white py-1 rounded-md hover:bg-darkgold hover:text-white"/>
                    <Button text="Cancel" onClick={onClose}
                            style="bg-superlightgr text-sm text-argray py-1 rounded-md hover:bg-lightgr hover:text-white"/>
                </>
            }
        >
            <div className="flex flex-col m-4">
                {Object.entries(newOption).map(([key, value]) => renderInput(key, value))}
            </div>
        </Modal>
    );
};

