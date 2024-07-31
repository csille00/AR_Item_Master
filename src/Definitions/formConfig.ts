import {FormColumn} from "./FormColumn.ts"
import {LabeledInputType} from "../Components/Util/LabeledInput.tsx";
import {age, ArJewelryMasterColumns, gender, ProductTypes} from "./enum.ts";
import {Option} from "./DropdownOption.ts";
import {getStoneTypesFromClient} from "../model/queries/StoneTypeDAO.ts";
import {getCertTypesFromClient} from "../model/queries/STCertTypeDAO.ts";
import {getColorGradeFromClient} from "../model/queries/StColorGradeDAO.ts";
import {getCertClarityFromClient} from "../model/queries/StCertClarityDAO.ts";
import {getMetalTypesFromClient} from "../model/queries/MetalTypeDAO.ts";
import {getMetalFinishesClient} from "../model/queries/MetalFinishDAO.ts";
import {getMetalTexturesFromClient} from "../model/queries/MetalTextureDAO.ts";
import {getBandStyleFromClient} from "../model/queries/BandStyleDAO.ts";
import {getBandWidthFromClient} from "../model/queries/BandWidthDAO.ts";
import {getSettingsFromClient} from "../model/queries/JewelrySettingDAO.ts";
import {getSideStonesFromClient} from "../model/queries/SideStonesDAO.ts";
import {getStylesFromClient} from "../model/queries/ArStyleDAO.ts";

const yesNoOption: Option[] = [
    {description: 'Yes'},
    {description: 'No'}
]

export const getFormConfig = async (type: string): Promise<FormColumn[]> => {
    switch (type) {
        case ProductTypes.ENG:
            return getEngagementRingRows()
        case ProductTypes.WED:
            return getWeddingRingRows()
        default: return []
    }
}

const getEngagementRingRows = async (): Promise<FormColumn[]> => {

    try {
        return [
            new FormColumn(ArJewelryMasterColumns.STYLE_NUMBER, LabeledInputType.Number),
            new FormColumn(ArJewelryMasterColumns.PRODUCT_NAME, LabeledInputType.String),
            new FormColumn(ArJewelryMasterColumns.MSRP, LabeledInputType.Number),
            new FormColumn(ArJewelryMasterColumns.COST, LabeledInputType.Number),
            new FormColumn(ArJewelryMasterColumns.ST_TYPE, LabeledInputType.Select, await getStoneTypesFromClient()),
            new FormColumn(ArJewelryMasterColumns.ST_CTW, LabeledInputType.Number),
            new FormColumn(ArJewelryMasterColumns.ST_CERT_TYPE, LabeledInputType.Select, await getCertTypesFromClient()),
            new FormColumn(ArJewelryMasterColumns.ST_CERT_COLOR, LabeledInputType.Select, await getColorGradeFromClient()),
            new FormColumn(ArJewelryMasterColumns.ST_CERT_CLARITY, LabeledInputType.Select, await getCertClarityFromClient()),
            new FormColumn(ArJewelryMasterColumns.AR_STYLE, LabeledInputType.Select, await getStylesFromClient()),
            new FormColumn(ArJewelryMasterColumns.AGE, LabeledInputType.Select, [{description: age.ADULT}]),
            new FormColumn(ArJewelryMasterColumns.GENDER, LabeledInputType.Select, [
                {description: gender.UNISEX},
                {description: gender.MALE},
                {description: gender.FEMALE}
            ]),
            new FormColumn(ArJewelryMasterColumns.RETURNABLE, LabeledInputType.Select, yesNoOption),
            new FormColumn(ArJewelryMasterColumns.ENGRAVABLE, LabeledInputType.Select, yesNoOption),
            new FormColumn(ArJewelryMasterColumns.MADE_TO_ORDER, LabeledInputType.Select, yesNoOption),
            new FormColumn(ArJewelryMasterColumns.ADJUSTABLE, LabeledInputType.Select, yesNoOption),
            new FormColumn(ArJewelryMasterColumns.METAL_TYPE, LabeledInputType.Select, await getMetalTypesFromClient()),
            new FormColumn(ArJewelryMasterColumns.METAL_FINISH, LabeledInputType.Select, await getMetalFinishesClient()),
            new FormColumn(ArJewelryMasterColumns.METAL_TEXTURE, LabeledInputType.Select, await getMetalTexturesFromClient()),
            new FormColumn(ArJewelryMasterColumns.BAND_STYLE, LabeledInputType.Select, await getBandStyleFromClient()),
            new FormColumn(ArJewelryMasterColumns.BAND_WIDTH, LabeledInputType.Select, await getBandWidthFromClient()),
            new FormColumn(ArJewelryMasterColumns.SETTING, LabeledInputType.Select, await getSettingsFromClient()),
            new FormColumn(ArJewelryMasterColumns.SIDE_STONES, LabeledInputType.Select, await getSideStonesFromClient())
        ];
    } catch (error) {
        throw new Error("Error Fetching objects from database. Please try again later")
    }
};

const getWeddingRingRows = async (): Promise<FormColumn[]> => {

    return [
        new FormColumn("Style Number Wedding Band", LabeledInputType.Number),
        new FormColumn("Product", LabeledInputType.String),
        new FormColumn("MSRP", LabeledInputType.Number),
        new FormColumn("Cost", LabeledInputType.Number),
        new FormColumn("ST Type", LabeledInputType.Select, await getStoneTypesFromClient()),
        new FormColumn("ST CTW", LabeledInputType.Number),
        new FormColumn("ST Cert Type", LabeledInputType.Select, await getCertTypesFromClient()),
        new FormColumn("ST Cert Color", LabeledInputType.Select, await getColorGradeFromClient()),
        new FormColumn("ST Cert Clarity", LabeledInputType.Select, await getCertClarityFromClient()),
        new FormColumn("AR Style", LabeledInputType.Select, await getStylesFromClient()),
        new FormColumn("Age", LabeledInputType.Select, [{description: age.ADULT}]),
        new FormColumn("Gender", LabeledInputType.Select, [
            {description: gender.UNISEX},
            {description: gender.MALE},
            {description: gender.FEMALE}
        ]),
        new FormColumn("Returnable", LabeledInputType.Select, yesNoOption),
        new FormColumn("Engravable", LabeledInputType.Select, yesNoOption),
        new FormColumn("Made to Order", LabeledInputType.Select, yesNoOption),
        new FormColumn("Adjustable", LabeledInputType.Select, yesNoOption),
        new FormColumn("Metal Type", LabeledInputType.Select, await getMetalTypesFromClient()),
        new FormColumn("Metal Finish", LabeledInputType.Select, await getMetalFinishesClient()),
        new FormColumn("Metal Texture", LabeledInputType.Select, await getMetalTexturesFromClient()),
        new FormColumn("Band Style", LabeledInputType.Select, await getBandStyleFromClient()),
        new FormColumn("Band Width", LabeledInputType.Select, await getBandWidthFromClient()),
        new FormColumn("Setting", LabeledInputType.Select, await getSettingsFromClient()),
        new FormColumn("Side Stones", LabeledInputType.Select, await getSideStonesFromClient())
    ];
};