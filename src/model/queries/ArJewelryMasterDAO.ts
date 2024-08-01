import {getClient} from "../getClient.ts";
import {Tables, TablesInsert} from "../../Definitions/definitions.ts";
import {Option} from "../../Definitions/DropdownOption.ts";

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

export async function getJewelryMasterPageFromClient(page: number, pageLength: number = 25): Promise<Tables<'ar_jewelry_master'>[] | undefined> {
    const start = (page - 1) * pageLength;
    const end = start + pageLength - 1;

    const { data, error } = await client
        .from("ar_jewelry_master")
        .select()
        .range(start, end);

    if (error) {
        throw error;
    }
    console.log(data)
    return data;
}