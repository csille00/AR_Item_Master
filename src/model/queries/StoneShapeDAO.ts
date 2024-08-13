import {getClient} from "../getClient.ts";
import {Option} from "../../Definitions/DropdownOption.ts";

const client = getClient()

export async function getStoneShapeFromClient(): Promise<Option[] | undefined> {
    const {data, error} = await client
        .from("st_shape")
        .select('id,shape');
    if (error) {
        throw error;
    }
    if (data) {
        const result: Option[] = []
        data.forEach(item => result.push({id: item.id, description: item.shape}))
        return result
    }
}