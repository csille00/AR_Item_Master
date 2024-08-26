import {Option} from "../../../Definitions/DropdownOption.ts";

export interface ProductTypesDAO {
    getProductTypesFromClient(table: string): Promise<Option[] | undefined>
}