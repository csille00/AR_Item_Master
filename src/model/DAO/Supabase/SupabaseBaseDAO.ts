import {Option} from "../../../Definitions/DropdownOption.ts";
import {getClient} from "../../getClient.ts";
import {BaseDAO} from "../interface/BaseDAO.ts";

export class SupabaseBaseDAO implements BaseDAO {

    private client = getClient()

    async getOptionsFromClient(tableName: string): Promise<Option[] | undefined> {
        const {data, error} = await this.client
            .from(tableName)
            .select('id,description')
            .order('id', {ascending: true})
        if (error) {
            throw error;
        }
        if (data) {
            const result: Option[] = []
            data.forEach(item => result.push({id: item.id, description: item.description}))
            return data
        }
    }

    async addOption(tableName: string, option: Option): Promise<void> {
        try {
            console.log("from base dao: ", tableName, " ", option)
            await this.client
                .from(tableName)
                .insert([
                    {description: option.description}
                ])
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deleteOption(tableName: string, option: Option): Promise<void> {
        try {
            console.log("from base dao: ", tableName, " ", option)
            await this.client
                .from(tableName)
                .delete()
                .eq('id', option.id);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateOption(tableName: string, newOption: Option): Promise<void> {
        const {error} = await this.client
            .from(tableName)
            .update({description: newOption.description})
            .eq('id', newOption.id)
        if (error) {
            console.log(error);
            throw error;
        }
    }
}

/*
tables that are different from id, description:
ctw_range
material type /
st_cut /
st_type /
 */