import {getClient} from "../getClient.ts";
import {Option} from "../../Definitions/DropdownOption.ts";

const client = getClient()

export async function getMetalTypesFromClient(): Promise<Option[] | undefined> {
    const {data, error} = await client
        .from("material_type")
        .select('id,metal_type');
    if (error) {
        throw error;
    }
    if (data) {
        const result: Option[] = []
        data.forEach(item => result.push({id: item.id, description: item.metal_type}))
        return result
    }
}