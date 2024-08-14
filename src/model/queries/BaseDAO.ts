import {Option} from "../../Definitions/DropdownOption.ts";
import {getClient} from "../getClient.ts";

const client = getClient()

export async function getOptionsFromClient(tableName: string): Promise<Option[] | undefined> {
    const {data, error} = await client
        .from(tableName)
        .select('id,description')
        .order('id', {ascending: true})
    if (error) {
        throw error;
    }
    if (data) {
        const result: Option[] = []
        data.forEach(item => result.push({id: item.id, description: item.description}))
        return data
    }
}

export async function addOption(tableName: string, option: Option): Promise<void> {
    try {
        console.log("from base dao: ", tableName, " ", option)
        await client
            .from(tableName)
            .insert([
                {description: option.description}
            ])
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteOption(tableName: string, option: Option): Promise<void> {
    try {
        console.log("from base dao: ", tableName, " ", option)
        await client
            .from(tableName)
            .delete()
            .eq('id', option.id);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function updateOption(tableName: string, newOption: Option): Promise<void> {
    try {
        await client
            .from(tableName)
            .update({description: newOption.description})
            .eq('id', newOption.id)
    } catch (error) {
        console.log(error);
        throw error;
    }
}