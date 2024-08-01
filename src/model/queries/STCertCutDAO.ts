import {getClient} from "../getClient.ts";
import {Option} from "../../Definitions/DropdownOption.ts";

const client = getClient()

export async function getStCertCutFromClient(): Promise<Option[] | undefined> {
    const {data, error} = await client
        .from("st_cert_cut")
        .select('id,cut');
    if (error) {
        throw error;
    }
    if (data) {
        const result: Option[] = []
        data.forEach(item => result.push({id: item.id, description: item.cut}))
        return result
    }
}