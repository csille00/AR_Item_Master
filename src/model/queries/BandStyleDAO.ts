import {getClient} from "../getClient.ts";
import {Option} from "../../Definitions/DropdownOption.ts";

const client = getClient()

export async function getBandStyleFromClient(): Promise<Option[] | undefined> {
    const {data, error} = await client
        .from("band_style")
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