import {getClient} from "../getClient.ts";
import {Option} from "../../Definitions/DropdownOption.ts";
import {Tables, TablesInsert, TablesUpdate} from "../../Definitions/generatedDefinitions.ts";

const client = getClient()

export async function getStoneTypesOptionsFromClient(): Promise<Option[] | undefined> {
    const {data, error} = await client
        .from("st_type")
        .select('id, st_type');
    if (error) {
        throw error;
    }
    if (data) {
        const result: Option[] = []
        data.forEach(item => result.push({id: item.id, description: item.st_type}))
        return result
    }
}

export async function getStoneTypesFromClient(): Promise<{
    id: number
    st_type: string,
    mat_code: string,
    mat_color: string,
    mat_color_name: string
}[] | undefined> {
    const {data, error} = await client
        .from("st_type")
        .select('id, st_type, mat_code, mat_color, mat_color_name');
    if (error) {
        throw error;
    }
    if (data) {
        const result: {
            id: number
            st_type: string,
            mat_code: string,
            mat_color: string,
            mat_color_name: string
        }[] = []
        data.map(item => result.push({
            id: item.id,
            st_type: item.st_type,
            mat_code: item.mat_code,
            mat_color: item.mat_color,
            mat_color_name: item.mat_color_name
        }))
        console.log(result)
        return result
    }
}

export async function addStType(item: TablesInsert<'st_type'>): Promise<void> {
    try {
        await client
            .from('st_type')
            .insert([item])
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function updateStType(item: TablesUpdate<'st_type'>): Promise<void> {
    const {error} = await client
        .from('st_type')
        .update(item)
        .eq('id', item.id)
    if (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteStType(item: Tables<'st_type'>): Promise<void> {
    try {
        await client
            .from('st_type')
            .delete()
            .eq('id', item.id);
    } catch (error) {
        console.log(error);
        throw error;
    }
}