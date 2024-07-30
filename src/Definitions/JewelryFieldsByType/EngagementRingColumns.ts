import {FormColumn} from "../FormColumn.ts";
import {LabeledInputType} from "../../Components/Util/LabeledInput.tsx";

class EngagementRingColumns {
    style_number = new FormColumn("Style Number", LabeledInputType.Number)
    prod_name = new FormColumn("Product Name", LabeledInputType.String)
    msrp = new FormColumn("MSRP", LabeledInputType.Number)
    cost = new FormColumn("Cost", LabeledInputType.Number)
    st_type: FormColumn | undefined
    st_ctw = new FormColumn("ST CTW", LabeledInputType.Number)
    st_cost = new FormColumn("ST Cost/ CTW", LabeledInputType.Number)
    st_cert_type: FormColumn | undefined
    st_cert_cut: FormColumn | undefined
    st_cert_color: FormColumn | undefined
    st_cert_clarity: FormColumn | undefined
    ar_style: FormColumn | undefined
    age: FormColumn | undefined
    gender: FormColumn | undefined
    returnable = new FormColumn("Returnable", LabeledInputType.Select, ['Yes', 'No'])
    Engravable = new FormColumn("Engravable", LabeledInputType.Select, ['Yes', 'No'])
    made_to_order = new FormColumn("Made to Order", LabeledInputType.Select, ['Yes', 'No'])
    adjustable = new FormColumn("Adjustable", LabeledInputType.Select, ['Yes', 'No'])
    metal_type: FormColumn | undefined
    metal_finish: FormColumn | undefined
    metal_texture: FormColumn | undefined
    band_style: FormColumn | undefined
    band_width: FormColumn | undefined
    setting: FormColumn | undefined
    side_stones: FormColumn | undefined

    
}