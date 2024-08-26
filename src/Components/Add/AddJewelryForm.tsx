import {getFormConfig} from "../../Definitions/FormConfig/jewelryFormConfig.ts";
import {
    AdminTables,
    ArJewelryMasterColumns,
    LabeledInputType,
    MapFormDataToJewelryMasterColumns, ProductTypeIds,
    Status
} from "../../Definitions/enum.ts";
import {AddForm} from "./AddForm.tsx";
import {FormColumn} from "../../Definitions/FormColumn.ts";
import {TablesInsert} from "../../Definitions/generatedDefinitions.ts";
import {FactoryDAO} from "../../model/DAO/interface/FactoryDAO.ts";
import {SupabaseFactoryDAO} from "../../model/DAO/Supabase/SupabaseFactoryDAO.ts";

const AddJewelryForm = () => {
    const daoFactory: FactoryDAO = new SupabaseFactoryDAO()
    const jewelryMasterDAO = daoFactory.getArJewelryMasterDAO()
    const productTypesDAO = daoFactory.getProductTypesDAO()

    const addJewelry = async (formData: {
        [key: string]: string | number
    }, columns: FormColumn[]): Promise<string | null> => {
        // Ensure all required fields are filled out

        let data: TablesInsert<'ar_jewelry_master'> = {};
        console.log('Form data: \n', formData)
        // Iterate through formData keys to build the data object
        for (const key of Object.keys(formData)) {
            let dataToAssign: string | number | null = formData[key];
            const column = columns.find(it => it.label === key);

            //if the column type is number, cast data to number to avoid errors
            if (column?.type == LabeledInputType.NUMBER) {
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
            await jewelryMasterDAO.insertIntoJewelryMaster(data);
            return null;
        } catch (error) {
            console.error("Error inserting data:", error);
            return error;
        }
    };

    return (
        <AddForm
            title="Add Jewelry"
            fetchColumns={(type: string) => getFormConfig(type)}
            fetchProductTypes={() => productTypesDAO.getProductTypesFromClient(AdminTables.PRODUCT_TYPE)}
            initialType={ProductTypeIds.ENG}
            typeValue={ArJewelryMasterColumns.TYPE}
            submitForm={addJewelry}
        />
    )
}

export default AddJewelryForm;
