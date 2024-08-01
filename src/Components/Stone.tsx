import React from "react";
import Table from "../Components/Util/Table.tsx";
import {StoneRow, StoneItem} from "./Util/StoneRow.tsx";


const Stone: React.FC = () => {
    const ar_stone_columns = [
        "SKU",
        "Stone Type",
        "Product Type",
        "Style Number",
        "Shape",
        "Cut",
        "Carat"
    ]

    const ar_stone_mock: StoneItem[] = [
        {
            "serialNo": 1,
            "skuNumber": "SKU001",
            "date": "2024-07-18",
            "styleNumber": "ST001",
            "stoneType": "Diamond",
            "productType": "Ring",
            "prodCode": "PR001",
            "matCode": "MC001",
            "matColor": "Gold",
            "msrp": 500,
            "cost": 250,
            "color": "Clear",
            "shape": "Round",
            "cut": "Brilliant",
            "dimensions": "4.5mm",
            "caratWeight": 0.5,
            "caratRange": "0.4-0.6",
            "certType": "GIA",
            "certNumber": "1234567890",
            "certCut": "Excellent",
            "certColor": "D",
            "certClarity": "VS1",
            "stoneNumber": "S001",
            "catStatus": "Available",
            "stoneSku": "STN001",
            "refinedShape": "Round"
        },
        {
            "serialNo": 2,
            "skuNumber": "SKU002",
            "date": "2024-07-17",
            "styleNumber": "ST002",
            "stoneType": "Emerald",
            "productType": "Necklace",
            "prodCode": "PR002",
            "matCode": "MC002",
            "matColor": "Silver",
            "msrp": 800,
            "cost": 400,
            "color": "Green",
            "shape": "Oval",
            "cut": "Faceted",
            "dimensions": "6.2x4.8mm",
            "caratWeight": 1.2,
            "caratRange": "1.0-1.5",
            "certType": "IGI",
            "certNumber": "0987654321",
            "certCut": "Very Good",
            "certColor": "F",
            "certClarity": "SI1",
            "stoneNumber": "S002",
            "catStatus": "Available",
            "stoneSku": "STN002",
            "refinedShape": "Oval"
        }
    ]

    return (
        <>
            <Table columns={ar_stone_columns} data={ar_stone_mock} title={"Stone Master"}>
                {(item: StoneItem) => <StoneRow {...item} />}
            </Table>
        </>
    )
}

export default Stone