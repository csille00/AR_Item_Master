import React from "react";
import {Tables} from "../../Definitions/generatedDefinitions.ts";
import {
    ArStoneMasterColumns,
    MapFormDataToStoneMasterColumns
} from "../../Definitions/enum.ts";

const getNestedValue = (item: any, column: ArStoneMasterColumns) => {
    const value = item[MapFormDataToStoneMasterColumns[column]];
    if (typeof value === 'object' && value !== null) {
        const nestedPropertyMap: Record<string, string> = {
            st_product_type: 'type',
            st_type: 'st_type',
            st_source: 'source',
            st_color: 'color',
            st_shape: 'shape',
            st_cut: 'cut',
            st_orientation: 'orientation',
            st_origin: 'origin',
            st_cert_type: 'cert_type',
            st_cert_cut: 'cut',
            st_cert_clarity: 'clarity'
        };

        const normalizedColumn = column.trim().toLowerCase().replace(/ /g, '_');
        const nestedKey = nestedPropertyMap[normalizedColumn as keyof typeof nestedPropertyMap];
        return nestedKey ? value[nestedKey] : JSON.stringify(value);
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

// export default StoneRow;