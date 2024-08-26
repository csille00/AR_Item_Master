import React, {useEffect, useState} from "react";
import Table from "../Components/Util/Table.tsx";
import {FilterOption} from "../Definitions/FilterOption.ts";
import {AdminTables, ArStoneMasterColumns} from "../Definitions/enum.ts";
import {ChangeViewModal} from "./Modal/ChangeViewModal.tsx";
import {FilterModal} from "./Modal/FilterModal.tsx";
import {Error} from "./Util/Error.tsx";
import {ItemMasterRow} from "./Util/ItemMasterRow.tsx";
import {Tables} from "../Definitions/generatedDefinitions.ts";
import {StoneMasterQuery} from "../model/DAO/interface/ArStoneMasterDAO.ts";
import {FactoryDAO} from "../model/DAO/interface/FactoryDAO.ts";
import {SupabaseFactoryDAO} from "../model/DAO/Supabase/SupabaseFactoryDAO.ts";


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
    const daoFactory: FactoryDAO = new SupabaseFactoryDAO()
    const stoneMasterDAO = daoFactory.getArStoneMasterDAO()
    const productTypesDAO = daoFactory.getProductTypesDAO()

    const fetchData = async (filters: FilterOption[] = []) => {
        console.log('fetchData: ', filters)
        setIsLoading(true);
        try {
            const data = await stoneMasterDAO.getStoneMasterItemsFromClient(filterOptions); // Pass filters to the fetch function
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

    // const handleClearFilters = () => {
    //     setFilterOptions([])
    // }

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
                   fetchDataAsCSV={stoneMasterDAO.getStoneDataAsCSV}
                   filename={"ar_stone_master.csv"}
            >
                {(item, columns) => <ItemMasterRow<Tables<'ar_stone_master'>, ArStoneMasterColumns> item={item} columns={columns}/>}
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
                type={ArStoneMasterColumns.TYPE}
                fetchProductTypes={() => productTypesDAO.getProductTypesFromClient(AdminTables.ST_PRODUCT_TYPE)}
                setFilterOptions={setFilterOptions}
                onApplyFilters={fetchData}
            />
        </>
    );
}


export default Stone