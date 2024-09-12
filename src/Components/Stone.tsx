import React, {useReducer} from "react";
import Table from "../Components/Util/Table.tsx";
import {ArStoneMasterColumns, MapFormDataToStoneMasterColumns, StoneMasterColumnsMap} from "../Definitions/enum.ts";
import {ChangeViewModal} from "./Modal/ChangeViewModal.tsx";
import {FilterModal} from "./Modal/FilterModal.tsx";
import {getStoneDataAsCSV, getStoneMasterItemsFromClient} from "../model/queries/ArStoneMasterDAO.ts";
import {getStoneProductTypesFromClient} from "../model/queries/StoneProductTypeDAO.ts";
import {Error} from "./Util/Error.tsx";
import {ItemMasterRow} from "./Util/ItemMasterRow.tsx";
import {Tables} from "../Definitions/generatedDefinitions.ts";
import {getStSourceFromClient} from "../model/queries/StSourceDAO.ts";
import {getStoneTypesOptionsFromClient} from "../model/queries/StoneTypeDAO.ts";
import {getStoneColorFromClient} from "../model/queries/StoneColorDAO.ts";
import {getStoneShapeFromClient} from "../model/queries/StoneShapeDAO.ts";
import {getStoneCutOptionFromClient} from "../model/queries/StoneCutDAO.ts";
import {getStoneOrientationFromClient} from "../model/queries/StoneOrientationDAO.ts";
import {getCertTypesFromClient} from "../model/queries/STCertTypeDAO.ts";
import {getColorGradeFromClient} from "../model/queries/StColorGradeDAO.ts";
import {getCertClarityFromClient} from "../model/queries/StCertClarityDAO.ts";
import {DefaultStoneViews} from "../Definitions/DefaultStoneViews.ts";
import {ACTIONS, initialState, reducer} from "./Jewelry.tsx";


const Stone: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState, (initialState: typeof initialState) => initialState);

    const fetchData = async (resetPage: boolean = false): Promise<void> => {
        try {
            const pageToFetch = resetPage ? 1 : state.page
            const result = await getStoneMasterItemsFromClient(pageToFetch, state.filterOptions); // Pass filters to the fetch function
            if (result && result.data && result.count) {
                dispatch({
                    type: ACTIONS.SET_DATA,
                    payload: resetPage ? result.data : [...state.data, ...result.data],
                });
                dispatch({
                    type: ACTIONS.SET_HAS_MORE,
                    payload: result.data.length === 100,
                });
            }
        } catch (error) {
            dispatch({
                type: ACTIONS.SET_ERROR,
                payload: 'Error fetching items from the database: ' + (error as Error).message,
            });
        }
    }

    return (
        <>
            <Table
                state={state}
                dispatch={dispatch}
                fetchData={() => fetchData()}
                title="Stone Master"
                getSortColumn={(col) => MapFormDataToStoneMasterColumns[col as keyof typeof MapFormDataToStoneMasterColumns]}
                fetchDataAsCSV={getStoneDataAsCSV}
                filename={"ar_stone_master.csv"}
            >
                {(item, columns) => <ItemMasterRow<Tables<'ar_stone_master'>, StoneMasterColumnsMap> item={item}
                                                                                                     columns={columns}
                                                                                                     map={MapFormDataToStoneMasterColumns}/>}
            </Table>
            <ChangeViewModal
                isOpen={state.isColumnModalOpen}
                onClose={() => dispatch({type: ACTIONS.TOGGLE_COLUMN_MODAL, payload: false})}
                label="Column Filter"
                columns={state.columns}
                rowGenerator={new DefaultStoneViews()}
                allColumns={Object.values(ArStoneMasterColumns)}
                setColumns={(columns) => dispatch({type: ACTIONS.SET_COLUMNS, payload: columns})}
            />

            <FilterModal
                isOpen={state.isFilterModalOpen}
                onClose={() => dispatch({type: ACTIONS.TOGGLE_FILTER_MODAL, payload: false})}
                label={"Filter"}
                fetchFilters={{
                    'ST Product Type': getStoneProductTypesFromClient,
                    'ST Source': getStSourceFromClient,
                    'ST Type': getStoneTypesOptionsFromClient,
                    'ST Color': getStoneColorFromClient,
                    'ST Shape': getStoneShapeFromClient,
                    'ST Cut': getStoneCutOptionFromClient,
                    'ST Orientation': getStoneOrientationFromClient,
                    'ST Origin': getStoneCutOptionFromClient,
                    'ST Cert Type': getCertTypesFromClient,
                    'ST Color Grade': getColorGradeFromClient,
                    'ST Clarity Grade': getCertClarityFromClient
                }}
                setFilterOptions={(options) => dispatch({type: ACTIONS.SET_FILTER_OPTIONS, payload: options})}
                filterOptions={state.filterOptions}
                onApplyFilters={() => fetchData(true)}
            />
        </>
    );
}


export default Stone