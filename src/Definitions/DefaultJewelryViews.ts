import {ArJewelryMasterColumns} from "./enum.ts";
import {Option} from "./DropdownOption.ts";
import {DefaultViews} from "./DefaultViews.ts";

export class DefaultJewelryViews implements DefaultViews {

    private defaultView = [
        {description: ArJewelryMasterColumns.SKU},
        {description: ArJewelryMasterColumns.PRODUCT_NAME},
        {description: ArJewelryMasterColumns.AR_STYLE},
        {description: ArJewelryMasterColumns.MSRP},
        {description: ArJewelryMasterColumns.COST},
        {description: ArJewelryMasterColumns.DATE},
        {description: ArJewelryMasterColumns.STATUS}
    ]

    private baseRows: Option[] = [
        {description: ArJewelryMasterColumns.SKU},
        {description: ArJewelryMasterColumns.PRODUCT_NAME},
        {description: ArJewelryMasterColumns.STYLE_NUMBER},
        {description: ArJewelryMasterColumns.MSRP},
        {description: ArJewelryMasterColumns.COST},
        {description: ArJewelryMasterColumns.AR_STYLE},
        {description: ArJewelryMasterColumns.AGE},
        {description: ArJewelryMasterColumns.GENDER},
        {description: ArJewelryMasterColumns.RETURNABLE},
        {description: ArJewelryMasterColumns.ENGRAVABLE},
        {description: ArJewelryMasterColumns.MADE_TO_ORDER},
        {description: ArJewelryMasterColumns.ADJUSTABLE},
        {description: ArJewelryMasterColumns.MATERIAL_TYPE},
        {description: ArJewelryMasterColumns.METAL_FINISH},
        {description: ArJewelryMasterColumns.METAL_TEXTURE},
        {description: ArJewelryMasterColumns.DATE}
    ]

    private weddingBandRows: Option[] = [
        ...this.baseRows,
        {description: ArJewelryMasterColumns.BAND_STYLE},
        {description: ArJewelryMasterColumns.BAND_WIDTH},
        {description: ArJewelryMasterColumns.SETTING},
        {description: ArJewelryMasterColumns.SIDE_STONES}
    ]

    private ringRows: Option[] = [
        ...this.baseRows,
        {description: ArJewelryMasterColumns.BAND_STYLE},
        {description: ArJewelryMasterColumns.BAND_WIDTH},
        {description: ArJewelryMasterColumns.SETTING},
        {description: ArJewelryMasterColumns.SIDE_STONES}
    ]

    private necklaceRows: Option[] = [
        ...this.baseRows,
        {description: ArJewelryMasterColumns.LENGTH},
        {description: ArJewelryMasterColumns.CHAIN_TYPE},
        {description: ArJewelryMasterColumns.PENDANT_TYPE}
    ]

    private earringRows: Option[] = [
        ...this.baseRows,
        {description: ArJewelryMasterColumns.LENGTH},
        {description: ArJewelryMasterColumns.EARRING_TYPE}
    ]

    private braceletAnkletRows: Option[] = [
        ...this.baseRows,
        {description: ArJewelryMasterColumns.LENGTH},
        {description: ArJewelryMasterColumns.CHAIN_TYPE},
        {description: ArJewelryMasterColumns.PENDANT_TYPE}
    ]

    private charmRows: Option[] = [
        ...this.baseRows,
        {description: ArJewelryMasterColumns.CHARM_TYPE}
    ]

    private rowOptions = {
        'Default': this.defaultView,
        'Wedding Ring': this.weddingBandRows,
        'Earring': this.earringRows,
        'Charm': this.charmRows,
        'Necklace': this.necklaceRows,
        'Bracelet/Anklet': this.braceletAnkletRows,
        'Ring': this.ringRows,
        'Other': this.baseRows
    }


    getDefaultJewelryRowViews() {
        return this.rowOptions
    }

}