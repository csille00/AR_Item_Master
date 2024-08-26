import {getClient} from "../../getClient.ts";
import {Option} from "../../../Definitions/DropdownOption.ts";
import {StTypeDAO} from "../interface/StTypeDAO.ts";

export class SupabaseStTypeDAO implements StTypeDAO {

    client = getClient()

    async getStoneTypesOptionsFromClient(): Promise<Option[] | undefined> {
        const {data, error} = await this.client
            .from("st_type")
            .select('st_type');
        if (error) {
            throw error;
        }
        if (data) {
            const result: Option[] = []
            data.forEach(item => result.push({id: item.st_type, description: item.st_type}))
            return result
        }
    }

    async getStoneTypesFromClient(): Promise<{ 'St Type': string }[] | undefined> {
        const {data, error} = await this.client
            .from("st_type")
            .select('st_type');
        if (error) {
            throw error;
        }
        if (data) {
            const result: { "St Type": string }[] = []
            data.map(item => result.push({"St Type": item.st_type}))
            return result
        }
    }
}