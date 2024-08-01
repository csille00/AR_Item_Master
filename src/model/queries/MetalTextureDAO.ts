import {getClient} from "../getClient.ts";
import {Option} from "../../Definitions/DropdownOption.ts";

const client = getClient()

export async function getMetalTexturesFromClient(): Promise<Option[] | undefined> {
    const {data, error} = await client
        .from("metal_texture")
        .select('id,texture');
    if (error) {
        throw error;
    }
    if (data) {
        const result: Option[] = []
        data.forEach(item => result.push({id: item.id, description: item.texture}))
        return result
    }
}