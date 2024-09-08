import React, {useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {Tables} from "../Definitions/generatedDefinitions.ts";
import DetailedItemTable from "./DetailedItemTable.tsx";
import {editJewelryMasterRow, getJewelryDataBySKU} from "../model/queries/ArJewelryMasterDAO.ts";

// interface ProductDetailProps {
//     fetchData: (sku: string) =>
// }
const JewelryDetailsPage = () => {
    const { sku } = useParams();
    const location = useLocation();
    const stateItem = location.state || {};  // Fallback if state is undefined
    // Check if stateItem exists
    if (!stateItem) {
        return <p>No product details found.</p>;
    }

    return (
        <DetailedItemTable itemSku={sku as string} onEdit={(sku, key, value) => editJewelryMasterRow(sku, key, value)} fetchItem={(sku) => getJewelryDataBySKU(sku)}/>
    );
};

export default JewelryDetailsPage;