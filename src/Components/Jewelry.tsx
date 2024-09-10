import React, {useState} from "react";
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

const Jewelry: React.FC = () => {
    const [isFilterModalOpen, setFilterModalOpen] = useState<boolean>(false);
    const [isColumnModalOpen, setColumnModalOpen] = useState<boolean>(false);
    const [filterOptions, setFilterOptions] = useState<FilterOption[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1)
    const [error, setError] = useState<string | null>(null);
    const initialColumnsState = [
        ArJewelryMasterColumns.SKU,
        ArJewelryMasterColumns.PRODUCT_NAME,
        ArJewelryMasterColumns.AR_STYLE,
        ArJewelryMasterColumns.MSRP,
        ArJewelryMasterColumns.DATE,
        ArJewelryMasterColumns.STATUS
    ]
    const [columns, setColumns] = useState<string[]>(initialColumnsState);

    const fetchData = async (page: number, filters: FilterOption[] = []): Promise<{ data: any, count: number }> => {
        // setIsLoading(true);
        try {
            const data = await getJewelryMasterPageFromClient(page, filterOptions); // Pass filters to the fetch function
            if (data.data && data.count) {
                return {data: data.data, count: data.count}
            }
        } catch (error) {
            setError('Error fetching items from the database: ' + (error as Error).message);
        } finally {
            // setIsLoading(false);
        }
    };

    // useEffect(() => {
    //     fetchData().then()
    // }, []);

    const transformSortColumn = (col: string): string => {
        return  MapFormDataToJewelryMasterColumns[col as keyof typeof MapFormDataToJewelryMasterColumns];
    }

    return (
        <>
            <Table columns={columns}
                   title="Jewelry Master"
                   isLoading={isLoading}
                   page={page}
                   setPage={setPage}
                   error={error}
                   fetchData={(page: number) => fetchData(page)}
                   getSortColumn={(column) => transformSortColumn(column)}
                   setColumnModalOpen={setColumnModalOpen}
                   setFilterModalOpen={setFilterModalOpen}
                   fetchDataAsCSV={getJewelryDataAsCSV}
                   filename={'ar_jewelry_master.csv'}
            >
                {(item, columns) => <ItemMasterRow<Tables<'ar_jewelry_master'>, JewelryMasterColumnsMap> item={item}
                                                                                                         columns={columns}
                                                                                                         map={MapFormDataToJewelryMasterColumns}/>}
            </Table>
            <ChangeViewModal
                isOpen={isColumnModalOpen}
                onClose={() => setColumnModalOpen(false)}
                label="Column Filter"
                columns={columns}
                rowGenerator={new DefaultJewelryViews()}
                allColumns={Object.values(ArJewelryMasterColumns)}
                setColumns={setColumns}
            />
            <FilterModal
                isOpen={isFilterModalOpen}
                onClose={() => setFilterModalOpen(false)}
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
                setFilterOptions={setFilterOptions}
                filterOptions={filterOptions}
                onApplyFilters={(filters) => fetchData(page, filters)}
            />
        </>
    );
}

export default Jewelry;
