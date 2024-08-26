import {FormColumn} from "../FormColumn.ts"
import {AdminTables, age, ArJewelryMasterColumns, gender, LabeledInputType, ProductTypeIds} from "../enum.ts";
import {Option} from "../DropdownOption.ts";
import {FactoryDAO} from "../../model/DAO/interface/FactoryDAO.ts";
import {SupabaseFactoryDAO} from "../../model/DAO/Supabase/SupabaseFactoryDAO.ts";

const daoFactory: FactoryDAO = new SupabaseFactoryDAO()
const baseDAO = daoFactory.getBaseDAO()
const stTypeDAO = daoFactory.getStTypeDAO()
const stCutDAO = daoFactory.getStCutDAO()
const materialTypeDAO = daoFactory.getMaterialTypeDAO()

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
    new FormColumn(ArJewelryMasterColumns.ST_SOURCE, LabeledInputType.SELECT, true, await baseDAO.getOptionsFromClient(AdminTables.ST_SOURCE)),
    new FormColumn(ArJewelryMasterColumns.ST_COLOR, LabeledInputType.SELECT, true, await baseDAO.getOptionsFromClient(AdminTables.ST_COLOR)),
    new FormColumn(ArJewelryMasterColumns.ST_SHAPE, LabeledInputType.SELECT, true, await baseDAO.getOptionsFromClient(AdminTables.ST_SHAPE)),
    new FormColumn(ArJewelryMasterColumns.ST_CUT, LabeledInputType.SELECT, true, await stCutDAO.getStoneCutOptionFromClient()),
    new FormColumn(ArJewelryMasterColumns.ST_HEIGHT, LabeledInputType.NUMBER, true, null, {high: 49.99, low: 0.01}),
    new FormColumn(ArJewelryMasterColumns.ST_WIDTH, LabeledInputType.NUMBER, true, null, {high: 49.99, low: 0.01}),
    new FormColumn(ArJewelryMasterColumns.ST_ORIENTATION, LabeledInputType.SELECT, true, await baseDAO.getOptionsFromClient(AdminTables.ST_ORIENTATION)),
    new FormColumn(ArJewelryMasterColumns.ST_ORIGIN, LabeledInputType.SELECT, true, await baseDAO.getOptionsFromClient(AdminTables.ST_ORIGIN)),
]


const baseRows: FormColumn[] = [
    new FormColumn(ArJewelryMasterColumns.PRODUCT_NAME, LabeledInputType.STRING, true),
    new FormColumn(ArJewelryMasterColumns.STYLE_NUMBER, LabeledInputType.NUMBER, true, null, {high: 99999, low: 0}),
    new FormColumn(ArJewelryMasterColumns.MSRP, LabeledInputType.NUMBER, true, null, {high: Number.MAX_SAFE_INTEGER, low: 0}),
    new FormColumn(ArJewelryMasterColumns.COST, LabeledInputType.NUMBER, true, null, {high: Number.MAX_SAFE_INTEGER, low: 0}),
    new FormColumn(ArJewelryMasterColumns.ST_TYPE, LabeledInputType.SELECT, false, await stTypeDAO.getStoneTypesOptionsFromClient()),
    ...stoneTypeRows,
    new FormColumn(ArJewelryMasterColumns.AR_STYLE, LabeledInputType.SELECT, true, await baseDAO.getOptionsFromClient(AdminTables.AR_STYLE)),
    new FormColumn(ArJewelryMasterColumns.AGE, LabeledInputType.SELECT, true, [{description: age.ADULT}]),
    new FormColumn(ArJewelryMasterColumns.GENDER, LabeledInputType.SELECT, true, genderOptions),
    new FormColumn(ArJewelryMasterColumns.RETURNABLE, LabeledInputType.SELECT, true, yesNoOption),
    new FormColumn(ArJewelryMasterColumns.ENGRAVABLE, LabeledInputType.SELECT, true, yesNoOption),
    new FormColumn(ArJewelryMasterColumns.MADE_TO_ORDER, LabeledInputType.SELECT, true, yesNoOption),
    new FormColumn(ArJewelryMasterColumns.ADJUSTABLE, LabeledInputType.SELECT, true, yesNoOption),
    new FormColumn(ArJewelryMasterColumns.MATERIAL_TYPE, LabeledInputType.SELECT, true, await materialTypeDAO.getMetalTypeOptionsFromClient()),
    new FormColumn(ArJewelryMasterColumns.METAL_FINISH, LabeledInputType.SELECT, true, await baseDAO.getOptionsFromClient(AdminTables.METAL_FINISH)),
    new FormColumn(ArJewelryMasterColumns.METAL_TEXTURE, LabeledInputType.SELECT, true, await baseDAO.getOptionsFromClient(AdminTables.METAL_TEXTURE)),
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
            new FormColumn(ArJewelryMasterColumns.ST_TYPE, LabeledInputType.SELECT, false, await stTypeDAO.getStoneTypesOptionsFromClient()),
            new FormColumn(ArJewelryMasterColumns.ST_SOURCE, LabeledInputType.SELECT, false, await baseDAO.getOptionsFromClient(AdminTables.ST_SOURCE)),
            new FormColumn(ArJewelryMasterColumns.ST_COLOR, LabeledInputType.SELECT, false, await baseDAO.getOptionsFromClient(AdminTables.ST_COLOR)),
            new FormColumn(ArJewelryMasterColumns.ST_SHAPE, LabeledInputType.SELECT, false, await baseDAO.getOptionsFromClient(AdminTables.ST_SHAPE)),
            new FormColumn(ArJewelryMasterColumns.ST_CUT, LabeledInputType.SELECT, false, await stCutDAO.getStoneCutOptionFromClient()),
            new FormColumn(ArJewelryMasterColumns.ST_HEIGHT, LabeledInputType.NUMBER, true, null, {high: 49.99, low: 0.01}),
            new FormColumn(ArJewelryMasterColumns.ST_WIDTH, LabeledInputType.NUMBER, true, null, {high: 49.99, low: 0.01}),
            new FormColumn(ArJewelryMasterColumns.ST_ORIENTATION, LabeledInputType.SELECT, false, await baseDAO.getOptionsFromClient(AdminTables.ST_ORIENTATION)),
            new FormColumn(ArJewelryMasterColumns.ST_ORIGIN, LabeledInputType.SELECT, false, await baseDAO.getOptionsFromClient(AdminTables.ST_ORIGIN)),
            new FormColumn(ArJewelryMasterColumns.ST_CTW, LabeledInputType.NUMBER, true, null, {high: 29, low: 0}),
            new FormColumn(ArJewelryMasterColumns.ST_COST_CT, LabeledInputType.NUMBER, false, null, {high: Number.MAX_SAFE_INTEGER, low: 0}),
            new FormColumn(ArJewelryMasterColumns.ST_CERT_TYPE, LabeledInputType.SELECT, true, await baseDAO.getOptionsFromClient(AdminTables.ST_CERT_TYPE)),
            new FormColumn(ArJewelryMasterColumns.ST_CERT_CUT, LabeledInputType.SELECT, true, await baseDAO.getOptionsFromClient(AdminTables.ST_CERT_CUT)),
            new FormColumn(ArJewelryMasterColumns.ST_CERT_COLOR, LabeledInputType.SELECT, true, await baseDAO.getOptionsFromClient(AdminTables.ST_COLOR_GRADE)),
            new FormColumn(ArJewelryMasterColumns.ST_CERT_CLARITY, LabeledInputType.SELECT, true, await baseDAO.getOptionsFromClient(AdminTables.ST_CLARITY_GRADE)),
            new FormColumn(ArJewelryMasterColumns.AR_STYLE, LabeledInputType.SELECT, true, await baseDAO.getOptionsFromClient(AdminTables.AR_STYLE)),
            new FormColumn(ArJewelryMasterColumns.AGE, LabeledInputType.SELECT, true, [{description: age.ADULT}]),
            new FormColumn(ArJewelryMasterColumns.GENDER, LabeledInputType.SELECT, true, genderOptions),
            new FormColumn(ArJewelryMasterColumns.RETURNABLE, LabeledInputType.SELECT, true, yesNoOption),
            new FormColumn(ArJewelryMasterColumns.ENGRAVABLE, LabeledInputType.SELECT, true, yesNoOption),
            new FormColumn(ArJewelryMasterColumns.MADE_TO_ORDER, LabeledInputType.SELECT, true, yesNoOption),
            new FormColumn(ArJewelryMasterColumns.ADJUSTABLE, LabeledInputType.SELECT, true, yesNoOption),
            new FormColumn(ArJewelryMasterColumns.MATERIAL_TYPE, LabeledInputType.SELECT, true, await materialTypeDAO.getMetalTypeOptionsFromClient()),
            new FormColumn(ArJewelryMasterColumns.METAL_FINISH, LabeledInputType.SELECT, true, await baseDAO.getOptionsFromClient(AdminTables.METAL_FINISH)),
            new FormColumn(ArJewelryMasterColumns.METAL_TEXTURE, LabeledInputType.SELECT, true, await baseDAO.getOptionsFromClient(AdminTables.METAL_TEXTURE)),
            new FormColumn(ArJewelryMasterColumns.BAND_STYLE, LabeledInputType.SELECT, true, await baseDAO.getOptionsFromClient(AdminTables.BAND_STYLE)),
            new FormColumn(ArJewelryMasterColumns.BAND_WIDTH, LabeledInputType.SELECT, true, await baseDAO.getOptionsFromClient(AdminTables.BAND_WIDTH)),
            new FormColumn(ArJewelryMasterColumns.SETTING, LabeledInputType.SELECT, true, await baseDAO.getOptionsFromClient(AdminTables.JEWELRY_SETTING)),
            new FormColumn(ArJewelryMasterColumns.SIDE_STONES, LabeledInputType.SELECT, true, await baseDAO.getOptionsFromClient(AdminTables.SIDE_STONES)),
            new FormColumn(ArJewelryMasterColumns.LENGTH, LabeledInputType.NUMBER, false, null, {high: Number.MAX_SAFE_INTEGER, low: 0}),
            new FormColumn(ArJewelryMasterColumns.CHAIN_TYPE, LabeledInputType.SELECT, false, await baseDAO.getOptionsFromClient(AdminTables.CHAIN_TYPE)),
            new FormColumn(ArJewelryMasterColumns.PENDANT_TYPE, LabeledInputType.SELECT, false, await baseDAO.getOptionsFromClient(AdminTables.PENDANT_TYPE)),
            new FormColumn(ArJewelryMasterColumns.EARRING_TYPE, LabeledInputType.SELECT, false, await baseDAO.getOptionsFromClient(AdminTables.EARRING_TYPE)),
            new FormColumn(ArJewelryMasterColumns.CHARM_TYPE, LabeledInputType.SELECT, false, await baseDAO.getOptionsFromClient(AdminTables.CHARM_TYPE)),
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
        new FormColumn(ArJewelryMasterColumns.BAND_STYLE, LabeledInputType.SELECT, true, await baseDAO.getOptionsFromClient(AdminTables.BAND_STYLE)),
        new FormColumn(ArJewelryMasterColumns.BAND_WIDTH, LabeledInputType.SELECT, true, await baseDAO.getOptionsFromClient(AdminTables.BAND_WIDTH)),
        new FormColumn(ArJewelryMasterColumns.SETTING, LabeledInputType.SELECT, true, await baseDAO.getOptionsFromClient(AdminTables.JEWELRY_SETTING)),
        new FormColumn(ArJewelryMasterColumns.SIDE_STONES, LabeledInputType.SELECT, true, await baseDAO.getOptionsFromClient(AdminTables.SIDE_STONES)),

    ];
};

const getRingRows = async (): Promise<FormColumn[]> => {

    return [
        ...baseRows,
        new FormColumn(ArJewelryMasterColumns.BAND_STYLE, LabeledInputType.SELECT, true, await baseDAO.getOptionsFromClient(AdminTables.BAND_STYLE)),
        new FormColumn(ArJewelryMasterColumns.BAND_WIDTH, LabeledInputType.SELECT, true, await baseDAO.getOptionsFromClient(AdminTables.BAND_WIDTH)),
        new FormColumn(ArJewelryMasterColumns.SETTING, LabeledInputType.SELECT, true, await baseDAO.getOptionsFromClient(AdminTables.JEWELRY_SETTING)),
        new FormColumn(ArJewelryMasterColumns.SIDE_STONES, LabeledInputType.SELECT, true, await baseDAO.getOptionsFromClient(AdminTables.SIDE_STONES)),

    ];
};

const getNecklaceRows = async (): Promise<FormColumn[]> => {

    return [
        ...baseRows,
        new FormColumn(ArJewelryMasterColumns.LENGTH, LabeledInputType.NUMBER, true),
        new FormColumn(ArJewelryMasterColumns.CHAIN_TYPE, LabeledInputType.SELECT, true, await baseDAO.getOptionsFromClient(AdminTables.CHAIN_TYPE)),
        new FormColumn(ArJewelryMasterColumns.PENDANT_TYPE, LabeledInputType.SELECT, true, await baseDAO.getOptionsFromClient(AdminTables.PENDANT_TYPE)),
    ];
};

const getEarringRows = async (): Promise<FormColumn[]> => {

    return [
        ...baseRows,
        new FormColumn(ArJewelryMasterColumns.LENGTH, LabeledInputType.NUMBER, false),
        new FormColumn(ArJewelryMasterColumns.EARRING_TYPE, LabeledInputType.SELECT, false, await baseDAO.getOptionsFromClient(AdminTables.EARRING_TYPE)),
    ];
};

const getBraceletAnkletRows = async (): Promise<FormColumn[]> => {

    return [
        ...baseRows,
        new FormColumn(ArJewelryMasterColumns.LENGTH, LabeledInputType.NUMBER, true),
        new FormColumn(ArJewelryMasterColumns.CHAIN_TYPE, LabeledInputType.SELECT, true, await baseDAO.getOptionsFromClient(AdminTables.CHAIN_TYPE)),
        new FormColumn(ArJewelryMasterColumns.PENDANT_TYPE, LabeledInputType.SELECT, true, await baseDAO.getOptionsFromClient(AdminTables.PENDANT_TYPE)),
    ];
};

const getCharmRows = async (): Promise<FormColumn[]> => {

    return [
        ...baseRows,
        new FormColumn(ArJewelryMasterColumns.CHARM_TYPE, LabeledInputType.SELECT, true, await baseDAO.getOptionsFromClient(AdminTables.CHARM_TYPE)),
    ];
};
