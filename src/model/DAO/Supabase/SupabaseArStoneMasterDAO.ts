import {getClient} from "../getClient.ts";
import {FilterOption} from "../../Definitions/FilterOption.ts";
import {MapFormDataToStoneMasterColumns} from "../../Definitions/enum.ts";
import {TablesInsert} from "../../Definitions/generatedDefinitions.ts";
import {QueryData} from "@supabase/supabase-js";

export class SupabaseArStoneMasterDAO implements ArStoneMasterDAO {

    private client = getClient()

    async insertIntoStoneMaster(dataToInsert: TablesInsert<'ar_stone_master'>) {
        console.log("Data to Insert:", dataToInsert);

        const {error} = await this.client
            .from("ar_stone_master")
            .insert([dataToInsert]);
        if (error) {
            throw error;
        }
    }

    async getStoneMasterItemsFromClient(filters: FilterOption[]): Promise<StoneMasterQuery | undefined> {
        // Apply filters
        const stoneMasterQuery = createStoneMasterQuery()
        if (!filters.some(filter => filter.value == 'ALL')) {
            filters.forEach(filter => {
                const column = MapFormDataToStoneMasterColumns[filter.column as keyof typeof MapFormDataToStoneMasterColumns];
                if (column) {
                    stoneMasterQuery.eq(column, filter.value);
                }
            });
        }

        const {data, error} = await stoneMasterQuery
        console.log('data in dao: ', data)

        if (error) {
            throw error;
        }
        return data as StoneMasterQuery;
    }

    async getStoneDataAsCSV(): Promise<string | null> {
        const {data, error} = await this.client
            .from('ar_stone_master')
            .select()
            .csv()
        if (error) {
            throw error
        }
        return data
    }
}