import {ArJewelryMasterColumns, MapFormDataToJewelryMasterColumns} from "../../Definitions/enum.ts";
import React from "react";
import {Tables} from "../../Definitions/generatedDefinitions.ts";

const getNestedValue = (item: any, column: ArJewelryMasterColumns) => {
    const value = item[MapFormDataToJewelryMasterColumns[column]];

    if (typeof value === 'object' && value !== null) {
        const nestedPropertyMap: Record<string, string> = {
            material_type: 'metal_type',
            product_type: 'product_type',
            st_type: 'st_type',
            st_source: 'source',
            stone_color: 'stone_color',
            stone_shape: 'stone_shape',
            stone_cut: 'cut',
            stone_orientation: 'orientation',
            stone_origin: 'origin',
            st_cert_type: 'cert_type',
            st_cert_cut: 'cut',
            metal_finish: 'finish',
            metal_texture: 'texture',
            band_style: 'style',
            band_width: 'width',
            jewelry_setting: 'setting',
            side_stones: 'stone',
            ar_style: 'style',
            length: 'length',
            chain_type: 'type',
            pendant_type: 'type',
            earring_type: 'type',
            charm_type: 'type',
        };

        const normalizedColumn = column.trim().toLowerCase().replace(/ /g, '_');
        const nestedKey = nestedPropertyMap[normalizedColumn as keyof typeof nestedPropertyMap];
        return nestedKey ? value[nestedKey] : JSON.stringify(value);
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