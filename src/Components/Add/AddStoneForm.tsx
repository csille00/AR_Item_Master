import {getFormConfig} from "../../Definitions/formConfig.ts";
import {getProductTypesFromClient} from "../../model/queries/ProductTypeDAO.ts";
import {ProductTypes} from "../../Definitions/enum.ts";
import {AddForm} from "./AddForm.tsx";
import {FormColumn} from "../../Definitions/FormColumn.ts";

const AddStoneForm = () => {

    const addStone = async (formData: { [key: string]: string | number }, columns: FormColumn[]): Promise<boolean> => {
        console.log("Form Data:", formData);
        console.log(columns)
        // Insert into your database here
        return true
    };

    return (
        <AddForm
            title="Add Stone"
            fetchColumns={(type: string) => getFormConfig(type)}
            fetchProductTypes={getProductTypesFromClient}
            initialType={ProductTypes.ENG}
            submitForm={addStone}
        />
    )
}

export default AddStoneForm;
