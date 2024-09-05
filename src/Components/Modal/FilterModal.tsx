import React, {useEffect, useState} from 'react';
import Button from "../Util/Button.tsx";
import {FilterOption} from "../../Definitions/FilterOption.ts";
import {Option} from "../../Definitions/DropdownOption.ts";
import {Error} from "../Util/Error.tsx";
import {Modal} from "../Util/Modal.tsx";
import {GenericModalProps} from "../../Definitions/props.ts";

interface FilterModalProps extends GenericModalProps {
    filterOptions: FilterOption[];
    setFilterOptions: (options: FilterOption[]) => void;
    fetchFilters: { [key: string]: () => Promise<Option[] | undefined> }; // key is the filter name
    onApplyFilters: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
                                                            isOpen,
                                                            onClose,
                                                            label,
                                                            filterOptions,
                                                            setFilterOptions,
                                                            fetchFilters,
                                                            onApplyFilters,
                                                        }) => {
    const [filterOptionsMap, setFilterOptionsMap] = useState<{ [key: string]: Option[] }>({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getFilterOptions = async () => {
            setIsLoading(true);
            try {
                const filterDataPromises = Object.keys(fetchFilters).map(async (filterKey) => {
                    const data = await fetchFilters[filterKey]();
                    if (data) {
                        return {key: filterKey, options: data};
                    }
                    return {key: filterKey, options: []};
                });

                const resolvedFilters = await Promise.all(filterDataPromises);
                const optionsMap = resolvedFilters.reduce((acc, {key, options}) => {
                    acc[key] = options;
                    return acc;
                }, {} as { [key: string]: Option[] });

                setFilterOptionsMap(optionsMap);
            } catch (error) {
                console.error("Failed to fetch filter options:", error);
                setError("Failed to fetch filter options: " + (error as Error).message);
            } finally {
                setIsLoading(false);
            }
        };

        if (isOpen) {
            setIsLoading(true)
            getFilterOptions().then(() => setIsLoading(false))
        }
    }, [isOpen, fetchFilters]);

    const handleApply = () => {
        onApplyFilters();
        onClose();
    };

    function upsert<T>(array: T[], item: T, predicate: (existingItem: T) => boolean): T[] {
        const index = array.findIndex(predicate);

        if (index > -1) {
            // Item found, replace it
            array[index] = item;
        } else {
            // Item not found, add it
            array.push(item);
        }

        return array;
    }

    const handleChange = (label: string, event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const option = new FilterOption(label, event.target.value);
        setFilterOptions(upsert(filterOptions, option, (o) => o.column === label));
        console.log(filterOptions)
    };

    const clearAllFilters = () => {
        for (let i = 0; i < filterOptions.length; i++) {
            const newOption = new FilterOption(filterOptions[i].column, 'ALL')
            setFilterOptions(upsert(filterOptions, newOption, (o) => o.column === filterOptions[i].column))
        }
        handleApply()
    }

    const renderOption = (option: Option, filterKey: string): React.JSX.Element => {
        // Check if the current option.id is in the filterOptions
        const isSelected = filterOptions.some(o => option.id && o.value.toString() === option.id.toString() && o.column == filterKey);

        return (
            <option key={option.id} value={option.id} selected={isSelected}>
                {option.description}
            </option>
        );
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={label}
            width="max-w-md"
            isLoading={isLoading}
            error={error}
            footer={
                <>
                    <Button
                        text="Apply"
                        onClick={handleApply}
                        style="bg-argold text-sm text-white px-2 py-1 rounded-md hover:bg-darkgold hover:text-white"
                    />
                    <Button
                        text="Clear All Filters"
                        onClick={clearAllFilters}
                        style="bg-lightgr text-sm text-white px-2 py-1 rounded-md hover:bg-argray hover:text-white"
                    />
                </>
            }
        >
            <div className="modal-body" style={{maxHeight: '400px', overflowY: 'auto'}}>
                {Object.keys(filterOptionsMap).map((filterKey) => {
                    return (
                        <div key={filterKey} className="flex items-center justify-between mr-4 py-2">
                            <label className="py-2 flex justify-between items-center">
                                <div className="inline mx-4">
                                    {filterKey}
                                </div>
                            </label>
                            <select
                                className="p-2 rounded-lg border"
                                name={`select-${filterKey}`}
                                onChange={(e) => handleChange(filterKey, e)}
                            >
                                <option key="disabled" disabled={true} value="">
                                    --
                                </option>
                                <option key="ALL" value="ALL">
                                    All
                                </option>
                                {filterOptionsMap[filterKey]?.map((option) => (
                                    renderOption(option, filterKey)
                                ))}
                            </select>
                        </div>
                    );
                })}
            </div>
        </Modal>
    );
};