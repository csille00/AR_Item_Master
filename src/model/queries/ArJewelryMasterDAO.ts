import {getClient} from "../getClient.ts";
import {TablesInsert} from "../../Definitions/definitions.ts";

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