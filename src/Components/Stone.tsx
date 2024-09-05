import React, {useEffect, useState} from "react";
import Table from "../Components/Util/Table.tsx";
import {FilterOption} from "../Definitions/FilterOption.ts";
import {ArStoneMasterColumns, MapFormDataToStoneMasterColumns, StoneMasterColumnsMap} from "../Definitions/enum.ts";
import {ChangeViewModal} from "./Modal/ChangeViewModal.tsx";
import {FilterModal} from "./Modal/FilterModal.tsx";
import {getStoneDataAsCSV, getStoneMasterItemsFromClient, StoneMasterQuery} from "../model/queries/ArStoneMasterDAO.ts";
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


const Stone: React.FC = () => {
    const [isFilterModalOpen, setFilterModalOpen] = useState<boolean>(false);
    const [isColumnModalOpen, setColumnModalOpen] = useState<boolean>(false);
    const [stoneData, setStoneData] = useState<StoneMasterQuery>();
    const [filterOptions, setFilterOptions] = useState<FilterOption[]>([])
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const initialColumnState = [
        ArStoneMasterColumns.SKU,
        ArStoneMasterColumns.PRODUCT_NAME,
        ArStoneMasterColumns.MSRP,
        ArStoneMasterColumns.DATE,
    ]
    const [columns, setColumns] = useState<string[]>(initialColumnState);

    const fetchData = async (filters: FilterOption[] = []) => {
        console.log('fetchData: ', filters)
        setIsLoading(true);
        try {
            const data = await getStoneMasterItemsFromClient(filterOptions); // Pass filters to the fetch function
            if (data) {
                setStoneData(data);
            }
        } catch (error) {
            console.log(error)
            setError('Error fetching items from the database: ' + (error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData().then()
    }, []);

    return (
        <>
            <Table columns={columns}
                   data={stoneData}
                   title="Stone Master"
                   isLoading={isLoading}
                   error={error}
                   setColumnModalOpen={setColumnModalOpen}
                   setFilterModalOpen={setFilterModalOpen}
                   fetchDataAsCSV={getStoneDataAsCSV}
                   filename={"ar_stone_master.csv"}
            >
                {(item, columns) => <ItemMasterRow<Tables<'ar_stone_master'>, StoneMasterColumnsMap> item={item} columns={columns} map={MapFormDataToStoneMasterColumns}/>}
            </Table>
            <ChangeViewModal
                isOpen={isColumnModalOpen}
                onClose={() => setColumnModalOpen(false)}
                label="Column Filter"
                columns={columns}
                initialColumns={initialColumnState}
                allColumns={Object.values(ArStoneMasterColumns)}
                setColumns={setColumns}
            />
            <FilterModal
                isOpen={isFilterModalOpen}
                onClose={() => setFilterModalOpen(false)}
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
                setFilterOptions={setFilterOptions}
                filterOptions={filterOptions}
                onApplyFilters={fetchData}
            />
        </>
    );
}


export default Stone