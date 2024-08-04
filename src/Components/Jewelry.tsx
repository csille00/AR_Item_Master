import React, {useEffect, useState} from "react";
import Table from "../Components/Util/Table.tsx";
import {Tables} from "../Definitions/definitions.ts";
import JewelryRow from "./Util/JewelryRow.tsx";
import {getJewelryMasterPageFromClient} from "../model/queries/ArJewelryMasterDAO.ts";
import {ArJewelryMasterColumns} from "../Definitions/enum.ts";
import {ChangeViewModal} from "./Util/ChangeViewModal.tsx";
import {FilterModal} from "./Util/FilterModal.tsx";
import {getProductTypesFromClient} from "../model/queries/ProductTypeDAO.ts";
import {FilterOption} from "../Definitions/FilterOption.ts";

//TODO: implement the proper paging
const Jewelry: React.FC = () => {
    const [isFilterModalOpen, setFilterModalOpen] = useState<boolean>(false);
    const [isColumnModalOpen, setColumnModalOpen] = useState<boolean>(false);
    const [jewelryData, setJewelryData] = useState<Tables<'ar_jewelry_master'>[]>();
    const [filterOptions, setFilterOptions] = useState<FilterOption[]>([])
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [columns, setColumns] = useState<string[]>([
        ArJewelryMasterColumns.SKU,
        ArJewelryMasterColumns.PRODUCT_NAME,
        ArJewelryMasterColumns.AR_STYLE,
        ArJewelryMasterColumns.MSRP,
        ArJewelryMasterColumns.DATE_ADDED,
        ArJewelryMasterColumns.STATUS
    ]);

    const fetchData = async (filters: FilterOption[] = []) => {
        console.log('fetchData: ', filters)
        setIsLoading(true);
        try {
            const data = await getJewelryMasterPageFromClient(1, filterOptions); // Pass filters to the fetch function
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

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error || !jewelryData) {
        return <div>{error}</div>;
    }

    return (
        <>
            <Table columns={columns} data={jewelryData} title="Jewelry Master" setColumnModalOpen={setColumnModalOpen} setFilterModalOpen={setFilterModalOpen}>
                {(item, columns) => <JewelryRow item={item} columns={columns}/>}
            </Table>
            <ChangeViewModal
                isOpen={isColumnModalOpen}
                onClose={() => setColumnModalOpen(false)}
                columns={columns}
                setColumns={setColumns}
            />
            <FilterModal
                isOpen={isFilterModalOpen}
                onClose={() => setFilterModalOpen(false)}
                fetchProductTypes={getProductTypesFromClient}
                filterOptions={filterOptions}
                setFilterOptions={setFilterOptions}
                onApplyFilters={fetchData}
            />
        </>
    );
}

export default Jewelry