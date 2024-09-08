import React, {useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {Tables} from "../Definitions/generatedDefinitions.ts";
import DetailedItemTable from "./DetailedItemTable.tsx";
import {editJewelryMasterRow, getJewelryDataBySKU} from "../model/queries/ArJewelryMasterDAO.ts";
import {editStoneMasterRow, getStoneDataBySKU} from "../model/queries/ArStoneMasterDAO.ts";

// interface ProductDetailProps {
//     fetchData: (sku: string) =>
// }
const StoneDetailsPage = () => {
    const { sku } = useParams();
    const location = useLocation();
    const stateItem = location.state || {};  // Fallback if state is undefined
    // Check if stateItem exists
    if (!stateItem) {
        return <p>No product details found.</p>;
    }

    return (
        <DetailedItemTable itemSku={sku as string} onEdit={(sku, key, value) => editStoneMasterRow(sku, key, value)} fetchItem={(sku) => getStoneDataBySKU(sku)}/>
    );
};

export default StoneDetailsPage;