import {getClient} from "../getClient.ts";
import {Option} from "../../Definitions/DropdownOption.ts";

const client = getClient()

export async function getStoneCutOptionFromClient(): Promise<Option[] | undefined> {
    const {data, error} = await client
        .from("st_cut")
        .select('id,cut');
    if (error) {
        throw error;
    }
    if (data) {
        const result: Option[] = []
        data.forEach(item => result.push({id: item.id, description: item.cut}))
        return result
    }
}


export async function getStoneCutFromClient(): Promise<{id: number, cut: string, st_table: string}[] | undefined> {
    const {data, error} = await client
        .from("st_cut")
        .select('cut, id, st_table');
    if (error) {
        throw error;
    }
    if (data) {
        return data
    }
}