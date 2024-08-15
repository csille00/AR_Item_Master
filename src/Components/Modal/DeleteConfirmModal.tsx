import React, {useState} from 'react';
import Button from "../Util/Button.tsx";
import {Option} from "../../Definitions/DropdownOption.ts";
import {ArLoader} from "../Util/Loading.tsx";
import {Error} from "../Util/Error.tsx";
import {Modal} from "../Util/Modal.tsx";
import LabeledInput from "../Util/LabeledInput.tsx";
import {LabeledInputType} from "../../Definitions/enum.ts";
import {Bounce, toast} from "react-toastify";

export interface DeleteConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    label: string;
    option: Option;
    onDeleteOption: (option: Option) => Promise<void>;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
                                                                          isOpen,
                                                                          onClose,
                                                                          label,
                                                                          option,
                                                                          onDeleteOption,
                                                                      }) => {
    const [newOption, setNewOption] = useState<Option>(option);
    const [isLoading, setIsLoading] = useState(false);  // Set loading to false initially
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async () => {
        if (newOption) {
            try {
                setIsLoading(true);
                await onDeleteOption(newOption);
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


    if (isLoading) {
        return <ArLoader/>
    }

    if (error) {
        return <Error message={error}/>
    }

    if (!isOpen) {
        return null;
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={"Confirm Delete"}
            width="max-w-sm"
            footer={
                <Button text="Delete" onClick={handleDelete}
                        style="bg-argold text-sm text-white py-1 rounded-md hover:bg-darkgold hover:text-white"/>

            }>
            <div className="flex items-center justify-between m-4">
                <label>Are you sure you want to delete <span className="font-bold">{label}</span>?</label>
            </div>
        </Modal>
    )
};

