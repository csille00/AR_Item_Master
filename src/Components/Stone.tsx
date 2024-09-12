import React, {useState} from "react";
import Table from "../Components/Util/Table.tsx";
import {FilterOption} from "../Definitions/FilterOption.ts";
import {ArStoneMasterColumns, MapFormDataToStoneMasterColumns, StoneMasterColumnsMap} from "../Definitions/enum.ts";
import {ChangeViewModal} from "./Modal/ChangeViewModal.tsx";
import {FilterModal} from "./Modal/FilterModal.tsx";
import {getStoneDataAsCSV, getStoneMasterItemsFromClient} from "../model/queries/ArStoneMasterDAO.ts";
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
import {DefaultStoneViews} from "../Definitions/DefaultStoneViews.ts";


const Stone: React.FC = () => {
    const [isFilterModalOpen, setFilterModalOpen] = useState<boolean>(false);
    const [isColumnModalOpen, setColumnModalOpen] = useState<boolean>(false);
    const [filterOptions, setFilterOptions] = useState<FilterOption[]>([])
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<any[]>([])
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(1)
    const [error, setError] = useState<string | null>(null);
    const [columns, setColumns] = useState<string[]>([]);

    const fetchData = async (resetPage: boolean = false): Promise<{ data: any, count: number }> => {
        try {
            const pageToFetch = resetPage ? 1 : page
            const result = await getStoneMasterItemsFromClient(pageToFetch, filterOptions); // Pass filters to the fetch function
            if (result.data && result.count) {
                if (resetPage) {
                    setData(result.data)
                } else {
                    setData(prevData => [...prevData, ...result.data])
                }
                if (result.data.length !== 100) setHasMore(false)
                else {
                    setHasMore(true)
                }
                return {data: result.data, count: result.count}
            }
        } catch (error) {
            console.log(error)
            setError('Error fetching items from the database: ' + (error as Error).message);
        }
    };

    return (
        <>
            <Table columns={columns}
                   fetchData={() => fetchData()}
                   data={data}
                   title="Stone Master"
                   isLoading={isLoading}
                   hasMore={hasMore}
                   error={error}
                   page={page}
                   setPage={setPage}
                   getSortColumn={(col) => MapFormDataToStoneMasterColumns[col as keyof typeof MapFormDataToStoneMasterColumns]}
                   setColumnModalOpen={setColumnModalOpen}
                   setFilterModalOpen={setFilterModalOpen}
                   fetchDataAsCSV={getStoneDataAsCSV}
                   filename={"ar_stone_master.csv"}
            >
                {(item, columns) => <ItemMasterRow<Tables<'ar_stone_master'>, StoneMasterColumnsMap> item={item}
                                                                                                     columns={columns}
                                                                                                     map={MapFormDataToStoneMasterColumns}/>}
            </Table>
            <ChangeViewModal
                isOpen={isColumnModalOpen}
                onClose={() => setColumnModalOpen(false)}
                label="Column Filter"
                rowGenerator={new DefaultStoneViews()}
                columns={columns}
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
                onApplyFilters={() => fetchData(true)}
            />
        </>
    );
}


export default Stone