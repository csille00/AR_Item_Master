import {LabeledInputType} from "../Components/Util/LabeledInput.tsx";
import {Option} from "./DropdownOption.ts";

export class FormColumn {
    label: string;
    type: LabeledInputType
    options?: Option[]

    constructor(label: string, type: LabeledInputType, options?: Option[]) {
        this.label = label
        this.type = type
        this.options = options
    }

}