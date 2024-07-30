import {getClient} from "../getClient.ts";

const client = getClient()

export async function getProductTypeFromClient(): Promise<Map<string, number> | undefined> {
    const {data, error} = await client.from("product_type").select('product_type,prod_code');
    if (error) {
        throw error;
    }
    if (data) {
        let result: Map<string, number> = new Map()
        data.forEach(item => result.set(item.product_type, item.prod_code))
        return result
    }
}