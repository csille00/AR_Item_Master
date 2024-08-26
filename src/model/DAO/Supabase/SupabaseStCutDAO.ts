import {getClient} from "../../getClient.ts";
import {Option} from "../../../Definitions/DropdownOption.ts";
import {Tables} from "../../../Definitions/generatedDefinitions.ts";
import {StCutDAO} from "../interface/StCutDAO.ts";

export class SupabaseStCutDAO implements StCutDAO{

    client = getClient()

    async getStoneCutOptionFromClient(): Promise<Option[] | undefined> {
        const {data, error} = await this.client
            .from("st_cut")
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

    async getStoneCutFromClient(): Promise<Tables<'st_cut'>[] | undefined> {
        const {data, error} = await this.client
            .from("st_cut")
            .select('cut, id, st_table');
        if (error) {
            throw error;
        }
        if (data) {
            return data
        }
    }
}