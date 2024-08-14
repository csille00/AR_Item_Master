import {getClient} from "../getClient.ts";
import {Option} from "../../Definitions/DropdownOption.ts";

const client = getClient()

export async function getStoneProductTypesFromClient(): Promise<Option[] | undefined> {
    const {data, error} = await client
        .from("st_product_type")
        .select('prod_code,description');
    if (error) {
        throw error;
    }
    if (data) {
        let result: Option[] = []
        data.forEach(item =>
            result.push({id: item.prod_code, description: item.description})
        )
        return result
    }
}