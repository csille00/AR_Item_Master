import {getClient} from "../getClient.ts";
import {FilterOption} from "../../Definitions/FilterOption.ts";
import {MapFormDataToJewelryMasterColumns} from "../../Definitions/enum.ts";
import {Tables, TablesInsert, TablesUpdate} from "../../Definitions/generatedDefinitions.ts";
import {QueryData} from "@supabase/supabase-js";
import {PAGE_NUMBER} from "../../presenter/ItemMasterPresenter.ts";

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
            st_cert_number,
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
            st_color_grade!fk_st_color_grade(description),
            st_clarity_grade(description),
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
    `, {count: 'exact'})
}

export type JewelryMasterQuery = QueryData<ReturnType<typeof createJewelryMasterQuery>>;

export async function getJewelryMasterPageFromClient(
    page: number,
    filters: FilterOption[],
    searchString?: string,
    sortColumn?: string,
    sortDirection?: 'asc' | 'desc',
    pageLength: number = PAGE_NUMBER
) {
    let start = (page - 1) * pageLength;
    let end = start + pageLength - 1;

    // Create query
    const jewelryMasterQuery = createJewelryMasterQuery();

    // Apply pagination
    jewelryMasterQuery.range(start, end);

    // Apply filters
    filters.forEach(filter => {
        const column = MapFormDataToJewelryMasterColumns[filter.column as keyof typeof MapFormDataToJewelryMasterColumns];
        if (column && filter.value !== 'ALL') {
            jewelryMasterQuery.eq(column, filter.value);
        }
    });

    // Apply search by `prod_name` or `sku_number` if `searchString` is provided
    if (searchString) {
        jewelryMasterQuery.or(`prod_name.ilike.%${searchString}%,sku_number.ilike.%${searchString}%`);
    }

    // Apply sorting if sortColumn and sortDirection are provided
    if (sortColumn && sortDirection) {
        if (sortColumn) {
            jewelryMasterQuery.order(sortColumn, { ascending: sortDirection === 'asc' });
        }
    }

    // Execute query
    const { data, error, count } = await jewelryMasterQuery;
    console.log('data in dao: ', data)
    if (error) {
        throw error;
    }
    return { data: data as JewelryMasterQuery, count: count };
}

export async function getJewelryDataAsCSV() {
    const {data, error} = await client
        .from('ar_jewelry_master')
        .select()
        .csv()
    if (error) {
        throw error
    }
    return data
}

export async function getJewelryDataBySKU(sku: string): Promise<Tables<'ar_jewelry_master'> | null> {
    const {data, error} = await client
        .from('ar_jewelry_master')
        .select()
        .eq('sku_number', sku)
        .limit(1)
    if (error) {
        throw error
    }
    return data ? data[0] : null
}

export async function editJewelryMasterRow(sku: string, row: TablesUpdate<'ar_jewelry_master'>): Promise<void> {
    const {error} = await client
        .from('ar_jewelry_master')
        .update(row)
        .eq('sku_number', sku)

    if (error) {
        console.error("Error updating item: ", error)
    }
}