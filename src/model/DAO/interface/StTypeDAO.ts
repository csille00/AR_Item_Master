import {Option} from "../../../Definitions/DropdownOption.ts";
import {Tables} from "../../../Definitions/generatedDefinitions.ts";

export interface StTypeDAO {
    getStoneTypesOptionsFromClient(): Promise<Option[] | undefined>
    getStoneTypesFromClient(): Promise<{'St Type': string}[] | undefined>
}