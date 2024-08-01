import React from "react";
import {Tables} from "../../Definitions/definitions.ts";

const JewelryRow = (item: Tables<'ar_jewelry_master'>): React.ReactNode => (
    <>
        <td className="p-4">{item.sku_number}</td>
        <td className="p-4">{item.prod_name}</td>
        <td className="p-4">{item.ar_style}</td>
        <td className="p-4">{item.msrp as string}</td>
        <td className="p-4">{item.date}</td>
        <td className="p-4">{item.status}</td>
    </>
);


export default JewelryRow;