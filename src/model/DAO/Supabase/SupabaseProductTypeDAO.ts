import {getClient} from "../../getClient.ts";
import {Option} from "../../../Definitions/DropdownOption.ts";
import {ProductTypesDAO} from "../interface/ProductTypesDAO.ts";

export class SupabaseProductTypeDAO implements ProductTypesDAO {

    client = getClient()

    async getProductTypesFromClient(table: string): Promise<Option[] | undefined> {
        const {data, error} = await this.client
            .from(table)
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
}