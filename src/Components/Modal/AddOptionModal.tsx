import React, {useState} from 'react';
import Button from "../Util/Button.tsx";
import {Option} from "../../Definitions/DropdownOption.ts";
import {ArLoader} from "../Util/Loading.tsx";
import {Error} from "../Util/Error.tsx";
import {Modal} from "../Util/Modal.tsx";
import LabeledInput from "../Util/LabeledInput.tsx";
import {LabeledInputType} from "../../Definitions/enum.ts";
import {Bounce, toast} from "react-toastify";

export interface AddOptionModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    onAddOption: (option: Option) => Promise<void>;
}

export const AddOptionModal: React.FC<AddOptionModalProps> = ({
                                                                        isOpen,
                                                                        onClose,
                                                                        title,
                                                                        onAddOption,
                                                                    }) => {
    const [newOption, setNewOption] = useState<Option | null>({description: ""});  // Initialize with the passed option
    const [isLoading, setIsLoading] = useState(false);  // Set loading to false initially
    const [error, setError] = useState<string | null>(null);

    const handleApply = async () => {
        if (newOption) {
            try {
                setIsLoading(true);
                await onAddOption(newOption);
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
                <Button text="Add" onClick={handleApply}
                        style="bg-argold text-sm text-white py-1 rounded-md hover:bg-darkgold hover:text-white" />
            }
        >
            <div className="flex items-center justify-between m-4">
                <label className="">
                    <div className="">
                        {title}
                    </div>
                </label>
                <LabeledInput
                    type={LabeledInputType.STRING}
                    onChange={(e) => setNewOption({ ...newOption, description: e.target.value })}
                    value={`${newOption?.description}`}
                    placeholder={"New Description"}
                    required={false}
                    style=""
                    boxStyle="p-2 rounded-lg border w-44"
                />
            </div>
        </Modal>
    );
};

