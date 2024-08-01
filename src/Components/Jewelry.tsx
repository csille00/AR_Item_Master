import React, {useEffect, useState} from "react";
import Table from "../Components/Util/Table.tsx";
import {Tables} from "../Definitions/definitions.ts";
import JewelryRow from "./Util/JewelryRow.tsx";
import {getJewelryMasterPageFromClient} from "../model/queries/ArJewelryMasterDAO.ts";

const Jewelry: React.FC = () => {
    const [jewelryData, setJewelryData] = useState<Tables<'ar_jewelry_master'>[]>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const data = await getJewelryMasterPageFromClient(1, 25)
                if(data){
                    setJewelryData(data)
                }
            } catch (error){
                setError('Error fetching items from the database: ' + (error as Error).message)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error || !jewelryData) {
        return <div>{error}</div>;
    }

    const ar_jewelry_columns = [
        "SKU",
        "Product Name",
        "AR Style",
        "MSRP",
        "Date Added",
        "Status"
    ]

    return (
        <>
            <Table columns={ar_jewelry_columns} data={jewelryData} title={"Jewelry Master"}>
                {(item: Tables<'ar_jewelry_master'>) => <JewelryRow {...item} />}
            </Table>
        </>
    )
}

export default Jewelry