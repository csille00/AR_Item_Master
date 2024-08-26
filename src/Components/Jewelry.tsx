import React, {useEffect, useState} from "react";
import Table from "../Components/Util/Table.tsx";
import {ItemMasterRow} from "./Util/ItemMasterRow.tsx";
import {AdminTables, ArJewelryMasterColumns} from "../Definitions/enum.ts";
import {FilterOption} from "../Definitions/FilterOption.ts";
import 'react-toastify/dist/ReactToastify.css';
import {Error} from "./Util/Error.tsx";
import {ChangeViewModal} from "./Modal/ChangeViewModal.tsx";
import {FilterModal} from "./Modal/FilterModal.tsx";
import {Tables} from "../Definitions/generatedDefinitions.ts";
import {JewelryMasterQuery} from "../model/DAO/interface/ArJewelryMasterDAO.ts";
import {FactoryDAO} from "../model/DAO/interface/FactoryDAO.ts";
import {SupabaseFactoryDAO} from "../model/DAO/Supabase/SupabaseFactoryDAO.ts";

const Jewelry: React.FC = () => {
    const [isFilterModalOpen, setFilterModalOpen] = useState<boolean>(false);
    const [isColumnModalOpen, setColumnModalOpen] = useState<boolean>(false);
    const [jewelryData, setJewelryData] = useState<JewelryMasterQuery>();
    const [filterOptions, setFilterOptions] = useState<FilterOption[]>([]);
    const [isLoading, setIsLoading] = useState(true);
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
    const daoFactory: FactoryDAO = new SupabaseFactoryDAO()
    const jewelryMasterDAO = daoFactory.getArJewelryMasterDAO()
    const productTypesDAO = daoFactory.getProductTypesDAO()

    const fetchData = async (filters: FilterOption[] = []) => {
        console.log('fetchData: ', filters)
        setIsLoading(true);
        try {
            const data = await jewelryMasterDAO.getJewelryMasterPageFromClient(1, filterOptions); // Pass filters to the fetch function
            if (data) {
                setJewelryData(data);
            }
        } catch (error) {
            setError('Error fetching items from the database: ' + (error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData().then()
    }, []);

    // const handleClearFilters = () => {
    //     setFilterOptions([])
    //     fetchData([]).then()
    // }

    return (
        <>
            <Table columns={columns}
                   data={jewelryData}
                   title="Jewelry Master"
                   isLoading={isLoading}
                   error={error}
                   setColumnModalOpen={setColumnModalOpen}
                   setFilterModalOpen={setFilterModalOpen}
                   fetchDataAsCSV={jewelryMasterDAO.getJewelryDataAsCSV}
                   filename={'ar_jewelry_master.csv'}
            >
                {(item, columns) => <ItemMasterRow<Tables<'ar_jewelry_master'>, ArJewelryMasterColumns> item={item} columns={columns}/>}
            </Table>
            <ChangeViewModal
                isOpen={isColumnModalOpen}
                onClose={() => setColumnModalOpen(false)}
                label="Column Filter"
                columns={columns}
                initialColumns={initialColumnsState}
                allColumns={Object.values(ArJewelryMasterColumns)}
                setColumns={setColumns}
            />
            <FilterModal
                isOpen={isFilterModalOpen}
                onClose={() => setFilterModalOpen(false)}
                label="Filter"
                fetchProductTypes={() => productTypesDAO.getProductTypesFromClient(AdminTables.PRODUCT_TYPE)}
                type={ArJewelryMasterColumns.TYPE}
                setFilterOptions={setFilterOptions}
                onApplyFilters={fetchData}
            />
        </>
    );
}

export default Jewelry;
