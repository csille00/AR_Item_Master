import {AddForm} from "./AddForm.tsx";
import {FormColumn} from "../../Definitions/FormColumn.ts";
import {getStoneProductTypesFromClient} from "../../model/queries/StoneProductTypeDAO.ts";
import {getStoneFormConfig} from "../../Definitions/FormConfig/stoneFormConfig.ts";
import {
    ArStoneMasterColumns,
    LabeledInputType,
    MapFormDataToStoneMasterColumns,
    StoneProductTypeIds,
} from "../../Definitions/enum.ts";
import {TablesInsert} from "../../Definitions/generatedDefinitions.ts";
import {insertIntoStoneMaster} from "../../model/queries/ArStoneMasterDAO.ts";

const AddStoneForm = () => {

    const addStone = async (formData: { [key: string]: string | number }, columns: FormColumn[]): Promise<boolean> => {
        // Ensure all required fields are filled out
        for (const column of columns) {
            if (column.required && (formData[column.label] === undefined || formData[column.label] === '')) {
                alert(`${column.label} is required.`);
                return false;
            }

            if(
                column.type == LabeledInputType.NUMBER
                && column.constraint
                && (Number(formData[column.label]) < column.constraint.low || Number(formData[column.label]) > column.constraint.high)
            ){
                alert(`${column.label} must be between ${column.constraint.low} and ${column.constraint.high}.`);
            }
        }

        let data: TablesInsert<'ar_stone_master'> = {};
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
            const dbColumnKey = MapFormDataToStoneMasterColumns[key as keyof typeof MapFormDataToStoneMasterColumns];
            if (dbColumnKey) {
                (data as any)[dbColumnKey] = dataToAssign;
            }
        }

        // Add default values
        data.date = new Date().toISOString();

        try {
            await insertIntoStoneMaster(data);
            return true;
        } catch (error) {
            console.error("Error inserting data:", error);
            return false;
        }
    };

    return (
        <AddForm
            title="Add Stone"
            fetchColumns={(type: string) => getStoneFormConfig(type)}
            fetchProductTypes={getStoneProductTypesFromClient}
            initialType={StoneProductTypeIds.ELS}
            typeValue={ArStoneMasterColumns.TYPE}
            submitForm={addStone}
        />
    )
}

export default AddStoneForm;
