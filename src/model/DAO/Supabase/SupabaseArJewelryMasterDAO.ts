import {getClient} from "../../getClient.ts";
import {FilterOption} from "../../../Definitions/FilterOption.ts";
import {MapFormDataToJewelryMasterColumns} from "../../../Definitions/enum.ts";
import {TablesInsert} from "../../../Definitions/generatedDefinitions.ts";
import {ArJewelryMasterDAO, createJewelryMasterQuery, JewelryMasterQuery} from "../interface/ArJewelryMasterDAO.ts";

export class SupabaseArJewelryMasterDAO implements ArJewelryMasterDAO {

    private client = getClient()

    async insertIntoJewelryMaster(dataToInsert: TablesInsert<'ar_jewelry_master'>) {
        const {error} = await this.client
            .from("ar_jewelry_master")
            .insert([dataToInsert]);

        if (error) {
            throw error;
        }
    }

    async getJewelryMasterPageFromClient(
        page: number,
        filters: FilterOption[],
        pageLength: number = 100
    ): Promise<JewelryMasterQuery | undefined> {
        const start = (page - 1) * pageLength;
        const end = start + pageLength - 1;

        const jewelryMasterQuery = createJewelryMasterQuery()

        jewelryMasterQuery.range(start, end)

        // Apply filters
        if (!filters.some(filter => filter.value == 'ALL')) {
            filters.forEach(filter => {
                const column = MapFormDataToJewelryMasterColumns[filter.column as keyof typeof MapFormDataToJewelryMasterColumns];
                if (column) {
                    jewelryMasterQuery.eq(column, filter.value);
                }
            });
        }

        const {data, error} = await jewelryMasterQuery

        if (error) {
            throw error;
        }
        return data as JewelryMasterQuery;
    }

    async getJewelryDataAsCSV() {
        const {data, error} = await this.client
            .from('ar_jewelry_master')
            .select()
            .csv()
        if (error) {
            throw error
        }
        return data
    }
}
