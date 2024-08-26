import {TablesInsert} from "../../../Definitions/generatedDefinitions.ts";
import {FilterOption} from "../../../Definitions/FilterOption.ts";
import useClient from "../../../hooks/useClient.tsx";
import {QueryData} from "@supabase/supabase-js";

export const createStoneMasterQuery = () => {
    return useClient()
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
            st_color_grade(description)
        `);
}

export type StoneMasterQuery = QueryData<ReturnType<typeof createStoneMasterQuery>>;


export interface ArStoneMasterDAO {
    insertIntoStoneMaster(dataToInsert: TablesInsert<'ar_stone_master'>)
    getStoneMasterItemsFromClient(filters: FilterOption[]): Promise<StoneMasterQuery | undefined>
    getStoneDataAsCSV(): Promise<string | null>
}