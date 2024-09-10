import React from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {TablesUpdate} from "../Definitions/generatedDefinitions.ts";
import DetailedItemTable from "./DetailedItemTable.tsx";
import {editJewelryMasterRow, getJewelryDataBySKU} from "../model/queries/ArJewelryMasterDAO.ts";
import {JewelryFormConfig} from "../Definitions/FormConfig/jewelryFormConfig.ts";
import {LabeledInputType, MapFormDataToJewelryMasterColumns} from "../Definitions/enum.ts";
import {FormColumn} from "../Definitions/FormColumn.ts";

const JewelryDetailsPage = () => {
    const {sku} = useParams();
    const location = useLocation();
    const stateItem = location.state || {};
    const config = new JewelryFormConfig()
    const navigate = useNavigate()

    if (!stateItem) {
        return <p>No product details found.</p>;
    }

    const transformSortColumn = (col: string): string => {
        return MapFormDataToJewelryMasterColumns[col as keyof typeof MapFormDataToJewelryMasterColumns];
    }

    const updateJewelryItem = async (formData: {
        [key: string]: string | number
    }, columns: FormColumn[]): Promise<string | null> => {
        // Ensure all required fields are filled out

        let data: TablesUpdate<'ar_jewelry_master'> = {};
        // Iterate through formData keys to build the data object
        for (const key of Object.keys(formData)) {
            let dataToAssign: string | number | null = formData[key];
            const column = columns.find(it => it.label === key);

            //if the column type is number, cast data to number to avoid errors
            if (column?.type == LabeledInputType.NUMBER || (typeof dataToAssign === 'string' && (dataToAssign as string).match(/^\d+$/))) {
                dataToAssign = Number(dataToAssign)
            }

            if (formData[key] === '' || formData[key] === '--') dataToAssign = null;

            // Map form data to the corresponding database columns
            (data as any)[key] = dataToAssign;
        }

        try {
            await editJewelryMasterRow(sku as string, data);
            navigate('/')
            return null;
        } catch (error) {
            console.error("Error inserting data:", error);
            return error;
        }
    };

    return (
        <DetailedItemTable
            itemSku={sku as string}
            onSubmitEdit={(data, columns) => updateJewelryItem(data, columns)}
            fetchItem={(sku) => getJewelryDataBySKU(sku)}
            transformColumn={(col) => transformSortColumn(col)}
            fetchColumns={() => config.getAllColumns()}
            breakPattern={[4, 19, 26]}
        />
    );
};

export default JewelryDetailsPage;