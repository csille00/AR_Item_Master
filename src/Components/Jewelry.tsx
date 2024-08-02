import React, {useEffect, useState} from "react";
import Table from "../Components/Util/Table.tsx";
import {Tables} from "../Definitions/definitions.ts";
import JewelryRow from "./Util/JewelryRow.tsx";
import {getJewelryMasterPageFromClient} from "../model/queries/ArJewelryMasterDAO.ts";
import {ArJewelryMasterColumns} from "../Definitions/enum.ts";
import {FilterModal} from "./Util/FilterModal.tsx";

//TODO: implement the proper paging
const Jewelry: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [jewelryData, setJewelryData] = useState<Tables<'ar_jewelry_master'>[]>();
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

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const data = await getJewelryMasterPageFromClient(1, 25)
                if (data) {
                    setJewelryData(data)
                }
            } catch (error) {
                setError('Error fetching items from the database: ' + (error as Error).message)
            } finally {
                setIsLoading(false)
            }
        }
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
            <Table columns={columns} data={jewelryData} title="Jewelry Master" setModalOpen={setModalOpen}>
                {(item, columns) => <JewelryRow item={item} columns={columns}/>}
            </Table>
            <FilterModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                columns={columns}
                setColumns={setColumns}
            />
        </>
    );
}

export default Jewelry