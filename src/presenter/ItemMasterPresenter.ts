import {Presenter, View} from "./Presenter.ts";
import {Error} from "../view/Components/Util/Error.tsx";
import {FilterOption} from "../Definitions/FilterOption.ts";
import {ReducerAction} from "react";

export const PAGE_NUMBER = 100

export enum ACTIONS {
    TOGGLE_FILTER_MODAL,
    TOGGLE_COLUMN_MODAL,
    SET_FILTER_OPTIONS,
    SET_LOADING,
    SET_DATA,
    SET_HAS_MORE,
    SET_PAGE,
    INCREMENT_PAGE,
    SET_ERROR,
    SET_COLUMNS,
}

// Define state interface
export interface ItemMasterState {
    isFilterModalOpen: boolean;
    isColumnModalOpen: boolean;
    filterOptions: FilterOption[];
    isLoading: boolean;
    data: any[];
    hasMore: boolean;
    page: number;
    error: string | null;
    columns: string[];
}

// Initial state
export const initialState: ItemMasterState = {
    isFilterModalOpen: false,
    isColumnModalOpen: false,
    filterOptions: [],
    isLoading: false,
    data: [],
    hasMore: true,
    page: 1,
    error: null,
    columns: [],
};

// Reducer function
export const itemMasterReducer = (state: ItemMasterState, action: {
    type: ACTIONS;
    payload?: any
}): ItemMasterState => {
    switch (action.type) {
        case ACTIONS.TOGGLE_FILTER_MODAL:
            return {...state, isFilterModalOpen: !state.isFilterModalOpen};
        case ACTIONS.TOGGLE_COLUMN_MODAL:
            return {...state, isColumnModalOpen: !state.isColumnModalOpen};
        case ACTIONS.SET_FILTER_OPTIONS:
            return {...state, filterOptions: action.payload};
        case ACTIONS.SET_LOADING:
            return {...state, isLoading: action.payload};
        case ACTIONS.SET_DATA:
            return {...state, data: action.payload};
        case ACTIONS.SET_HAS_MORE:
            return {...state, hasMore: action.payload};
        case ACTIONS.SET_PAGE:
            return {...state, page: action.payload};
        case ACTIONS.INCREMENT_PAGE:
            return {...state, page: state.page + 1}
        case ACTIONS.SET_ERROR:
            return {...state, error: action.payload};
        case ACTIONS.SET_COLUMNS:
            return {...state, columns: action.payload};
        default:
            return state;
    }
};

export interface ItemMasterView extends View {
    state: ItemMasterState
    dispatch: (value: ReducerAction<(state: ItemMasterState, action: {
        type: ACTIONS,
        payload?: any
    }) => ItemMasterState>) => void
}

export class ItemMasterPresenter extends Presenter<ItemMasterView> {
    protected get view(): ItemMasterView {
        return super.view as ItemMasterView
    }

    protected fetchData = async (
        fetchFunction: (pageToFetch: number, filterOptions: FilterOption[]) => Promise<{ data: any[], count: number }>,
        resetPage: boolean = false
    ): Promise<void> => {
        try {
            const pageToFetch = resetPage ? 1 : this.view.state.page;
            const result = await fetchFunction(pageToFetch, this.view.state.filterOptions);
            if (result && result.data && result.count) {
                this.view.dispatch({
                    type: ACTIONS.SET_DATA,
                    payload: resetPage ? result.data : [...this.view.state.data, ...result.data],
                });
                this.view.dispatch({
                    type: ACTIONS.SET_HAS_MORE,
                    payload: result.data.length === PAGE_NUMBER,
                });
            }
        } catch (error) {
            this.view.dispatch({
                type: ACTIONS.SET_ERROR,
                payload: 'Error fetching items from the database: ' + (error as Error).message,
            });
        }
    };
}
