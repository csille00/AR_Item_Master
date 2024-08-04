import {getClient} from "../getClient.ts";
import {Option} from "../../Definitions/DropdownOption.ts";

const client = getClient()

export async function getCharmTypeFromClient(): Promise<Option[] | undefined> {
    const {data, error} = await client
        .from("stone_color")
        .select('id,color');
    if (error) {
        throw error;
    }
    if (data) {
        const result: Option[] = []
        data.forEach(item => result.push({id: item.id, description: item.color}))
        return result
    }
}