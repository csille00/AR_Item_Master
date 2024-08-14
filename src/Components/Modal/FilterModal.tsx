import React, {useEffect, useState} from 'react';
import Button from "../Util/Button.tsx";
import {FilterOption} from "../../Definitions/FilterOption.ts";
import {Option} from "../../Definitions/DropdownOption.ts";
import {ArLoader} from "../Util/Loading.tsx";
import {Error} from "../Util/Error.tsx";
import {Modal} from "../Util/Modal.tsx";

interface FilterModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: string
    setFilterOptions: (options: FilterOption[]) => void;
    fetchProductTypes: () => Promise<Option[] | undefined>;
    onApplyFilters: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
                                                      isOpen,
                                                      onClose,
                                                      type,
                                                      setFilterOptions,
                                                      fetchProductTypes,
                                                      onApplyFilters,
                                                  }) => {
    const [productTypeOptions, setProductTypeOptions] = useState<Option[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getProductTypes = async () => {
        setIsLoading(true);
        try {
            const data = await fetchProductTypes();
            if (data) {
                setProductTypeOptions(data);
            }
        } catch (error) {
            console.error("Failed to fetch product types:", error);
            setError("Failed to fetch product types: " + (error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getProductTypes().then();
    }, []);

    const handleApply = () => {
        onApplyFilters();
        onClose();
    };

    const handleChange = (label: string, event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (label === type) {
            const option = new FilterOption(type, event.target.value);
            setFilterOptions([option])
        }
    };

    if (isLoading) {
        return <ArLoader/>;
    }

    if (error) {
        return <Error message={error}/>
    }

    if (!isOpen) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Filter"
            width="max-w-md"
            footer={
                <Button text="Apply" onClick={handleApply} style="bg-argold text-sm text-white px-2 py-1 rounded-md hover:bg-darkgold hover:text-white" />
            }
        >
            <div className="flex items-center justify-between mr-4">
                <label className="py-2 flex justify-between items-center">
                    <div className="inline mx-4">
                        {type}
                    </div>
                </label>
                <select
                    className="p-2 rounded-lg border"
                    name="selectType"
                    onChange={(e) => handleChange(type, e)}
                >
                    <option key={'disabled'} disabled={true} value='' selected={true}>--</option>
                    <option key={'ALL'} value='ALL'>All</option>
                    {productTypeOptions.map((option, index) => (
                        <option key={index} value={option.id}>
                            {option.description}
                        </option>
                    ))}
                </select>
            </div>
        </Modal>
    );
};
