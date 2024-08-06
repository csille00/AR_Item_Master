import React from "react";
import {Tables} from "../../Definitions/generatedDefinitions.ts";

export const StoneRow = (item: Tables<'ar_stone_master'>): React.ReactNode => (
    <>
        <td className="p-4">{item.sku_number}</td>
        <td className="p-4">{item.prod_name}</td>
        <td className="p-4">{item.msrp as number}</td>
        <td className="p-4">{item.memo}</td>
        <td className="p-4">{item.prod_code}</td>
        <td className="p-4">{item.quantity}</td>
        <td className="p-4">{item.date}</td>
    </>
);


// export default StoneRow;