import {getFormConfig} from "../../Definitions/formConfig.ts";
import {getProductTypesFromClient} from "../../model/queries/ProductTypeDAO.ts";
import {ArJewelryMasterColumns, ProductTypes, Status} from "../../Definitions/enum.ts";
import {AddForm} from "./AddForm.tsx";
import {FormColumn} from "../../Definitions/FormColumn.ts";
import {LabeledInputType} from "../Util/LabeledInput.tsx";
import {TablesInsert} from "../../Definitions/definitions.ts";
import {insertIntoJewelryMaster} from "../../model/queries/ArJewelryMasterDAO.ts";

const AddJewelryForm = () => {

    const addJewelry = async (formData: { [key: string]: string | number }, columns: FormColumn[]) => {
        let data: TablesInsert<'ar_jewelry_master'> = {}
        Object.keys(formData).forEach(key => {
            let dataToAssign: string | number | null = formData[key]

            const column = columns.find(it => it.label === key)

            if (column?.type === LabeledInputType.Select) {

                const selectedOption = column.options?.find(opt => opt.description === formData[key]);
                if (selectedOption?.id) {
                    dataToAssign = selectedOption?.id ;
                }
            }
            if(formData[key] == "--") dataToAssign = null

            switch(key){
                case(ArJewelryMasterColumns.TYPE):
                    data.prod_code = (dataToAssign as string)
                    break;
                case(ArJewelryMasterColumns.STYLE_NUMBER):
                    data.style_number = (dataToAssign as number)
                    break;
                case(ArJewelryMasterColumns.PRODUCT_NAME):
                    data.prod_name = (dataToAssign as string)
                    break;
                case(ArJewelryMasterColumns.MSRP):
                    data.msrp = (dataToAssign as number)
                    break;
                case(ArJewelryMasterColumns.COST):
                    data.cost = (dataToAssign as number)
                    break;
                case(ArJewelryMasterColumns.ST_TYPE):
                    data.st_type = (dataToAssign as string)
                    break;
                case(ArJewelryMasterColumns.ST_CTW):
                    data.st_ctw = (dataToAssign as number)
                    break;
                case(ArJewelryMasterColumns.ST_CERT_TYPE):
                    data.st_cert_type = (dataToAssign as number)
                    break;
                case(ArJewelryMasterColumns.ST_CERT_COLOR):
                    data.st_cert_color = (dataToAssign as number)
                    break;
                case(ArJewelryMasterColumns.ST_CERT_CLARITY):
                    data.st_cert_clarity = (dataToAssign as number)
                    break;
                case(ArJewelryMasterColumns.AR_STYLE):
                    data.ar_style = (dataToAssign as number)
                    break;
                case(ArJewelryMasterColumns.AGE):
                    data.age = (dataToAssign as string)
                    break;
                case(ArJewelryMasterColumns.GENDER):
                    data.gender = (dataToAssign as string)
                    break;
                case(ArJewelryMasterColumns.RETURNABLE):
                    if(dataToAssign === 'Yes') data.returnable = true
                    if(dataToAssign === 'No') data.returnable = false
                    break;
                case(ArJewelryMasterColumns.ENGRAVABLE):
                    if(dataToAssign === 'Yes') data.engravable = true
                    if(dataToAssign === 'No') data.engravable = false
                    break;
                case(ArJewelryMasterColumns.MADE_TO_ORDER):
                    if(dataToAssign === 'Yes') data.made_to_order = true
                    if(dataToAssign === 'No') data.made_to_order = false
                    break;
                case(ArJewelryMasterColumns.ADJUSTABLE):
                    if(dataToAssign === 'Yes') data.adjustable = true
                    if(dataToAssign === 'No') data.adjustable = false
                    break;
                case(ArJewelryMasterColumns.METAL_TYPE):
                    data.material_type_id = (dataToAssign as number)
                    break;
                case(ArJewelryMasterColumns.METAL_FINISH):
                    data.metal_finish = (dataToAssign as number)
                    break;
                case(ArJewelryMasterColumns.METAL_TEXTURE):
                    data.metal_texture = (dataToAssign as number)
                    break;
                case(ArJewelryMasterColumns.BAND_STYLE):
                    data.band_style = (dataToAssign as number)
                    break;
                case(ArJewelryMasterColumns.BAND_WIDTH):
                    data.band_width = 1
                    break;
                case(ArJewelryMasterColumns.SETTING):
                    data.setting = (dataToAssign as number)
                    break;
                case(ArJewelryMasterColumns.SIDE_STONES):
                    data.side_stones = (dataToAssign as number)
                    break;
            }
        })

        //add default values
        data.date = new Date().toISOString()
        data.status = Status.ACTIVE

        await insertIntoJewelryMaster(data)
    };

    return (
        <AddForm
            title="Add Jewelry"
            fetchColumns={(type: string) => getFormConfig(type)}
            fetchProductTypes={getProductTypesFromClient}
            initialType={ProductTypes.ENG}
            submitForm={addJewelry}
        />
    )
}

export default AddJewelryForm;
