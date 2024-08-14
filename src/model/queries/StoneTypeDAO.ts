import {getClient} from "../getClient.ts";
import {Option} from "../../Definitions/DropdownOption.ts";

const client = getClient()

export async function getStoneTypesOptionsFromClient(): Promise<Option[] | undefined> {
    const {data, error} = await client
        .from("st_type")
        .select('st_type');
    if (error) {
        throw error;
    }
    if (data) {
        const result: Option[] = []
        data.forEach(item => result.push({id: item.st_type, description: item.st_type}))
        return result
    }
}

export async function getStoneTypesFromClient(): Promise<{'St Type': string}[] | undefined> {
    const {data, error} = await client
        .from("st_type")
        .select('st_type');
    if (error) {
        throw error;
    }
    if (data) {
        const result: {"St Type": string}[] = []
        data.map(item => result.push({"St Type": item.st_type}))
        return result
    }
}