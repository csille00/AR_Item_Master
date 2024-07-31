import {getClient} from "../getClient.ts";
import {Option} from "../../Definitions/DropdownOption.ts";

const client = getClient()

export async function getCertClarityFromClient(): Promise<Option[] | undefined> {
    const {data, error} = await client
        .from("st_clarity_grade")
        .select('id,grade');
    if (error) {
        throw error;
    }
    if (data) {
        const result: Option[] = []
        data.forEach(item => result.push({id: item.id, description: item.grade}))
        return result
    }
}