import React, {ReducerAction, useEffect, useMemo, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Button from "./Button.tsx";
import filterIcon from "../../../assets/filter.svg"
import downloadIcon from "../../../assets/download.svg"
import tableIcon from "../../../assets/table.svg"
import addIcon from "../../../assets/addWhite.svg";
import {Error} from "./Error.tsx";
import {ArLoader} from "./Loading.tsx";
import {ACTIONS, ItemMasterState} from "../../../presenter/ItemMasterPresenter.ts";
import {TablePresenter, TableView} from "../../../presenter/TablePresenter.ts";
import {useDebounceSearch} from "../../hooks/useDebounceSearch.tsx";
import {useScrollHandler} from "../../hooks/useScrollHandler.tsx";
import {data} from "autoprefixer";

export interface TableProps {
    state: ItemMasterState,
    dispatch: (value: ReducerAction<(state: ItemMasterState, action: {
        type: ACTIONS,
        payload?: any
    }) => ItemMasterState>) => void
    title: string;
    fetchData: (searchString: string, sortChange: boolean, resetPage: boolean) => Promise<void>
    style?: string | null;
    getSortColumn: (column: string) => string
    fetchDataAsCSV?: () => Promise<string>;
    children?: (item: any, columns: string[]) => React.JSX.Element;
    filename?: string
}

const Table = ({
                   state,
                   dispatch,
                   title,
                   fetchData,
                   style,
                   getSortColumn,
                   fetchDataAsCSV,
                   children,
                   filename
               }: TableProps) => {
    const navigate = useNavigate();
    const pathVar = title.includes('Jewelry') ? "jewelry" : "stone";
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [search, setSearch] = useState(state.search || '');  // Initialize with state.search

    const listener: TableView = {
        state: state,
        dispatch: dispatch,
        fetchData: fetchData,
        getSortColumn: getSortColumn,
        fetchDataAsCSV: fetchDataAsCSV
    };

    const presenter = useMemo(() => new TablePresenter(listener), [listener]);

    useDebounceSearch(search, state.search, dispatch);
    useScrollHandler(containerRef, presenter, data);

    useEffect(() => {
            presenter.getMoreData(state.search, true, true);
    }, [state.sortColumn, state.sortDirection]);

    useEffect(() => {
        if (!state.internalPageReset) {
            presenter.getMoreData(state.search);
        }
        // Reset the flag after the effect runs
        dispatch({type: ACTIONS.SET_INTERNAL_PAGE_RESET, payload: false});
    }, [state.page]);

    useEffect(() => {
        presenter.getMoreData(state.search, true, false);
    }, [state.search]);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = 0;  // Scroll to the top of the container when state.sortDirection changes
        }
    }, [state.sortDirection]);

    if (state.error) {
        return <Error message={state.error} />;
    }

    if (state.isLoading) {
        return <ArLoader />;
    }

    return (
        <>
            <div className="mt-5 mx-4 flex justify-end">
                <form
                    className="flex items-center border border-lightgr rounded-lg bg-superlightgr px-5 h-12 w-fit"
                    onSubmit={(e) => { e.preventDefault(); dispatch({ type: ACTIONS.SET_SEARCH, payload: search }); }}
                >
                    <input
                        type="text"
                        placeholder="Search by name or SKU"
                        className="text-lightgr bg-superlightgr outline-none flex-grow text-right"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </form>
            </div>
            <div className={`mx-4 border border-lightgr rounded-lg mt-10 bg-white ${style ? style : ''}`}>
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-end">
                        <h1 className="text-argray text-4xl">{title}</h1>
                        <p className="text-lightgr ml-4 text-xl">{state.data.length}</p>
                    </div>
                    <div className="flex justify-end items-center">
                        <Button
                            icon={addIcon as SVGElement}
                            style="bg-argold hover:font-bold hover:bg-darkgold hover:border-darkgold rounded-lg h-12 mx-1.5 flex items-center"
                            onClick={() => navigate('/addJewelry')}
                        />
                        <Button
                            icon={filterIcon as SVGElement}
                            text="Filter"
                            onClick={() => dispatch({ type: ACTIONS.TOGGLE_FILTER_MODAL })}
                            style="text-argray bg-white hover:text-argray hover:bg-superlightgr hover:border-superlightgr border border-argray rounded-lg text-sm px-3 w-auto h-12 mx-1.5 flex items-center"
                        />
                        <Button
                            icon={tableIcon as SVGElement}
                            text="Change View"
                            onClick={() => dispatch({ type: ACTIONS.TOGGLE_COLUMN_MODAL })}
                            style="text-argray bg-white hover:text-argray hover:bg-superlightgr hover:border-superlightgr border border-argray rounded-lg text-sm px-3 w-auto h-12 mx-1.5 flex items-center"
                        />
                        <Button
                            icon={downloadIcon as SVGElement}
                            text="Download"
                            onClick={() => presenter.download(filename)}
                            style="text-argray bg-white hover:text-argray hover:bg-superlightgr hover:border-superlightgr border border-argray rounded-lg text-sm px-3 w-auto h-12 mx-1.5 flex items-center"
                        />
                    </div>
                </div>
                <div ref={containerRef} className="flex justify-start pb-6 px-4 overflow-y-scroll h-auto" style={{ maxHeight: 'calc(100vh - 208px)'}}>
                    <table className="w-full text-left text-argray">
                        <thead className="sticky top-0 bg-white">
                        <tr>
                            {state.columns.map((column, index) => (
                                <th key={index} className="p-4 cursor-pointer hover:underline" onClick={() => presenter.handleSort(column, state.sortColumn)}>
                                    {state.sortColumn === getSortColumn(column) ? (
                                        <div className="flex items-center">
                                            {column}
                                            {state.sortDirection === 'asc' ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 pl-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 pl-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                                                </svg>
                                            )}
                                        </div>
                                    ) : (
                                        <>{column}</>
                                    )}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {state.data.map((item: any, index: React.Key | null | undefined) => (
                            <tr key={index}>
                                {children ? children(item, state.columns) : null}
                                <td>
                                    <Link to={`/productDetails/${pathVar}/${item.sku_number}`} state={{ item }} className="text-argold hover:text-argold hover:font-bold">
                                        View/Edit
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Table;