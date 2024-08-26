import {Option} from "../../../Definitions/DropdownOption.ts";
import {Tables} from "../../../Definitions/generatedDefinitions.ts";

export interface StCutDAO {
    getStoneCutOptionFromClient(): Promise<Option[] | undefined>
    getStoneCutFromClient(): Promise<Tables<'st_cut'>[] | undefined>
}
