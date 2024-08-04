import {ArJewelryMasterColumns, MapFormDataToDatabaseColumns} from "../../Definitions/enum.ts";
import {Tables} from "../../Definitions/definitions.ts";
import React from "react";

const getNestedValue = (item: any, column: ArJewelryMasterColumns) => {
    const value = item[MapFormDataToDatabaseColumns[column]];

    if (typeof value === 'object' && value !== null) {
        const nestedPropertyMap: Record<string, string> = {
            material_type: 'metal_type',
            product_type: 'product_type',
            st_cert_type: 'cert_type',
            metal_finish: 'finish',
            metal_texture: 'texture',
            band_style: 'style',
            band_width: 'width',
            jewelry_setting: 'setting',
            side_stones: 'stone',
            ar_style: 'style',
        };

        const nestedKey = nestedPropertyMap[column as keyof typeof nestedPropertyMap];
        return nestedKey ? value[nestedKey] : JSON.stringify(value);
    }

    return value;
};

const JewelryRow = ({ item, columns }: { item: Tables<'ar_jewelry_master'>, columns: string[] }): React.ReactNode => {
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