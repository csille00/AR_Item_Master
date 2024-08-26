import React, {useEffect, useState} from "react";
import Table from "../Components/Util/Table.tsx";
import {FilterOption} from "../Definitions/FilterOption.ts";
import {ArStoneMasterColumns} from "../Definitions/enum.ts";
import {ChangeViewModal} from "./Modal/ChangeViewModal.tsx";
import {FilterModal} from "./Modal/FilterModal.tsx";
import {getStoneDataAsCSV, getStoneMasterItemsFromClient, StoneMasterQuery} from "../model/queries/ArStoneMasterDAO.ts";
import {StoneRow} from "./Util/StoneRow.tsx";
import {getStoneProductTypesFromClient} from "../model/queries/StoneProductTypeDAO.ts";
import {ArLoader} from "./Util/Loading.tsx";
import {Error} from "./Util/Error.tsx";
import {ItemMasterRow} from "./Util/ItemMasterRow.tsx";
import {Tables} from "../Definitions/generatedDefinitions.ts";


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
            setError('Error fetching items from the database: ' + (error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    // const handleClearFilters = () => {
    //     setFilterOptions([])
    // }

    useEffect(() => {
        fetchData().then()
    }, []);

    if (isLoading) {
        return <ArLoader/>;
    }

    if (error || !stoneData) {
        return <Error message={error ?? ""}/>
    }

    return (
        <>
            <Table columns={columns}
                   data={stoneData}
                   title="Stone Master"
                   setColumnModalOpen={setColumnModalOpen}
                   setFilterModalOpen={setFilterModalOpen}
                   fetchDataAsCSV={getStoneDataAsCSV}
                   filename={"ar_stone_master.csv"}
            >
                {(item, columns) => <ItemMasterRow<Tables<'ar_stone_master'>, ArStoneMasterColumns> item={item} columns={columns}/>}
            </Table>
            <ChangeViewModal
                isOpen={isColumnModalOpen}
                onClose={() => setColumnModalOpen(false)}
                columns={columns}
                initialColumns={initialColumnState}
                allColumns={Object.values(ArStoneMasterColumns)}
                setColumns={setColumns}
            />
            <FilterModal
                isOpen={isFilterModalOpen}
                onClose={() => setFilterModalOpen(false)}
                type={ArStoneMasterColumns.TYPE}
                fetchProductTypes={getStoneProductTypesFromClient}
                setFilterOptions={setFilterOptions}
                onApplyFilters={fetchData}
            />
        </>
    );
}


export default Stone