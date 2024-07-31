import {getFormConfig} from "../../Definitions/formConfig.ts";
import {getProductTypesFromClient} from "../../model/queries/productTypeDAO.ts";
import {ProductTypes} from "../../Definitions/enum.ts";
import {AddForm} from "./AddForm.tsx";
import {FormColumn} from "../../Definitions/FormColumn.ts";
import {LabeledInputType} from "../Util/LabeledInput.tsx";

const AddJewelryForm = () => {

    const addJewelry = (formData: { [key: string]: string | number }, columns: FormColumn[]) => {
        console.log("Form Data:", formData);
        console.log(columns)

        Object.keys(formData).forEach(key => {

            const column = columns.find(it => it.label === key)

            if (column?.type === LabeledInputType.Select) {

                const selectedOption = column.options?.find(opt => opt.description === formData[key]);
                if (selectedOption?.id) {
                    formData[key] = selectedOption?.id ;
                }
            }
        })


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
