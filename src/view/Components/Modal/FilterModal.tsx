import React, {useEffect, useMemo, useState} from 'react';
import Button from "../Util/Button.tsx";
import {FilterOption} from "../../../Definitions/FilterOption.ts";
import {Option} from "../../../Definitions/DropdownOption.ts";
import {Modal} from "../Util/Modal.tsx";
import {GenericModalProps} from "../../../Definitions/props.ts";
import {FilterModalPresenter, FilterModalView} from "../../../presenter/FilterModalPresenter.ts";

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

    const listener: FilterModalView = {
        setFilterOptionsMap: setFilterOptionsMap,
        setIsLoading: setIsLoading,
        setError: setError,
        onApplyFilters: onApplyFilters,
        onClose: onClose,
        setFilterOptions: setFilterOptions,
        fetchFilters: fetchFilters
    }

    const presenter = useMemo(() => new FilterModalPresenter(listener), [listener]);

    useEffect(() => {
        if (!isOpen) {
            presenter.getFilterOptions().then(() => setIsLoading(false))
        }
    }, [isOpen, fetchFilters]);

    const handleApply = () => {
        onApplyFilters();
        onClose();
    };

    const clearAllFilters = () => {
        presenter.clearAllFilters(filterOptions)
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
                                onChange={(e) => presenter.handleChange(filterKey, filterOptions, e)}
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