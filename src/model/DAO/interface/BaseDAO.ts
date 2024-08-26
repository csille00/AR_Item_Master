import {Option} from "../../../Definitions/DropdownOption.ts";

export interface BaseDAO {
    getOptionsFromClient(tableName: string): Promise<Option[] | undefined>
    addOption(tableName: string, option: Option): Promise<void>
    deleteOption(tableName: string, option: Option): Promise<void>
    updateOption(tableName: string, newOption: Option): Promise<void>
}