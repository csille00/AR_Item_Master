import {ArJewelryMasterColumns, MapFormDataToJewelryMasterColumns} from "../../Definitions/enum.ts";
import React from "react";
import {Tables} from "../../Definitions/generatedDefinitions.ts";

const getNestedValue = (item: any, column: ArJewelryMasterColumns) => {
    const value = item[MapFormDataToJewelryMasterColumns[column]];

    if (typeof value === 'object' && value !== null) {
        const nestedPropertyMap: Map<string, string> = new Map<string, string>();
        nestedPropertyMap.set('st_cut', 'cut')
        nestedPropertyMap.set('st_type', 'st_type')
        nestedPropertyMap.set('material_type', 'metal_type')
        nestedPropertyMap.set('product_type', 'product_type')

        const normalizedColumn = column.trim().toLowerCase().replace(/ /g, '_');
        const containsKey = nestedPropertyMap.has(normalizedColumn)///nestedPropertyMap[normalizedColumn as keyof typeof nestedPropertyMap];
        return containsKey ? value[nestedPropertyMap.get(normalizedColumn) ?? ""] : value['description'];
    }

    return value;
};

const JewelryRow = ({item, columns}: { item: Tables<'ar_jewelry_master'>, columns: string[] }): React.ReactNode => {
    return (
        <>
            {columns.map((column, index) => {
                const value = getNestedValue(item, column as ArJewelryMasterColumns);
                return (
                    <td key={index} className="p-4">
                        {String(value)}
                    </td>
                );
            })}
        </>
    );
};

export default JewelryRow;