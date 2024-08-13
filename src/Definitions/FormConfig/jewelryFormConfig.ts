import {FormColumn} from "../FormColumn.ts"
import {age, ArJewelryMasterColumns, gender, LabeledInputType, ProductTypeIds} from "../enum.ts";
import {Option} from "../DropdownOption.ts";
import {getStoneTypesFromClient} from "../../model/queries/StoneTypeDAO.ts";
import {getCertTypesFromClient} from "../../model/queries/STCertTypeDAO.ts";
import {getColorGradeFromClient} from "../../model/queries/StColorGradeDAO.ts";
import {getCertClarityFromClient} from "../../model/queries/StCertClarityDAO.ts";
import {getMetalTypesFromClient} from "../../model/queries/MetalTypeDAO.ts";
import {getMetalFinishesClient} from "../../model/queries/MetalFinishDAO.ts";
import {getMetalTexturesFromClient} from "../../model/queries/MetalTextureDAO.ts";
import {getBandStyleFromClient} from "../../model/queries/BandStyleDAO.ts";
import {getBandWidthFromClient} from "../../model/queries/BandWidthDAO.ts";
import {getSettingsFromClient} from "../../model/queries/JewelrySettingDAO.ts";
import {getSideStonesFromClient} from "../../model/queries/SideStonesDAO.ts";
import {getStylesFromClient} from "../../model/queries/ArStyleDAO.ts";
import {getStSourceFromClient} from "../../model/queries/StSourceDAO.ts";
import {getStoneColorFromClient} from "../../model/queries/StoneColorDAO.ts";
import {getStoneShapeFromClient} from "../../model/queries/StoneShapeDAO.ts";
import {getStoneCutFromClient} from "../../model/queries/StoneCutDAO.ts";
import {getStoneOrientationFromClient} from "../../model/queries/StoneOrientationDAO.ts";
import {getStoneOriginFromClient} from "../../model/queries/StoneOriginDAO.ts";
import {getStCertCutFromClient} from "../../model/queries/STCertCutDAO.ts";
import {getChainTypesFromClient} from "../../model/queries/ChainTypeDAO.ts";
import {getPendantTypeFromClient} from "../../model/queries/PendantTypeDAO.ts";
import {getEarringTypeFromClient} from "../../model/queries/EarringTypeDAO.ts";
import {getCharmTypeFromClient} from "../../model/queries/CharmTypeDAO.ts";

const yesNoOption: Option[] = [
    {description: 'Yes'},
    {description: 'No'}
]

const genderOptions: Option[] = [
    {description: gender.UNISEX},
    {description: gender.MALE},
    {description: gender.FEMALE}
]

const stoneTypeRows: FormColumn[] = [
    new FormColumn(ArJewelryMasterColumns.ST_SOURCE, LabeledInputType.SELECT, true, await getStSourceFromClient()),
    new FormColumn(ArJewelryMasterColumns.ST_COLOR, LabeledInputType.SELECT, true, await getStoneColorFromClient()),
    new FormColumn(ArJewelryMasterColumns.ST_SHAPE, LabeledInputType.SELECT, true, await getStoneShapeFromClient()),
    new FormColumn(ArJewelryMasterColumns.ST_CUT, LabeledInputType.SELECT, true, await getStoneCutFromClient()),
    new FormColumn(ArJewelryMasterColumns.ST_HEIGHT, LabeledInputType.NUMBER, true, null, {high: 49.99, low: 0.01}),
    new FormColumn(ArJewelryMasterColumns.ST_WIDTH, LabeledInputType.NUMBER, true, null, {high: 49.99, low: 0.01}),
    new FormColumn(ArJewelryMasterColumns.ST_ORIENTATION, LabeledInputType.SELECT, true, await getStoneOrientationFromClient()),
    new FormColumn(ArJewelryMasterColumns.ST_ORIGIN, LabeledInputType.SELECT, true, await getStoneOriginFromClient()),
]


const baseRows: FormColumn[] = [
    new FormColumn(ArJewelryMasterColumns.PRODUCT_NAME, LabeledInputType.STRING, true),
    new FormColumn(ArJewelryMasterColumns.STYLE_NUMBER, LabeledInputType.NUMBER, true, null, {high: 99999, low: 0}),
    new FormColumn(ArJewelryMasterColumns.MSRP, LabeledInputType.NUMBER, true, null, {high: Number.MAX_SAFE_INTEGER, low: 0}),
    new FormColumn(ArJewelryMasterColumns.COST, LabeledInputType.NUMBER, true, null, {high: Number.MAX_SAFE_INTEGER, low: 0}),
    new FormColumn(ArJewelryMasterColumns.ST_TYPE, LabeledInputType.SELECT, false, await getStoneTypesFromClient()),
    ...stoneTypeRows,
    new FormColumn(ArJewelryMasterColumns.AR_STYLE, LabeledInputType.SELECT, true, await getStylesFromClient()),
    new FormColumn(ArJewelryMasterColumns.AGE, LabeledInputType.SELECT, true, [{description: age.ADULT}]),
    new FormColumn(ArJewelryMasterColumns.GENDER, LabeledInputType.SELECT, true, genderOptions),
    new FormColumn(ArJewelryMasterColumns.RETURNABLE, LabeledInputType.SELECT, true, yesNoOption),
    new FormColumn(ArJewelryMasterColumns.ENGRAVABLE, LabeledInputType.SELECT, true, yesNoOption),
    new FormColumn(ArJewelryMasterColumns.MADE_TO_ORDER, LabeledInputType.SELECT, true, yesNoOption),
    new FormColumn(ArJewelryMasterColumns.ADJUSTABLE, LabeledInputType.SELECT, true, yesNoOption),
    new FormColumn(ArJewelryMasterColumns.MATERIAL_TYPE, LabeledInputType.SELECT, true, await getMetalTypesFromClient()),
    new FormColumn(ArJewelryMasterColumns.METAL_FINISH, LabeledInputType.SELECT, true, await getMetalFinishesClient()),
    new FormColumn(ArJewelryMasterColumns.METAL_TEXTURE, LabeledInputType.SELECT, true, await getMetalTexturesFromClient()),
]

export const getFormConfig = async (type: string): Promise<FormColumn[]> => {
    switch (type) {
        case ProductTypeIds.ENG:
            return getEngagementRingRows()
        case ProductTypeIds.WED:
            return getWeddingBandRows()
        case ProductTypeIds.FJR:
            return getRingRows()
        case ProductTypeIds.NCK:
            return getNecklaceRows()
        case ProductTypeIds.EAR:
            return getEarringRows()
        case ProductTypeIds.BRA:
            return getBraceletAnkletRows()
        case ProductTypeIds.CHM:
            return getCharmRows()
        case ProductTypeIds.ACC:
        case ProductTypeIds.GFC:
        case ProductTypeIds.FEE:
        case ProductTypeIds.CON:
        case ProductTypeIds.OTH:
            return baseRows
        default: return []
    }
}

const getEngagementRingRows = async (): Promise<FormColumn[]> => {
    //this is currently every column as of this morning (8/01/24)
    try {
        return [
            new FormColumn(ArJewelryMasterColumns.STYLE_NUMBER, LabeledInputType.NUMBER, true),
            new FormColumn(ArJewelryMasterColumns.PRODUCT_NAME, LabeledInputType.STRING, true),
            new FormColumn(ArJewelryMasterColumns.MSRP, LabeledInputType.NUMBER, true, null, {high: Number.MAX_SAFE_INTEGER, low: 0}),
            new FormColumn(ArJewelryMasterColumns.COST, LabeledInputType.NUMBER, true, null, {high: Number.MAX_SAFE_INTEGER, low: 0}),
            new FormColumn(ArJewelryMasterColumns.ST_TYPE, LabeledInputType.SELECT, false, await getStoneTypesFromClient()),
            new FormColumn(ArJewelryMasterColumns.ST_SOURCE, LabeledInputType.SELECT, false, await getStSourceFromClient()),
            new FormColumn(ArJewelryMasterColumns.ST_COLOR, LabeledInputType.SELECT, false, await getStoneColorFromClient()),
            new FormColumn(ArJewelryMasterColumns.ST_SHAPE, LabeledInputType.SELECT, false, await getStoneShapeFromClient()),
            new FormColumn(ArJewelryMasterColumns.ST_CUT, LabeledInputType.SELECT, false, await getStoneCutFromClient()),
            new FormColumn(ArJewelryMasterColumns.ST_HEIGHT, LabeledInputType.NUMBER, true, null, {high: 49.99, low: 0.01}),
            new FormColumn(ArJewelryMasterColumns.ST_WIDTH, LabeledInputType.NUMBER, true, null, {high: 49.99, low: 0.01}),
            new FormColumn(ArJewelryMasterColumns.ST_ORIENTATION, LabeledInputType.SELECT, false, await getStoneOrientationFromClient()),
            new FormColumn(ArJewelryMasterColumns.ST_ORIGIN, LabeledInputType.SELECT, false, await getStoneOriginFromClient()),
            new FormColumn(ArJewelryMasterColumns.ST_CTW, LabeledInputType.NUMBER, true, null, {high: 29, low: 0}),
            new FormColumn(ArJewelryMasterColumns.ST_COST_CT, LabeledInputType.NUMBER, false, null, {high: Number.MAX_SAFE_INTEGER, low: 0}),
            new FormColumn(ArJewelryMasterColumns.ST_CERT_TYPE, LabeledInputType.SELECT, true, await getCertTypesFromClient()),
            new FormColumn(ArJewelryMasterColumns.ST_CERT_CUT, LabeledInputType.SELECT, true, await getStCertCutFromClient()),
            new FormColumn(ArJewelryMasterColumns.ST_CERT_COLOR, LabeledInputType.SELECT, true, await getColorGradeFromClient()),
            new FormColumn(ArJewelryMasterColumns.ST_CERT_CLARITY, LabeledInputType.SELECT, true, await getCertClarityFromClient()),
            new FormColumn(ArJewelryMasterColumns.AR_STYLE, LabeledInputType.SELECT, true, await getStylesFromClient()),
            new FormColumn(ArJewelryMasterColumns.AGE, LabeledInputType.SELECT, true, [{description: age.ADULT}]),
            new FormColumn(ArJewelryMasterColumns.GENDER, LabeledInputType.SELECT, true, genderOptions),
            new FormColumn(ArJewelryMasterColumns.RETURNABLE, LabeledInputType.SELECT, true, yesNoOption),
            new FormColumn(ArJewelryMasterColumns.ENGRAVABLE, LabeledInputType.SELECT, true, yesNoOption),
            new FormColumn(ArJewelryMasterColumns.MADE_TO_ORDER, LabeledInputType.SELECT, true, yesNoOption),
            new FormColumn(ArJewelryMasterColumns.ADJUSTABLE, LabeledInputType.SELECT, true, yesNoOption),
            new FormColumn(ArJewelryMasterColumns.MATERIAL_TYPE, LabeledInputType.SELECT, true, await getMetalTypesFromClient()),
            new FormColumn(ArJewelryMasterColumns.METAL_FINISH, LabeledInputType.SELECT, true, await getMetalFinishesClient()),
            new FormColumn(ArJewelryMasterColumns.METAL_TEXTURE, LabeledInputType.SELECT, true, await getMetalTexturesFromClient()),
            new FormColumn(ArJewelryMasterColumns.BAND_STYLE, LabeledInputType.SELECT, true, await getBandStyleFromClient()),
            new FormColumn(ArJewelryMasterColumns.BAND_WIDTH, LabeledInputType.SELECT, true, await getBandWidthFromClient()),
            new FormColumn(ArJewelryMasterColumns.SETTING, LabeledInputType.SELECT, true, await getSettingsFromClient()),
            new FormColumn(ArJewelryMasterColumns.SIDE_STONES, LabeledInputType.SELECT, true, await getSideStonesFromClient()),
            new FormColumn(ArJewelryMasterColumns.LENGTH, LabeledInputType.NUMBER, false, null, {high: Number.MAX_SAFE_INTEGER, low: 0}),
            new FormColumn(ArJewelryMasterColumns.CHAIN_TYPE, LabeledInputType.SELECT, false, await getChainTypesFromClient()),
            new FormColumn(ArJewelryMasterColumns.PENDANT_TYPE, LabeledInputType.SELECT, false, await getPendantTypeFromClient()),
            new FormColumn(ArJewelryMasterColumns.EARRING_TYPE, LabeledInputType.SELECT, false, await getEarringTypeFromClient()),
            new FormColumn(ArJewelryMasterColumns.CHARM_TYPE, LabeledInputType.SELECT, false, await getCharmTypeFromClient()),
            new FormColumn(ArJewelryMasterColumns.REPAIR_UPGRADE, LabeledInputType.SELECT, false, yesNoOption),
            new FormColumn(ArJewelryMasterColumns.CONFIGURATOR, LabeledInputType.SELECT, false, yesNoOption),
            new FormColumn(ArJewelryMasterColumns.MULTI_TEXTURE, LabeledInputType.SELECT, false, yesNoOption),
            new FormColumn(ArJewelryMasterColumns.MULTI_FINISH, LabeledInputType.SELECT, false, yesNoOption),
            new FormColumn(ArJewelryMasterColumns.BUNDLE, LabeledInputType.SELECT, false, yesNoOption),
            new FormColumn(ArJewelryMasterColumns.ID, LabeledInputType.NUMBER, false),
            new FormColumn(ArJewelryMasterColumns.VARIANT_ID, LabeledInputType.NUMBER, false),
            new FormColumn(ArJewelryMasterColumns.WEIGHT, LabeledInputType.NUMBER, false, null, {high: Number.MAX_SAFE_INTEGER, low: 0}),
        ];
    } catch (error) {
        throw new Error("Error Fetching objects from database. Please try again later")
    }
};

const getWeddingBandRows = async (): Promise<FormColumn[]> => {

    return [
        ...baseRows,
        new FormColumn(ArJewelryMasterColumns.BAND_STYLE, LabeledInputType.SELECT, true, await getBandStyleFromClient()),
        new FormColumn(ArJewelryMasterColumns.BAND_WIDTH, LabeledInputType.SELECT, true, await getBandWidthFromClient()),
        new FormColumn(ArJewelryMasterColumns.SETTING, LabeledInputType.SELECT, true, await getSettingsFromClient()),
        new FormColumn(ArJewelryMasterColumns.SIDE_STONES, LabeledInputType.SELECT, true, await getSideStonesFromClient()),

    ];
};

const getRingRows = async (): Promise<FormColumn[]> => {

    return [
        ...baseRows,
        new FormColumn(ArJewelryMasterColumns.BAND_STYLE, LabeledInputType.SELECT, true, await getBandStyleFromClient()),
        new FormColumn(ArJewelryMasterColumns.BAND_WIDTH, LabeledInputType.SELECT, true, await getBandWidthFromClient()),
        new FormColumn(ArJewelryMasterColumns.SETTING, LabeledInputType.SELECT, true, await getSettingsFromClient()),
        new FormColumn(ArJewelryMasterColumns.SIDE_STONES, LabeledInputType.SELECT, true, await getSideStonesFromClient()),

    ];
};

const getNecklaceRows = async (): Promise<FormColumn[]> => {

    return [
        ...baseRows,
        new FormColumn(ArJewelryMasterColumns.LENGTH, LabeledInputType.NUMBER, true),
        new FormColumn(ArJewelryMasterColumns.CHAIN_TYPE, LabeledInputType.SELECT, true, await getChainTypesFromClient()),
        new FormColumn(ArJewelryMasterColumns.PENDANT_TYPE, LabeledInputType.SELECT, true, await getPendantTypeFromClient()),
    ];
};

const getEarringRows = async (): Promise<FormColumn[]> => {

    return [
        ...baseRows,
        new FormColumn(ArJewelryMasterColumns.LENGTH, LabeledInputType.NUMBER, false),
        new FormColumn(ArJewelryMasterColumns.EARRING_TYPE, LabeledInputType.SELECT, false, await getEarringTypeFromClient()),
    ];
};

const getBraceletAnkletRows = async (): Promise<FormColumn[]> => {

    return [
        ...baseRows,
        new FormColumn(ArJewelryMasterColumns.LENGTH, LabeledInputType.NUMBER, true),
        new FormColumn(ArJewelryMasterColumns.CHAIN_TYPE, LabeledInputType.SELECT, true, await getChainTypesFromClient()),
        new FormColumn(ArJewelryMasterColumns.PENDANT_TYPE, LabeledInputType.SELECT, true, await getPendantTypeFromClient()),
    ];
};

const getCharmRows = async (): Promise<FormColumn[]> => {

    return [
        ...baseRows,
        new FormColumn(ArJewelryMasterColumns.CHARM_TYPE, LabeledInputType.SELECT, true, await getCharmTypeFromClient()),
    ];
};
