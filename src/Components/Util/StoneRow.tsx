import React from "react";

export interface StoneItem {
    serialNo: number | null;
    skuNumber: string | null;
    date: string | null;
    styleNumber: string | null;
    stoneType: string | null;
    productType: string | null;
    prodCode: string | null;
    matCode: string | null;
    matColor: string | null;
    msrp: number | null;
    cost: number | null;
    color: string | null;
    shape: string | null;
    cut: string | null;
    dimensions: string | null;
    caratWeight: number | null;
    caratRange: string | null;
    certType: string | null;
    certNumber: string | null;
    certCut: string | null;
    certColor: string | null;
    certClarity: string | null;
    stoneNumber: string | null;
    catStatus: string | null;
    stoneSku: string | null;
    refinedShape: string | null;
}

export const StoneRow = (item: StoneItem): React.ReactNode => (
    <>
        <td className="p-4">{item.skuNumber}</td>
        <td className="p-4">{item.stoneType}</td>
        <td className="p-4">{item.productType}</td>
        <td className="p-4">{item.styleNumber}</td>
        <td className="p-4">{item.shape}</td>
        <td className="p-4">{item.cut}</td>
        <td className="p-4">{item.caratWeight}</td>
    </>
);


// export default StoneRow;