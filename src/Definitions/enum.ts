import {TablesInsert} from "./definitions.ts";

export enum age {
    ADULT = "Adult"
}

export enum Status {
    ACTIVE = "active",
    ARCHIVED = "archived"
}

export enum gender {
    UNISEX = "unisex",
    MALE = "men",
    FEMALE = "women"
}

export enum ProductTypes {
    ENG = "Engagement Rings",
    WED = "Wedding Bands",
    FJR = "Rings",
    NCK = "Necklaces",
    EAR = "Earrings",
    BRA = "Bracelets / Anklets",
    CHM = "Charms",
    ACC = "Accessories",
    GFC = "Gift Cards",
    FEE = "Service Fees",
    CON = "Consultations",
    OTH = "Other"
}

export enum ArJewelryMasterColumns {
    TYPE = "Type",
    STYLE_NUMBER = "Style Number",
    PRODUCT_NAME = "Product Name",
    MSRP = "MSRP",
    COST = "Cost",
    ST_TYPE = "ST Type",
    ST_CTW = "ST CTW",
    ST_CERT_TYPE = "ST Cert Type",
    ST_CERT_COLOR = "ST Cert Color",
    ST_CERT_CLARITY = "ST Cert Clarity",
    AR_STYLE = "AR Style",
    AGE = "Age",
    GENDER = "Gender",
    RETURNABLE = "Returnable",
    ENGRAVABLE = "Engravable",
    MADE_TO_ORDER = "Made to Order",
    ADJUSTABLE = "Adjustable",
    METAL_TYPE = "Metal Type",
    METAL_FINISH = "Metal Finish",
    METAL_TEXTURE = "Metal Texture",
    BAND_STYLE = "Band Style",
    BAND_WIDTH = "Band Width",
    SETTING = "Setting",
    SIDE_STONES = "Side Stones"
}

export const MapFormDataToDatabaseColumns: { [key in ArJewelryMasterColumns]: keyof TablesInsert<'ar_jewelry_master'> } = {
    [ArJewelryMasterColumns.STYLE_NUMBER]: 'style_number',
    [ArJewelryMasterColumns.PRODUCT_NAME]: 'prod_name',
    [ArJewelryMasterColumns.MSRP]: 'msrp',
    [ArJewelryMasterColumns.COST]: 'cost',
    [ArJewelryMasterColumns.ST_TYPE]: 'st_type',
    [ArJewelryMasterColumns.ST_CTW]: 'st_ctw',
    [ArJewelryMasterColumns.ST_CERT_TYPE]: 'st_cert_type',
    [ArJewelryMasterColumns.ST_CERT_COLOR]: 'st_cert_color',
    [ArJewelryMasterColumns.ST_CERT_CLARITY]: 'st_cert_clarity',
    [ArJewelryMasterColumns.AR_STYLE]: 'ar_style',
    [ArJewelryMasterColumns.AGE]: 'age',
    [ArJewelryMasterColumns.GENDER]: 'gender',
    [ArJewelryMasterColumns.RETURNABLE]: 'returnable',
    [ArJewelryMasterColumns.ENGRAVABLE]: 'engravable',
    [ArJewelryMasterColumns.MADE_TO_ORDER]: 'made_to_order',
    [ArJewelryMasterColumns.ADJUSTABLE]: 'adjustable',
    [ArJewelryMasterColumns.METAL_TYPE]: 'material_type_id',
    [ArJewelryMasterColumns.METAL_FINISH]: 'metal_finish',
    [ArJewelryMasterColumns.METAL_TEXTURE]: 'metal_texture',
    [ArJewelryMasterColumns.BAND_STYLE]: 'band_style',
    [ArJewelryMasterColumns.BAND_WIDTH]: 'band_width',
    [ArJewelryMasterColumns.SETTING]: 'setting',
    [ArJewelryMasterColumns.SIDE_STONES]: 'side_stones'
};
