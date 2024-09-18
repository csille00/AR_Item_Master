import React from "react";

export interface ItemMasterRowProps<T, U> {
    item: T
    columns: string[]
    map: U
}

function getNestedValue<U>(item: any, column: U, map) {
    const mappedColumn = (map as any)[column as keyof U];
    const value = item[mappedColumn ?? ''];

    if (typeof value === 'object' && value !== null) {
        const nestedPropertyMap: Map<string, string> = new Map<string, string>();
        nestedPropertyMap.set('st_cut', 'cut')
        nestedPropertyMap.set('st_type', 'st_type')

        const normalizedColumn = column.trim().toLowerCase().replace(/ /g, '_');
        const containsKey = nestedPropertyMap.has(normalizedColumn)///nestedPropertyMap[normalizedColumn as keyof typeof nestedPropertyMap];
        return containsKey ? value[nestedPropertyMap.get(normalizedColumn) ?? ""] : value['description'];
    }

    return value;
}

export function ItemMasterRow<T, U>(props: ItemMasterRowProps<T, U>): React.ReactNode {
    return (
        <>
            {props.columns.map((column, index) => {
                const value = getNestedValue<U>(props.item, column as U, props.map);
                return (
                    <td key={index} className="p-4">
                        {String(value)}
                    </td>
                );
            })}
        </>
    );
}