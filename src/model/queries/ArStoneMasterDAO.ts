import {getClient} from "../getClient.ts";
import {FilterOption} from "../../Definitions/FilterOption.ts";
import {MapFormDataToStoneMasterColumns} from "../../Definitions/enum.ts";
import {TablesInsert, TablesUpdate} from "../../Definitions/generatedDefinitions.ts";
import {QueryData} from "@supabase/supabase-js";
import {PAGE_NUMBER} from "../../presenter/ItemMasterPresenter.ts";

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
            st_color_grade(description),
            st_clarity_grade!ar_stone_master_st_clarity_grade_fkey(description)
        `, {count: 'exact'});
}

export type StoneMasterQuery = QueryData<ReturnType<typeof createStoneMasterQuery>>;

export async function getStoneMasterItemsFromClient(
    page: number,
    filters: FilterOption[],
    sortColumn?: string,
    sortDirection?: 'asc' | 'desc',
    pageLength: number = PAGE_NUMBER
): Promise<{ data: any[], count: number }> {
    const start = (page - 1) * pageLength;
    const end = start + pageLength - 1;

    // Create query
    const stoneMasterQuery = createStoneMasterQuery()

    //Apply pagination
    stoneMasterQuery.range(start, end)

    // Apply filters
    filters.forEach(filter => {
        const column = MapFormDataToStoneMasterColumns[filter.column as keyof typeof MapFormDataToStoneMasterColumns];
        if (column && filter.value !== 'ALL') {
            stoneMasterQuery.eq(column, filter.value);
        }
    });

    // Apply sorting if sortColumn and sortDirection are provided
    if (sortColumn && sortDirection) {
        if (sortColumn) {
            stoneMasterQuery.order(sortColumn, { ascending: sortDirection === 'asc' });
        }
    }

    // Execute query
    const {data, error, count} = await stoneMasterQuery

    if (error) {
        throw error;
    }
    return {data: data as StoneMasterQuery, count: count};
}

export async function getStoneDataAsCSV() {
    const {data, error} = await client
        .from('ar_stone_master')
        .select()
        .csv()
    if (error) {
        throw error
    }
    return data
}

export async function getStoneDataBySKU(sku: string) {
    const {data, error} = await client
        .from('ar_stone_master')
        .select()
        .eq('sku_number', sku)
        .limit(1)
    if (error) {
        throw error
    }
    return data ? data[0] : null
}

export async function deleteStoneMasterRowBySKU(sku: string) {
    const {error} = await client
        .from('ar_stone_master')
        .delete()
        .eq('sku_number', sku)
    if (error) {
        throw error
    }
}

export async function editStoneMasterRow(sku: string, row: TablesUpdate<'ar_stone_master'>): Promise<void> {
    const {error} = await client
        .from('ar_stone_master')
        .update(row)
        .eq('sku_number', sku)

    if (error) {
        console.error("Error updating item: ", error)
    }
}
