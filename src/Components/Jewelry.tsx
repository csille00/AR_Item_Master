import React, {useReducer} from "react";
import Table from "../Components/Util/Table.tsx";
import {ItemMasterRow} from "./Util/ItemMasterRow.tsx";
import {getJewelryDataAsCSV, getJewelryMasterPageFromClient} from "../model/queries/ArJewelryMasterDAO.ts";
import {
    ArJewelryMasterColumns,
    JewelryMasterColumnsMap,
    MapFormDataToJewelryMasterColumns
} from "../Definitions/enum.ts";
import {getProductTypesFromClient} from "../model/queries/ProductTypeDAO.ts";
import {FilterOption} from "../Definitions/FilterOption.ts";
import 'react-toastify/dist/ReactToastify.css';
import {Error} from "./Util/Error.tsx";
import {ChangeViewModal} from "./Modal/ChangeViewModal.tsx";
import {FilterModal} from "./Modal/FilterModal.tsx";
import {Tables} from "../Definitions/generatedDefinitions.ts";
import {getStoneTypesOptionsFromClient} from "../model/queries/StoneTypeDAO.ts";
import {getStSourceFromClient} from "../model/queries/StSourceDAO.ts";
import {getStoneColorFromClient} from "../model/queries/StoneColorDAO.ts";
import {getStoneShapeFromClient} from "../model/queries/StoneShapeDAO.ts";
import {getStoneCutOptionFromClient} from "../model/queries/StoneCutDAO.ts";
import {getStoneOrientationFromClient} from "../model/queries/StoneOrientationDAO.ts";
import {getStoneOriginFromClient} from "../model/queries/StoneOriginDAO.ts";
import {getCertTypesFromClient} from "../model/queries/STCertTypeDAO.ts";
import {getStCertCutFromClient} from "../model/queries/STCertCutDAO.ts";
import {getColorGradeFromClient} from "../model/queries/StColorGradeDAO.ts";
import {getCertClarityFromClient} from "../model/queries/StCertClarityDAO.ts";
import {getStylesFromClient} from "../model/queries/ArStyleDAO.ts";
import {getMetalTypeFromClient} from "../model/queries/MetalTypeDAO.ts";
import {getMetalFinishesClient} from "../model/queries/MetalFinishDAO.ts";
import {getMetalTexturesFromClient} from "../model/queries/MetalTextureDAO.ts";
import {getBandStyleFromClient} from "../model/queries/BandStyleDAO.ts";
import {getBandWidthFromClient} from "../model/queries/BandWidthDAO.ts";
import {getSettingsFromClient} from "../model/queries/JewelrySettingDAO.ts";
import {getSideStonesFromClient} from "../model/queries/SideStonesDAO.ts";
import {getChainTypesFromClient} from "../model/queries/ChainTypeDAO.ts";
import {getPendantTypeFromClient} from "../model/queries/PendantTypeDAO.ts";
import {getEarringTypeFromClient} from "../model/queries/EarringTypeDAO.ts";
import {getCharmTypeFromClient} from "../model/queries/CharmTypeDAO.ts";
import {DefaultJewelryViews} from "../Definitions/DefaultJewelryViews.ts";


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
export interface State {
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
export const initialState: State = {
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
export const reducer = (state: State, action: { type: ACTIONS; payload?: any }): State => {
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

// Main component
const Jewelry: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState, (initialState: typeof initialState) => initialState);

    const fetchData = async (resetPage: boolean = false): Promise<{ data: any, count: number } | void> => {
        try {
            const pageToFetch = resetPage ? 1 : state.page;
            const result = await getJewelryMasterPageFromClient(pageToFetch, state.filterOptions);
            if (result && result.data && result.count) {
                dispatch({
                    type: ACTIONS.SET_DATA,
                    payload: resetPage ? result.data : [...state.data, ...result.data],
                });
                dispatch({
                    type: ACTIONS.SET_HAS_MORE,
                    payload: result.data.length === 100,
                });
                return {data: result.data, count: result.count};
            }
        } catch (error) {
            dispatch({
                type: ACTIONS.SET_ERROR,
                payload: 'Error fetching items from the database: ' + (error as Error).message,
            });
        }
    };

    return (
        <>
            <Table
                state={state}
                dispatch={dispatch}
                title="Jewelry Master"
                fetchData={() => fetchData()}
                getSortColumn={(column) => MapFormDataToJewelryMasterColumns[column as keyof typeof MapFormDataToJewelryMasterColumns]}
                fetchDataAsCSV={getJewelryDataAsCSV}
                filename={'ar_jewelry_master.csv'}
            >
                {(item, columns) => <ItemMasterRow<Tables<'ar_jewelry_master'>, JewelryMasterColumnsMap> item={item}
                                                                                                         columns={columns}
                                                                                                         map={MapFormDataToJewelryMasterColumns}/>}
            </Table>
            <ChangeViewModal
                isOpen={state.isColumnModalOpen}
                onClose={() => dispatch({type: ACTIONS.TOGGLE_COLUMN_MODAL, payload: false})}
                label="Column Filter"
                columns={state.columns}
                rowGenerator={new DefaultJewelryViews()}
                allColumns={Object.values(ArJewelryMasterColumns)}
                setColumns={(columns) => dispatch({type: ACTIONS.SET_COLUMNS, payload: columns})}
            />
            <FilterModal
                isOpen={state.isFilterModalOpen}
                onClose={() => dispatch({type: ACTIONS.TOGGLE_FILTER_MODAL, payload: false})}
                label="Filter"
                fetchFilters={{
                    'Product Type': getProductTypesFromClient,
                    'ST Type': getStoneTypesOptionsFromClient,
                    'ST Source': getStSourceFromClient,
                    'ST Color': getStoneColorFromClient,
                    'ST Shape': getStoneShapeFromClient,
                    'ST Cut': getStoneCutOptionFromClient,
                    'ST Orientation': getStoneOrientationFromClient,
                    'ST Origin': getStoneOriginFromClient,
                    'ST Cert Type': getCertTypesFromClient,
                    'ST Cert Cut': getStCertCutFromClient,
                    'ST Color Grade': getColorGradeFromClient,
                    'ST Clarity Grade': getCertClarityFromClient,
                    'AR Style': getStylesFromClient,
                    'Material Type': getMetalTypeFromClient,
                    'Metal Finish': getMetalFinishesClient,
                    'Metal Texture': getMetalTexturesFromClient,
                    'Band Style': getBandStyleFromClient,
                    'Band Width': getBandWidthFromClient,
                    'Jewelry Setting': getSettingsFromClient,
                    'Side Stones': getSideStonesFromClient,
                    'Chain Type': getChainTypesFromClient,
                    'Pendant Type': getPendantTypeFromClient,
                    'Earring Type': getEarringTypeFromClient,
                    'Charm Type': getCharmTypeFromClient,
                }}
                setFilterOptions={(options) => dispatch({type: ACTIONS.SET_FILTER_OPTIONS, payload: options})}
                filterOptions={state.filterOptions}
                onApplyFilters={() => fetchData(true)}
            />
        </>
    );
};

export default Jewelry;
