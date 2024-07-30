import {LabeledInputType} from "../Components/Util/LabeledInput.tsx";

export class FormColumn {
    label: string;
    type: LabeledInputType
    options?: string[]

    constructor(label: string, type: LabeledInputType, options?: string[]) {
        this.label = label
        this.type = type
        this.options = options
    }

}