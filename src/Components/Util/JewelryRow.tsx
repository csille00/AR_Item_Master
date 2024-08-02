import React from "react";
import {Tables} from "../../Definitions/definitions.ts";
import {ArJewelryMasterColumns, MapFormDataToDatabaseColumns} from "../../Definitions/enum.ts";

const JewelryRow = ({ item, columns }: { item: Tables<'ar_jewelry_master'>, columns: string[] }): React.ReactNode => {
    return (
        <>
            {columns.map((column, index) => {
                const value = item[MapFormDataToDatabaseColumns[column as ArJewelryMasterColumns]] as string | number | boolean | null;
                return (
                    <td key={index} className="p-4">
                        {String(value)}
                    </td>
                );
            })}
        </>
    )
};

export default JewelryRow;