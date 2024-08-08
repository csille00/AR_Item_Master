import {getClient} from "../getClient.ts";
import {FilterOption} from "../../Definitions/FilterOption.ts";
import {MapFormDataToStoneMasterColumns} from "../../Definitions/enum.ts";
import {TablesInsert} from "../../Definitions/generatedDefinitions.ts";
import {QueryData} from "@supabase/supabase-js";

const client = getClient()

export async function insertIntoStoneMaster(dataToInsert: TablesInsert<'ar_stone_master'>) {
    console.log("Data to Insert:", dataToInsert);

    const {error} = await client
        .from("ar_stone_master")
        .insert([dataToInsert]);
    if (error) {
        throw error;
    }
}


const stoneMasterQuery = client
    .from('ar_stone_master')
    .select(`
            serial_number,
            sku_number,
            style_number,
            prod_name,
            msrp,
            cost,
            st_height,
            st_width,
            st_ctw,
            st_cost,
            st_cert_num,
            st_ctw_range,
            st_table,
            memo, 
            stone_number,
            date,
            cat_status,
            stone_sku,
            refined_status,
            quantity,
            stone_product_type(prod_code),
            stone_type(stone_type),
            st_source(source),
            stone_color(color),
            stone_shape(shape),
            stone_cut(cut),
            stone_orientation(orientation),
            stone_origin(origin),
            st_cert_type(cert_type),
            st_cert_cut(cut),
            st_color_grade(grade),
            st_clarity_grade(grade)
    `)

export type StoneMasterQuery = QueryData<typeof stoneMasterQuery>;


export async function getStoneMasterItemsFromClient(
    filters: FilterOption[],
): Promise<StoneMasterQuery | undefined> {

    // Apply filters
    filters.forEach(filter => {
        const column= MapFormDataToStoneMasterColumns[filter.column as keyof typeof MapFormDataToStoneMasterColumns];
        if (column) {
            stoneMasterQuery.eq(column, filter.value);
        }
    });

    const {data, error} = await stoneMasterQuery
    console.log('data in dao: ', data)

    if (error) {
        throw error;
    }
    return data as StoneMasterQuery;
}