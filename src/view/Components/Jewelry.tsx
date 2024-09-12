import React, {useMemo, useReducer} from "react";
import Table from "./Util/Table.tsx";
import {ItemMasterRow} from "./Util/ItemMasterRow.tsx";
import {getJewelryDataAsCSV} from "../../model/queries/ArJewelryMasterDAO.ts";
import {
    ArJewelryMasterColumns,
    JewelryMasterColumnsMap,
    MapFormDataToJewelryMasterColumns
} from "../../Definitions/enum.ts";
import {getProductTypesFromClient} from "../../model/queries/ProductTypeDAO.ts";
import 'react-toastify/dist/ReactToastify.css';
import {ChangeViewModal} from "./Modal/ChangeViewModal.tsx";
import {FilterModal} from "./Modal/FilterModal.tsx";
import {Tables} from "../../Definitions/generatedDefinitions.ts";
import {getStoneTypesOptionsFromClient} from "../../model/queries/StoneTypeDAO.ts";
import {getStSourceFromClient} from "../../model/queries/StSourceDAO.ts";
import {getStoneColorFromClient} from "../../model/queries/StoneColorDAO.ts";
import {getStoneShapeFromClient} from "../../model/queries/StoneShapeDAO.ts";
import {getStoneCutOptionFromClient} from "../../model/queries/StoneCutDAO.ts";
import {getStoneOrientationFromClient} from "../../model/queries/StoneOrientationDAO.ts";
import {getStoneOriginFromClient} from "../../model/queries/StoneOriginDAO.ts";
import {getCertTypesFromClient} from "../../model/queries/STCertTypeDAO.ts";
import {getStCertCutFromClient} from "../../model/queries/STCertCutDAO.ts";
import {getColorGradeFromClient} from "../../model/queries/StColorGradeDAO.ts";
import {getCertClarityFromClient} from "../../model/queries/StCertClarityDAO.ts";
import {getStylesFromClient} from "../../model/queries/ArStyleDAO.ts";
import {getMetalTypeFromClient} from "../../model/queries/MetalTypeDAO.ts";
import {getMetalFinishesClient} from "../../model/queries/MetalFinishDAO.ts";
import {getMetalTexturesFromClient} from "../../model/queries/MetalTextureDAO.ts";
import {getBandStyleFromClient} from "../../model/queries/BandStyleDAO.ts";
import {getBandWidthFromClient} from "../../model/queries/BandWidthDAO.ts";
import {getSettingsFromClient} from "../../model/queries/JewelrySettingDAO.ts";
import {getSideStonesFromClient} from "../../model/queries/SideStonesDAO.ts";
import {getChainTypesFromClient} from "../../model/queries/ChainTypeDAO.ts";
import {getPendantTypeFromClient} from "../../model/queries/PendantTypeDAO.ts";
import {getEarringTypeFromClient} from "../../model/queries/EarringTypeDAO.ts";
import {getCharmTypeFromClient} from "../../model/queries/CharmTypeDAO.ts";
import {DefaultJewelryViews} from "../../Definitions/DefaultJewelryViews.ts";
import {ACTIONS, initialState, itemMasterReducer, ItemMasterView} from "../../presenter/ItemMasterPresenter.ts";
import {JewelryPresenter} from "../../presenter/JewelryPresenter.ts";

const Jewelry: React.FC = () => {
    const [state, dispatch] = useReducer(itemMasterReducer, initialState, (initialState: typeof initialState) => initialState);

    const listener: ItemMasterView = {
        state: state,
        dispatch: dispatch
    }

    const presenter = useMemo(() => new JewelryPresenter(listener), [listener]);

    return (
        <>
            <Table
                state={state}
                dispatch={dispatch}
                title="Jewelry Master"
                fetchData={() => presenter.fetchJewelryData()}
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
                onApplyFilters={() => presenter.fetchJewelryData(true)}
            />
        </>
    );
};

export default Jewelry;
