import React, {useEffect, useState} from "react";
import Table from "../Components/Util/Table.tsx";
import {StoneMasterQuery} from "../Definitions/definitions.ts";
import {FilterOption} from "../Definitions/FilterOption.ts";
import {ArStoneMasterColumns} from "../Definitions/enum.ts";
import JewelryRow from "./Util/JewelryRow.tsx";
import {ChangeViewModal} from "./Util/ChangeViewModal.tsx";
import {FilterModal} from "./Util/FilterModal.tsx";
import {getProductTypesFromClient} from "../model/queries/ProductTypeDAO.ts";
import {getStoneMasterItemsFromClient} from "../model/queries/ArStoneMasterDAO.ts";


const Stone: React.FC = () => {
    const [isFilterModalOpen, setFilterModalOpen] = useState<boolean>(false);
    const [isColumnModalOpen, setColumnModalOpen] = useState<boolean>(false);
    const [stoneDate, setStoneData] = useState<StoneMasterQuery>();
    const [filterOptions, setFilterOptions] = useState<FilterOption[]>([])
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [columns, setColumns] = useState<string[]>([
        ArStoneMasterColumns.SKU,
        ArStoneMasterColumns.PRODUCT_NAME,
        ArStoneMasterColumns.MSRP,
        ArStoneMasterColumns.DATE,
    ]);

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

    const handleClearFilters = () => {
        setFilterOptions([])
    }

    useEffect(() => {
        fetchData().then()
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error || !stoneDate) {
        return <div>{error}</div>;
    }

    return (
        <>
            <Table columns={columns} data={stoneDate} title="Jewelry Master" setColumnModalOpen={setColumnModalOpen} setFilterModalOpen={setFilterModalOpen}>
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
                clearFilterOptions={handleClearFilters}
            />
        </>
    );
}


export default Stone