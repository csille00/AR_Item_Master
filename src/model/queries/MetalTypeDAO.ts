import {getClient} from "../getClient.ts";
import {Option} from "../../Definitions/DropdownOption.ts";

const client = getClient()

export async function getMetalTypeOptionsFromClient(): Promise<Option[] | undefined> {
    const {data, error} = await client
        .from("material_type")
        .select('id,description');
    if (error) {
        throw error;
    }
    if (data) {
        const result: Option[] = []
        data.forEach(item => result.push({id: item.id, description: item.description}))
        return result
    }
}

export async function getMetalTypeFromClient(): Promise<{id: number, mat_code: number, mat_color: number, description: string}[] | undefined> {
    const {data, error} = await client
        .from("material_type")
        .select('id,description,mat_code,mat_color');
    if (error) {
        throw error;
    }
    if (data) {
        return data
    }
}