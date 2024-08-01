import {Option} from "./DropdownOption.ts";
import {LabeledInputType} from "./enum.ts";

export class FormColumn {
    label: string;
    type: LabeledInputType
    required: boolean
    options?: Option[]

    constructor(label: string, type: LabeledInputType, required: boolean, options?: Option[]) {
        this.label = label
        this.type = type
        this.required = required
        this.options = options
    }

}