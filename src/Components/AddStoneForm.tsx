import {getFormConfig} from "../Definitions/formConfig.ts";
import {getProductTypesFromClient} from "../model/queries/productTypeDAO.ts";
import {ProductTypes} from "../Definitions/enum.ts";
import {AddForm} from "./AddForm.tsx";

const AddStoneForm = () => {

    const addStone = (formData: { [key: string]: string }) => {
        console.log("Form Data:", formData);
        // Insert into your database here
    };

    return (
        <AddForm
            title="Add Stone"
            columnsConfig={[]} // Initial empty config, will be fetched
            fetchColumns={(type: string) => getFormConfig(type)}
            fetchProductTypes={getProductTypesFromClient}
            initialType={ProductTypes.ENG}
            submitForm={addStone}
        />
    )
}

export default AddStoneForm;
