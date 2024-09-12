import React, {useMemo, useReducer} from "react";
import Table from "./Util/Table.tsx";
import {ArStoneMasterColumns, MapFormDataToStoneMasterColumns, StoneMasterColumnsMap} from "../../Definitions/enum.ts";
import {ChangeViewModal} from "./Modal/ChangeViewModal.tsx";
import {FilterModal} from "./Modal/FilterModal.tsx";
import {getStoneDataAsCSV} from "../../model/queries/ArStoneMasterDAO.ts";
import {getStoneProductTypesFromClient} from "../../model/queries/StoneProductTypeDAO.ts";
import {ItemMasterRow} from "./Util/ItemMasterRow.tsx";
import {Tables} from "../../Definitions/generatedDefinitions.ts";
import {getStSourceFromClient} from "../../model/queries/StSourceDAO.ts";
import {getStoneTypesOptionsFromClient} from "../../model/queries/StoneTypeDAO.ts";
import {getStoneColorFromClient} from "../../model/queries/StoneColorDAO.ts";
import {getStoneShapeFromClient} from "../../model/queries/StoneShapeDAO.ts";
import {getStoneCutOptionFromClient} from "../../model/queries/StoneCutDAO.ts";
import {getStoneOrientationFromClient} from "../../model/queries/StoneOrientationDAO.ts";
import {getCertTypesFromClient} from "../../model/queries/STCertTypeDAO.ts";
import {getColorGradeFromClient} from "../../model/queries/StColorGradeDAO.ts";
import {getCertClarityFromClient} from "../../model/queries/StCertClarityDAO.ts";
import {DefaultStoneViews} from "../../Definitions/DefaultStoneViews.ts";
import {ACTIONS, initialState, itemMasterReducer, ItemMasterView} from "../../presenter/ItemMasterPresenter.ts";
import {StonePresenter} from "../../presenter/StonePresenter.ts";

const Stone: React.FC = () => {
    const [state, dispatch] = useReducer(itemMasterReducer, initialState, (initialState: typeof initialState) => initialState);

    const listener: ItemMasterView = {
        state: state,
        dispatch: dispatch
    }

    const presenter = useMemo(() => new StonePresenter(listener), [listener]);

    return (
        <>
            <Table
                state={state}
                dispatch={dispatch}
                fetchData={() => presenter.fetchStoneData()}
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
                onApplyFilters={() => presenter.fetchStoneData(true)}
            />
        </>
    );
}


export default Stone