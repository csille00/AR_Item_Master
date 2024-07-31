import {FormColumn} from "./FormColumn.ts"
import {LabeledInputType} from "../Components/Util/LabeledInput.tsx";
import {age, gender, ProductTypes} from "./enum.ts";
import {Option} from "./DropdownOption.ts";
import {getStoneTypesFromClient} from "../model/queries/stoneTypeDAO.ts";
import {getCertTypesFromClient} from "../model/queries/st_cert_typeDAO.ts";
import {getColorGradeFromClient} from "../model/queries/st_color_gradeDAO.ts";
import {getCertClarityFromClient} from "../model/queries/st_cert_clarityDAO.ts";
import {getMetalTypesFromClient} from "../model/queries/metal_typeDAO.ts";
import {getMetalFinishesClient} from "../model/queries/metal_finishDAO.ts";
import {getMetalTexturesFromClient} from "../model/queries/metal_textureDAO.ts";
import {getBandStyleFromClient} from "../model/queries/band_styleDAO.ts";
import {getBandWidthFromClient} from "../model/queries/band_widthDAO.ts";
import {getSettingsFromClient} from "../model/queries/jewelry_settingDAO.ts";
import {getSideStonesFromClient} from "../model/queries/side_stonesDAO.ts";
import {getStylesFromClient} from "../model/queries/ar_styleDAO.ts";

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
            new FormColumn("Style Number", LabeledInputType.Number),
            new FormColumn("Product Name", LabeledInputType.String),
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
        ]
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