import {getClient} from "../getClient.ts";
import { StoneMasterQuery} from "../../Definitions/definitions.ts";
import {FilterOption} from "../../Definitions/FilterOption.ts";
import {MapFormDataToJewelryMasterColumns} from "../../Definitions/enum.ts";
import {TablesInsert} from "../../Definitions/generatedDefinitions.ts";

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

export async function getStoneMasterItemsFromClient(
    filters: FilterOption[],
): Promise<StoneMasterQuery | undefined> {

    const query = client
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

    // Apply filters
    filters.forEach(filter => {
        const column= MapFormDataToJewelryMasterColumns[filter.column as keyof typeof MapFormDataToJewelryMasterColumns];
        if (column) {
            query.eq(column, filter.value);
        }
    });

    const {data, error} = await query

    if (error) {
        throw error;
    }
    return data as StoneMasterQuery;
}