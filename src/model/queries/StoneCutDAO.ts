import {getClient} from "../getClient.ts";
import {Option} from "../../Definitions/DropdownOption.ts";
import {Tables, TablesInsert, TablesUpdate} from "../../Definitions/generatedDefinitions.ts";

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

export async function addStCut(item: TablesInsert<'st_cut'>): Promise<void> {
    try {
        await client
            .from('st_cut')
            .insert([item])
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function updateStCut(item: TablesUpdate<'st_cut'>): Promise<void> {
    const {error} = await client
        .from('st_cut')
        .update(item)
        .eq('id', item.id)
    if (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteStCut(item: Tables<'st_cut'>): Promise<void> {
    try {
        await client
            .from('st_cut')
            .delete()
            .eq('id', item.id);
    } catch (error) {
        console.log(error);
        throw error;
    }
}