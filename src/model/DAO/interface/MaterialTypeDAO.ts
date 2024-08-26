import {Option} from "../../../Definitions/DropdownOption.ts";
import {Tables} from "../../../Definitions/generatedDefinitions.ts";

export interface MaterialTypeDAO {
    getMetalTypeOptionsFromClient(): Promise<Option[] | undefined>
    getMetalTypeFromClient(): Promise<Tables<'material_type'>[] | undefined>
}