import {getClient} from "../getClient.ts";
import {Option} from "../../Definitions/DropdownOption.ts";

const client = getClient()

export async function getSettingsFromClient(): Promise<Option[] | undefined> {
    const {data, error} = await client
        .from("jewelry_setting")
        .select('id,setting');
    if (error) {
        throw error;
    }
    if (data) {
        const result: Option[] = []
        data.forEach(item => result.push({id: item.id, description: item.setting}))
        return result
    }
}