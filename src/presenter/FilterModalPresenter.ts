import {Option} from "../Definitions/DropdownOption.ts";
import {FilterOption} from "../Definitions/FilterOption.ts";
import {Presenter} from "./Presenter.ts";
import {Error} from "../view/Components/Util/Error.tsx";
import React from "react";

export interface FilterModalView {
    setFilterOptionsMap: (value: (((prevState: { [p: string]: Option[] }) => { [p: string]: Option[] }) | {
        [p: string]: Option[]
    })) => void
    setIsLoading: (value: (((prevState: boolean) => boolean) | boolean)) => void
    setError: (value: (((prevState: string) => string) | string)) => void
    onApplyFilters: () => void
    onClose: () => void
    setFilterOptions: (options: FilterOption[]) => void
    fetchFilters: { [key: string]: () => Promise<Option[] | undefined> }
}

export class FilterModalPresenter extends Presenter<FilterModalView> {

    async getFilterOptions() {
        this.view.setIsLoading(true);
        try {
            const filterDataPromises = Object.keys(this.view.fetchFilters).map(async (filterKey) => {
                const data = await this.view.fetchFilters[filterKey]();
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

            this.view.setFilterOptionsMap(optionsMap);
        } catch (error) {
            console.error("Failed to fetch filter options:", error);
            this.view.setError("Failed to fetch filter options: " + (error as Error).message);
        } finally {
            this.view.setIsLoading(false);
        }
    };

    private upsert<T>(array: T[], item: T, predicate: (existingItem: T) => boolean): T[] {
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

    handleChange = (label: string, filterOptions: FilterOption[], event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const option = new FilterOption(label, event.target.value);
        this.view.setFilterOptions(this.upsert(filterOptions, option, (o) => o.column === label));
        console.log(filterOptions)
    };

    clearAllFilters = (filterOptions: FilterOption[]) => {
        for (let i = 0; i < filterOptions.length; i++) {
            const newOption = new FilterOption(filterOptions[i].column, 'ALL')
            this.view.setFilterOptions(this.upsert(filterOptions, newOption, (o) => o.column === filterOptions[i].column))
        }
    }
}