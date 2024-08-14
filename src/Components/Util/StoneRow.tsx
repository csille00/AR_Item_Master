import React from "react";
import {Tables} from "../../Definitions/generatedDefinitions.ts";
import {
    ArStoneMasterColumns,
    MapFormDataToStoneMasterColumns
} from "../../Definitions/enum.ts";

const getNestedValue = (item: any, column: ArStoneMasterColumns) => {
    const value = item[MapFormDataToStoneMasterColumns[column]];
    if (typeof value === 'object' && value !== null) {
        const nestedPropertyMap: Map<string, string> = new Map<string, string>();
        nestedPropertyMap.set('st_cut', 'cut')
        nestedPropertyMap.set('st_type', 'st_type')

        const normalizedColumn = column.trim().toLowerCase().replace(/ /g, '_');
        const containsKey = nestedPropertyMap.has(normalizedColumn)///nestedPropertyMap[normalizedColumn as keyof typeof nestedPropertyMap];
        return containsKey ? value[nestedPropertyMap.get(normalizedColumn) ?? ""] : value['description'];
    }

    return value;
};


export const StoneRow = ({item, columns}: { item: Tables<'ar_stone_master'>, columns: string[] }): React.ReactNode => {
    return (
        <>
            {columns.map((column, index) => {
                const value = getNestedValue(item, column as ArStoneMasterColumns);
                return (
                    <td key={index} className="p-4">
                        {String(value)}
                    </td>
                );
            })}
        </>
    );
};
