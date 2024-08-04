import {getClient} from "../getClient.ts";
import {Tables, TablesInsert} from "../../Definitions/definitions.ts";
import {FilterOption} from "../../Definitions/FilterOption.ts";
import {ArJewelryMasterColumns, MapFormDataToDatabaseColumns} from "../../Definitions/enum.ts";

const client = getClient()

export async function insertIntoJewelryMaster(dataToInsert: TablesInsert<'ar_jewelry_master'>) {
    console.log("Data to Insert:", dataToInsert);

    const { error } = await client
        .from("ar_jewelry_master")
        .insert([dataToInsert]);

    if (error) {
        throw error;
    }
}

export async function getJewelryMasterPageFromClient(page: number, filters: FilterOption[], pageLength: number = 100): Promise<Tables<'ar_jewelry_master'>[] | undefined> {
    console.log('in dao: ', filters)
    const start = (page - 1) * pageLength;
    const end = start + pageLength - 1;

    let query = client
        .from('ar_jewelry_master')
        .select()
        .range(start, end);

    filters.forEach(filter => {
        console.log('Filter option: ', filter.column)
        const column = MapFormDataToDatabaseColumns[filter.column as ArJewelryMasterColumns];
        if (column) {
            query = query.eq(column, filter.value);
        }
    });

    const { data, error } = await query;

    if (error) {
        throw error;
    }
    return data;
}