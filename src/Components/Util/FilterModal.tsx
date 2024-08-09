import React, {useEffect, useState} from 'react';
import Button from "./Button.tsx";
import {FilterOption} from "../../Definitions/FilterOption.ts";
import {Option} from "../../Definitions/DropdownOption.ts";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: string
    setFilterOptions: (options: FilterOption[]) => void;
    fetchProductTypes: () => Promise<Option[] | undefined>;
    clearFilterOptions: () => void;
    onApplyFilters: () => void;
}

export const FilterModal: React.FC<ModalProps> = ({
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
        return <p>Loading...</p>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-argray bg-opacity-50">
            <div className="bg-white p-4 rounded-md w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Filter</h2>
                    <button onClick={onClose} className="text-argray bg-white text-xl">
                        &times;
                    </button>
                </div>
                <div className="mb-4">
                    <div className="flex justify-start items-center">
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
                </div>
                <div className="flex justify-between m-4 pt-2">
                    <Button text="Apply" onClick={handleApply}
                            style="bg-argold text-sm text-white px-2 py-1 rounded-md hover:bg-darkgold hover:text-white"/>
                </div>
            </div>
        </div>
    );
};
