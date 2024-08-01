import {getClient} from "../getClient.ts";
import {Option} from "../../Definitions/DropdownOption.ts";

const client = getClient()

export async function getProductTypesFromClient(): Promise<Option[] | undefined> {
    const {data, error} = await client
        .from("product_type")
        .select('prod_code,product_type');
    if (error) {
        throw error;
    }
    if (data) {
        let result: Option[] = []
        data.forEach(item =>
            result.push({id: item.prod_code, description: item.product_type})
        )
        return result
    }
}