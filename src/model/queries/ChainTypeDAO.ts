import {getClient} from "../getClient.ts";
import {Option} from "../../Definitions/DropdownOption.ts";

const client = getClient()

export async function getChainTypesFromClient(): Promise<Option[] | undefined> {
    const {data, error} = await client
        .from("chain_type")
        .select('id,type');
    if (error) {
        throw error;
    }
    if (data) {
        const result: Option[] = []
        data.forEach(item => result.push({id: item.id, description: item.type}))
        return result
    }
}