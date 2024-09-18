import React, {useEffect} from "react";
import {ACTIONS} from "../../presenter/ItemMasterPresenter.ts";

export const useDebounceSearch = (search: string, currentSearch: string, dispatch: React.Dispatch<any>) => {
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (search !== currentSearch) {
                dispatch({ type: ACTIONS.SET_SEARCH, payload: search });
            }
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [search, currentSearch, dispatch]);
};