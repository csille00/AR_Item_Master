import {getClient} from "../getClient.ts";
import {Option} from "../../Definitions/DropdownOption.ts";
import {Tables, TablesInsert, TablesUpdate} from "../../Definitions/generatedDefinitions.ts";

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

export async function getMetalTypeFromClient(): Promise<{
    id: number,
    mat_code: number,
    mat_color: number,
    description: string
}[] | undefined> {
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

export async function addMaterialType(item: TablesInsert<'material_type'>): Promise<void> {
    try {
        await client
            .from('material_type')
            .insert([item])
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function updateMaterialType(item: TablesUpdate<'material_type'>): Promise<void> {
    const {error} = await client
        .from('material_type')
        .update(item)
        .eq('id', item.id)
    if (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteMaterialType(item: Tables<'material_type'>): Promise<void> {
    try {
        await client
            .from('material_type')
            .delete()
            .eq('id', item.id);
    } catch (error) {
        console.log(error);
        throw error;
    }
}