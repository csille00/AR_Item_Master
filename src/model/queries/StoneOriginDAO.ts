import {getClient} from "../getClient.ts";
import {Option} from "../../Definitions/DropdownOption.ts";

const client = getClient()

export async function getStoneOriginFromClient(): Promise<Option[] | undefined> {
    const {data, error} = await client
        .from("stone_origin")
        .select('id,origin');
    if (error) {
        throw error;
    }
    if (data) {
        const result: Option[] = []
        data.forEach(item => result.push({id: item.id, description: item.origin}))
        return result
    }
}