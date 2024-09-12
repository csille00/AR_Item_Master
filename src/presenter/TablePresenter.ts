import {Presenter} from "./Presenter.ts";
import {ACTIONS, ItemMasterView} from "./ItemMasterPresenter.ts";
import React, {MutableRefObject} from "react";

export interface TableView extends ItemMasterView {
    fetchData: () => Promise<void>,
    setSearch: (value: (((prevState: string) => string) | string)) => void
    setSortColumn: (value: (((prevState: string) => string) | string)) => void
    setSortDirection: (value: (((prevState: ("asc" | "desc")) => ("asc" | "desc")) | "asc" | "desc")) => void
    getSortColumn: (column: string) => string
    fetchDataAsCSV: () => Promise<string>
}

export class TablePresenter extends Presenter<TableView> {

    protected get view(): TableView {
        return super.view as TableView
    }

    getMoreData = async () => {
        try {
            if (!this.view.state.hasMore) {
                console.log('stopping')
                return
            }
            const items = await this.view.fetchData();
            if (!items) return
        } catch (error) {
            this.view.dispatch({type: ACTIONS.SET_ERROR, payload: error})
        }
    }

    handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.view.setSearch(event.target.value);
    };

    handleSort = (column: string, curSortColumn: string) => {
        this.view.setSortColumn(prevColumn =>
            prevColumn === column
                ? column
                : column
        );
        this.view.setSortDirection(prevDirection =>
            curSortColumn === column
                ? prevDirection === 'asc' ? 'desc' : 'asc'
                : 'asc'
        );
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

    getSortedData(data: any[], sortColumn: string, sortDirection: "asc" | "desc") {
        if (!sortColumn) return data;

        return [...data].sort((a, b) => {
            const col = this.view.getSortColumn(sortColumn);
            const aValue = this.getValueByPath(a[col]);
            const bValue = this.getValueByPath(b[col]);

            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
            } else {
                const aStr = String(aValue);
                const bStr = String(bValue);
                return sortDirection === 'asc' ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
            }
        });
    }

    private getValueByPath = (obj: any) => {
        if (obj === null) return '';
        if (typeof obj !== 'object') return obj;
        return Object.values(obj)[0];
    };

}