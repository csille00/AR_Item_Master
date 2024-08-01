import {getClient} from "../getClient.ts";
import {Option} from "../../Definitions/DropdownOption.ts";

const client = getClient()

export async function getStoneTypesFromClient(): Promise<Option[] | undefined> {
    const {data, error} = await client
        .from("stone_type")
        .select('stone_type');
    if (error) {
        throw error;
    }
    if (data) {
        return data.map(item => item.stone_type);
    }
}