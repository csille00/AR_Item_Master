import {getClient} from "../getClient.ts";
import {FilterOption} from "../../Definitions/FilterOption.ts";
import {MapFormDataToJewelryMasterColumns} from "../../Definitions/enum.ts";
import {TablesInsert} from "../../Definitions/generatedDefinitions.ts";
import {QueryData} from "@supabase/supabase-js";

const client = getClient()

export async function insertIntoJewelryMaster(dataToInsert: TablesInsert<'ar_jewelry_master'>) {
    const {error} = await client
        .from("ar_jewelry_master")
        .insert([dataToInsert]);

    if (error) {
        throw error;
    }
}

const createJewelryMasterQuery = () => {
    return client
        .from('ar_jewelry_master')
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
            st_ctw_range,
            st_table,
            age,
            gender,
            returnable,
            engravable,
            made_to_order,
            adjustable,
            repair_upgrade,
            configurator,
            multi_texture,
            multi_finish,
            bundle,
            status,
            date,
            id,
            variant_id,
            weight,
            material_type(description),
            product_type(description),
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
            st_cert_clarity(description),
            metal_finish(description),
            metal_texture(description),
            band_style(description),
            band_width(description),
            jewelry_setting(description),
            side_stones(description),
            length(description),
            chain_type(description),
            pendant_type(description),
            earring_type(description),
            charm_type(description),
            ar_style(description)
    `)
}

export type JewelryMasterQuery = QueryData<ReturnType<typeof createJewelryMasterQuery>>;

export async function getJewelryMasterPageFromClient(
    page: number,
    filters: FilterOption[],
    pageLength: number = 100
): Promise<JewelryMasterQuery | undefined> {
    const start = (page - 1) * pageLength;
    const end = start + pageLength - 1;

    const jewelryMasterQuery = createJewelryMasterQuery()

    jewelryMasterQuery.range(start, end)

    // Apply filters
    if(!filters.some(filter => filter.value == 'ALL')) {
        filters.forEach(filter => {
            const column = MapFormDataToJewelryMasterColumns[filter.column as keyof typeof MapFormDataToJewelryMasterColumns];
            if (column) {
                jewelryMasterQuery.eq(column, filter.value);
            }
        });
    }

    const {data, error} = await jewelryMasterQuery

    if (error) {
        throw error;
    }
    return data as JewelryMasterQuery;
}

export async function getJewelryDataAsCSV(){
    const { data, error } = await client
        .from('ar_jewelry_master')
        .select()
        .csv()
    if(error){
        throw error
    }
    return data
}

export async function getJewelryDataBySKU(sku: string){
    const { data, error } = await client
        .from('ar_jewelry_master')
        .select()
        .eq('sku_number', sku)
    if(error){
        throw error
    }
    return data
}

