import React, {useState} from 'react';
import Button from "../Util/Button.tsx";
import {Option} from "../../Definitions/DropdownOption.ts";
import {Error} from "../Util/Error.tsx";
import {Modal} from "../Util/Modal.tsx";
import {GenericModalProps} from "../../Definitions/props.ts";

export interface DeleteConfirmModalProps extends GenericModalProps {
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
            } catch (error) {
                console.error((error as Error).message);
                setError(`Failed to update ${newOption.description}. Please try again later.`);
            } finally {
                setIsLoading(false);
                onClose();
            }
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={"Confirm Delete"}
            width="max-w-sm"
            noX={true}
            isLoading={isLoading}
            error={error}
            footer={
                <>
                    <Button text="Delete" onClick={handleDelete}
                            style="bg-red text-sm text-white py-1 rounded-md hover:bg-darkred hover:text-white"/>
                    <Button text="Cancel" onClick={onClose}
                            style="bg-superlightgr text-sm text-argray py-1 rounded-md hover:bg-lightgr hover:text-white"/>

                </>
            }>
            <div className="flex items-center justify-between m-4">
                <label>Are you sure you want to delete <span className="font-bold">{label}</span>?</label>
            </div>
        </Modal>
    )
};

