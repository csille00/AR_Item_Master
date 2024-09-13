import {Presenter} from "./Presenter.ts";
import {ACTIONS, ItemMasterView} from "./ItemMasterPresenter.ts";
import {MutableRefObject} from "react";

export interface TableView extends ItemMasterView {
    fetchData: (searchString: string, sortChange: boolean, resetPage: boolean) => Promise<void>,
    getSortColumn: (column: string) => string
    fetchDataAsCSV: () => Promise<string>
}

export class TablePresenter extends Presenter<TableView> {

    protected get view(): TableView {
        return super.view as TableView
    }

    getMoreData = async (searchString: string, resetPage: boolean = false, sortChange: boolean = false) => {
        try {
            if (resetPage) {
                // Set the flag to true before resetting the page
                this.view.dispatch({type: ACTIONS.SET_INTERNAL_PAGE_RESET, payload: true})
                this.view.dispatch({ type: ACTIONS.SET_PAGE, payload: 1 });
            }
            if (!this.view.state.hasMore && !resetPage) {
                console.log('stopping');
                return;
            }
            await this.view.fetchData(searchString, sortChange, resetPage);
            this.view.dispatch({type: ACTIONS.SET_INTERNAL_PAGE_RESET, payload: false})
        } catch (error) {
            this.view.dispatch({ type: ACTIONS.SET_ERROR, payload: error });
        }
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
                if (scrollHeight - scrollTop <= clientHeight) { // Add a small buffer
                    if (this.view.state.hasMore) {
                        this.view.dispatch({type: ACTIONS.INCREMENT_PAGE});
                    }
                }
            }
        }, 100)
    }
}