import {getFormConfig} from "../../Definitions/FormConfig/jewelryFormConfig.ts";
import {getProductTypesFromClient} from "../../model/queries/ProductTypeDAO.ts";
import {
    ArJewelryMasterColumns,
    LabeledInputType,
    MapFormDataToJewelryMasterColumns, ProductTypeIds,
    Status
} from "../../Definitions/enum.ts";
import {AddForm} from "./AddForm.tsx";
import {FormColumn} from "../../Definitions/FormColumn.ts";
import {insertIntoJewelryMaster} from "../../model/queries/ArJewelryMasterDAO.ts";
import {TablesInsert} from "../../Definitions/generatedDefinitions.ts";

const AddJewelryForm = () => {

    const addJewelry = async (formData: { [key: string]: string | number }, columns: FormColumn[]): Promise<boolean> => {
        // Ensure all required fields are filled out
        for (const column of columns) {
            if (column.required && (formData[column.label] === undefined || formData[column.label] === '')) {
                alert(`${column.label} is required.`);
                return false;
            }
        }

        let data: TablesInsert<'ar_jewelry_master'> = {};
        console.log('Form data: \n', formData)
        // Iterate through formData keys to build the data object
        for (const key of Object.keys(formData)) {
            let dataToAssign: string | number | null = formData[key];
            const column = columns.find(it => it.label === key);

            //if the column type is number, cast data to number to avoid errors
            if (column?.type == LabeledInputType.NUMBER){
                dataToAssign = Number(dataToAssign)
            }

            if (formData[key] === '--') dataToAssign = null;

            // Map form data to the corresponding database columns
            const dbColumnKey = MapFormDataToJewelryMasterColumns[key as keyof typeof MapFormDataToJewelryMasterColumns];
            if (dbColumnKey) {
                (data as any)[dbColumnKey] = dataToAssign;
            }
        }

        // Add default values
        data.date = new Date().toISOString();
        data.status = Status.ACTIVE;

        try {
            await insertIntoJewelryMaster(data);
            return true;
        } catch (error) {
            console.error("Error inserting data:", error);
            return false;
        }
    };

    return (
        <AddForm
            title="Add Jewelry"
            fetchColumns={(type: string) => getFormConfig(type)}
            fetchProductTypes={getProductTypesFromClient}
            initialType={ProductTypeIds.ENG}
            typeValue={ArJewelryMasterColumns.TYPE}
            submitForm={addJewelry}
        />
    )
}

export default AddJewelryForm;
