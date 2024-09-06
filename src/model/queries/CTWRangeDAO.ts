import {getClient} from "../getClient.ts";
import {Tables, TablesInsert, TablesUpdate} from "../../Definitions/generatedDefinitions.ts";

const client = getClient()

export async function getCTWRangeFromClient(): Promise<{
    id: number,
    ctw: number,
    range: any
}[] | undefined> {
    const {data, error} = await client
        .from("ctw_range")
        .select('id,ctw,range');
    if (error) {
        throw error;
    }
    if (data) {
        return data
    }
}

export async function addCTWRange(item: TablesInsert<'ctw_range'>): Promise<void> {
    try {
        await client
            .from('ctw_range')
            .insert([item])
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function updateCTWRange(item: TablesUpdate<'ctw_range'>): Promise<void> {
    const {error} = await client
        .from('ctw_range')
        .update(item)
        .eq('id', item.id)
    if (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteCTWRange(item: Tables<'ctw_range'>): Promise<void> {
    try {
        await client
            .from('ctw_range')
            .delete()
            .eq('id', item.id);
    } catch (error) {
        console.log(error);
        throw error;
    }
}