import {getClient} from "../../getClient.ts";
import {Option} from "../../../Definitions/DropdownOption.ts";
import {Tables} from "../../../Definitions/generatedDefinitions.ts";
import {MaterialTypeDAO} from "../interface/MaterialTypeDAO.ts";

export class SupabaseMaterialTypeDAO implements MaterialTypeDAO {

    private client = getClient()

    async getMetalTypeOptionsFromClient(): Promise<Option[] | undefined> {
        const {data, error} = await this.client
            .from("material_type")
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

    async getMetalTypeFromClient(): Promise<Tables<'material_type'>[] | undefined> {
        const {data, error} = await this.client
            .from("material_type")
            .select('id,description,mat_code,mat_color');
        if (error) {
            throw error;
        }
        if (data) {
            return data
        }
    }
}