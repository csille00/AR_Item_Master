import {Option} from "./DropdownOption.ts";
import {LabeledInputType} from "./enum.ts";
import {Constraint} from "./Constraint.ts";

export class FormColumn {
    label: string;
    type: LabeledInputType
    required: boolean
    options?: Option[]
    constraint?: Constraint

    constructor(label: string, type: LabeledInputType, required: boolean, options?: Option[] | null, constraint?: Constraint | null) {
        this.label = label
        this.type = type
        this.required = required
        this.options = options ?? undefined
        this.constraint = constraint ?? undefined
    }

}