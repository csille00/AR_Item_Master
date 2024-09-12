import {Presenter} from "./Presenter.ts";
import {ACTIONS, ItemMasterView} from "./ItemMasterPresenter.ts";
import React, {MutableRefObject} from "react";

export interface TableView extends ItemMasterView {
    fetchData: (sortChange: boolean, resetPage: boolean) => Promise<void>,
    setSearch: (value: (((prevState: string) => string) | string)) => void
    getSortColumn: (column: string) => string
    fetchDataAsCSV: () => Promise<string>
}

export class TablePresenter extends Presenter<TableView> {

    protected get view(): TableView {
        return super.view as TableView
    }

    getMoreData = async (resetPage: boolean, sortChange: boolean = false ) => {
        try {
            if (!this.view.state.hasMore) {
                console.log('stopping')
                return
            }
            await this.view.fetchData(sortChange, resetPage);
        } catch (error) {
            this.view.dispatch({type: ACTIONS.SET_ERROR, payload: error})
        }
    }

    handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.view.setSearch(event.target.value);
    };

    handleSort = (column: string, curSortColumn: string) => {
        this.view.dispatch({type: ACTIONS.SET_SORT_COLUMN, payload: this.view.getSortColumn(column)})
        this.view.dispatch({type: ACTIONS.TOGGLE_SORT_DIRECTION, payload: curSortColumn})
    };

    download = async (filename: string) => {
        if (!this.view.fetchDataAsCSV) return
        const data = await this.view.fetchDataAsCSV()
        const blob = new Blob([data], {type: 'text/csv'});
        const url = window.URL.createObjectURL(blob);
        // Create a link element
        const a = document.createElement('a');
        a.href = url;
        a.download = filename ?? "data.csv";

        a.click();
        window.URL.revokeObjectURL(url);
    }

    // Debounced handleScroll
    handleScroll(containerRef: MutableRefObject<HTMLDivElement>) {
        return this.debounce(() => {
            if (containerRef.current) {
                const {scrollTop, scrollHeight, clientHeight} = containerRef.current;
                if (scrollHeight - scrollTop <= clientHeight + 10) { // Add a small buffer
                    if (this.view.state.hasMore) {
                        this.view.dispatch({type: ACTIONS.INCREMENT_PAGE});
                    }
                }
            }
        }, 100)
    }

    getFilteredData(data: any[], search: string) {
        if (!search) return data;

        return data.filter(item =>
            item.prod_name?.toLowerCase().includes(search.toLowerCase()) ||
            item.sku_number?.toLowerCase().includes(search.toLowerCase())
        );
    }

    getSortedData(data: any[]) {
        if (!this.view.state.sortColumn) return data;

        return [...data].sort((a, b) => {
            const col = this.view.getSortColumn(this.view.state.sortColumn);
            const aValue = this.getValueByPath(a[col]);
            const bValue = this.getValueByPath(b[col]);

            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return this.view.state.sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
            } else {
                const aStr = String(aValue);
                const bStr = String(bValue);
                return this.view.state.sortDirection === 'asc' ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
            }
        });
    }

    private getValueByPath = (obj: any) => {
        if (obj === null) return '';
        if (typeof obj !== 'object') return obj;
        return Object.values(obj)[0];
    };

}