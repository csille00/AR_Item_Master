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

export enum ProductTypeIds {
    ENG = "ENG",
    WED = "WED",
    FJR = "FJR",
    NCK = "NCK",
    EAR = "EAR",
    BRA = "BRA",
    CHM = "CHM",
    ACC = "ACC",
    GFC = "GFC",
    FEE = "FEE",
    CON = "CON",
    OTH = "OTH"
}

export enum ArJewelryMasterColumns {
    SERIAL_NUMBER = "Serial Number",
    TYPE = "Type",
    SKU = "SKU-Number",
    STYLE_NUMBER = "Style Number",
    PRODUCT_NAME = "Product Name",
    MSRP = "MSRP",
    COST = "Cost",
    ST_TYPE = "ST Type",
    ST_SOURCE = "ST Source",
    ST_COLOR = "ST Color",
    ST_SHAPE = "ST Shape",
    ST_HEIGHT = "ST Height",
    ST_WIDTH = "ST Width",
    ST_ORIENTATION = "ST Orientation",
    ST_ORIGIN = "ST Origin",
    ST_CTW = "ST CTW",
    ST_COST_CT = "ST Cost/CT",
    ST_CERT_NUMBER = "ST Cert #",
    ST_CERT_CUT = "ST Cert Cut",
    ST_CUT = "ST Cut",
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
    SIDE_STONES = "Side Stones",
    LENGTH = "Length",
    CHAIN_TYPE = "Chain Type",
    PENDANT_TYPE = "Pendant Type",
    EARRING_TYPE = "Earring Type",
    CHARM_TYPE = "Charm Type",
    REPAIR_UPGRADE = "Repair/ Upgrade",
    CONFIGURATOR = "Configurator",
    MULTI_TEXTURE = "Multi-Texture",
    MULTI_FINISH = "Multi-Finish",
    BUNDLE = "Bundle",
    STATUS = "Status",
    DATE = "Date",
    ID = "ID",
    VARIANT_ID = "Variant ID",
    WEIGHT = "Weight",
}

export const MapFormDataToDatabaseColumns: { [key in ArJewelryMasterColumns]: keyof TablesInsert<'ar_jewelry_master'> } = {
    [ArJewelryMasterColumns.SERIAL_NUMBER]: 'serial_number',
    [ArJewelryMasterColumns.STYLE_NUMBER]: 'style_number',
    [ArJewelryMasterColumns.TYPE]: 'prod_code',
    [ArJewelryMasterColumns.SKU]: 'sku_number',
    [ArJewelryMasterColumns.PRODUCT_NAME]: 'prod_name',
    [ArJewelryMasterColumns.MSRP]: 'msrp',
    [ArJewelryMasterColumns.COST]: 'cost',
    [ArJewelryMasterColumns.ST_TYPE]: 'st_type',
    [ArJewelryMasterColumns.ST_SOURCE]: 'st_source',
    [ArJewelryMasterColumns.ST_COLOR]: 'st_color',
    [ArJewelryMasterColumns.ST_SHAPE]: 'st_shape',
    [ArJewelryMasterColumns.ST_HEIGHT]: 'st_height',
    [ArJewelryMasterColumns.ST_WIDTH]: 'st_width',
    [ArJewelryMasterColumns.ST_ORIENTATION]: 'st_orientation',
    [ArJewelryMasterColumns.ST_ORIGIN]: 'st_origin',
    [ArJewelryMasterColumns.ST_CUT]: 'st_cut',
    [ArJewelryMasterColumns.ST_CTW]: 'st_ctw',
    [ArJewelryMasterColumns.ST_COST_CT]: 'st_cost',
    [ArJewelryMasterColumns.ST_CERT_TYPE]: 'st_cert_type',
    [ArJewelryMasterColumns.ST_CERT_NUMBER]: 'st_cert_type', //TODO: Fix this
    [ArJewelryMasterColumns.ST_CERT_CUT]: 'st_cert_cut', //TODO: Fix this
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
    [ArJewelryMasterColumns.SIDE_STONES]: 'side_stones',
    [ArJewelryMasterColumns.LENGTH]: 'length',
    [ArJewelryMasterColumns.CHAIN_TYPE]: 'chain_type',
    [ArJewelryMasterColumns.PENDANT_TYPE]: 'pendant_type',
    [ArJewelryMasterColumns.EARRING_TYPE]: 'earring_type',
    [ArJewelryMasterColumns.CHARM_TYPE]: 'charm_type',
    [ArJewelryMasterColumns.REPAIR_UPGRADE]: 'repair_upgrade',
    [ArJewelryMasterColumns.CONFIGURATOR]: 'configurator',
    [ArJewelryMasterColumns.MULTI_TEXTURE]: 'multi_texture',
    [ArJewelryMasterColumns.MULTI_FINISH]: 'multi_finish',
    [ArJewelryMasterColumns.BUNDLE]: 'bundle',
    [ArJewelryMasterColumns.STATUS]: 'status',
    [ArJewelryMasterColumns.DATE]: 'date',
    [ArJewelryMasterColumns.ID]: 'id',
    [ArJewelryMasterColumns.VARIANT_ID]: 'variant_id',
    [ArJewelryMasterColumns.WEIGHT]: 'weight',
};

export enum LabeledInputType {
    STRING = "text",
    NUMBER = "number",
    DATETIME = "datetime-local",
    SELECT = "select"  // Add a type for select
}