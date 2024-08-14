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
const createStoneMasterQuery = () => {
    return client
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
            st_number,
            date,
            cat_status,
            st_sku,
            refined_status,
            quantity,
            date_quantity_added,
            st_product_type(description),
            st_type(st_type),
            st_source(description),
            st_color(description),
            st_shape(description),
            st_cut(cut),
            st_orientation(description),
            st_origin(description),
            st_cert_type(description),
            st_cert_cut(description),
            st_cert_color(description),
            st_cert_clarity(description)
        `);
}

export type StoneMasterQuery = QueryData<ReturnType<typeof createStoneMasterQuery>>;

export async function getStoneMasterItemsFromClient(
    filters: FilterOption[],
): Promise<StoneMasterQuery | undefined> {
    // Apply filters
    const stoneMasterQuery = createStoneMasterQuery()
    if(!filters.some(filter => filter.value == 'ALL')) {
        filters.forEach(filter => {
            const column = MapFormDataToStoneMasterColumns[filter.column as keyof typeof MapFormDataToStoneMasterColumns];
            if (column) {
                stoneMasterQuery.eq(column, filter.value);
            }
        });
    }

    const {data, error} = await stoneMasterQuery
    console.log('data in dao: ', data)

    if (error) {
        throw error;
    }
    return data as StoneMasterQuery;
}

export async function getStoneDataAsCSV(){
    const { data, error } = await client
        .from('ar_stone_master')
        .select()
        .csv()
    if(error){
        throw error
    }
    return data
}