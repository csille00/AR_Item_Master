import React, {useState} from 'react';
import Button from "../Util/Button.tsx";
import {Option} from "../../Definitions/DropdownOption.ts";
import {ArLoader} from "../Util/Loading.tsx";
import {Error} from "../Util/Error.tsx";
import {Modal} from "../Util/Modal.tsx";
import LabeledInput from "../Util/LabeledInput.tsx";
import {LabeledInputType} from "../../Definitions/enum.ts";
import {Bounce, toast} from "react-toastify";

export interface ChangeOptionModalProps {
    isOpen: boolean;
    onClose: () => void;
    label: string;
    option: Option;
    onUpdateOption: (option: Option) => Promise<void>;
}

export const EditOptionModal: React.FC<ChangeOptionModalProps> = ({
                                                                        isOpen,
                                                                        onClose,
                                                                        label,
                                                                        option,
                                                                        onUpdateOption,
                                                                    }) => {
    const [newOption, setNewOption] = useState<Option>(option);  // Initialize with the passed option
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

    if(isLoading){
        return <ArLoader/>
    }

    if(error){
        return <Error message={error}/>
    }

    if (!isOpen) {
        return null;
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={"Edit"}
            width="max-w-sm"
            footer={
                <Button text="Apply" onClick={handleApply}
                        style="bg-argold text-sm text-white py-1 rounded-md hover:bg-darkgold hover:text-white" />
            }
        >
            <div className="flex items-center justify-between m-4">
                <label>{label}</label>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
                </svg>
                <LabeledInput
                    type={LabeledInputType.STRING}
                    onChange={(e) => setNewOption({...newOption, description: e.target.value})}
                    value={`${newOption.description}`}
                    placeholder={"New Description"}
                    required={false}
                    style=""
                    boxStyle="p-2 rounded-lg border w-44"
                />
            </div>
        </Modal>
    );
};

