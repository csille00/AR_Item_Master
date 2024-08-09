import React, {useEffect, useState} from "react";
import Table from "../Components/Util/Table.tsx";
import {FilterOption} from "../Definitions/FilterOption.ts";
import {ArStoneMasterColumns} from "../Definitions/enum.ts";
import {ChangeViewModal} from "./Util/ChangeViewModal.tsx";
import {FilterModal} from "./Util/FilterModal.tsx";
import {getStoneMasterItemsFromClient, StoneMasterQuery} from "../model/queries/ArStoneMasterDAO.ts";
import {StoneRow} from "./Util/StoneRow.tsx";
import {getStoneProductTypesFromClient} from "../model/queries/StoneProductTypeDAO.ts";


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
            <Table columns={columns} data={stoneDate} title="Stone Master" setColumnModalOpen={setColumnModalOpen} setFilterModalOpen={setFilterModalOpen}>
                {(item, columns) => <StoneRow item={item} columns={columns}/>}
            </Table>
            <ChangeViewModal
                isOpen={isColumnModalOpen}
                onClose={() => setColumnModalOpen(false)}
                columns={columns}
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
                clearFilterOptions={handleClearFilters}
            />
        </>
    );
}


export default Stone