import {Option} from "./DropdownOption.ts";
import {ArStoneMasterColumns} from "./enum.ts";
import {DefaultViews} from "./DefaultViews.ts";

export class DefaultStoneViews implements DefaultViews{

    private defaultView = [
        {description: ArStoneMasterColumns.SKU},
        {description: ArStoneMasterColumns.PRODUCT_NAME},
        {description: ArStoneMasterColumns.MSRP},
        {description: ArStoneMasterColumns.COST},
        {description: ArStoneMasterColumns.QUANTITY},
        {description: ArStoneMasterColumns.DATE},
    ]

    private baseRows: Option[] = [
        {description: ArStoneMasterColumns.SKU},
        {description: ArStoneMasterColumns.PRODUCT_NAME},
        {description: ArStoneMasterColumns.STYLE_NUMBER},
        {description: ArStoneMasterColumns.MSRP},
        {description: ArStoneMasterColumns.COST},
        {description: ArStoneMasterColumns.ST_TYPE},
        {description: ArStoneMasterColumns.ST_SOURCE},
        {description: ArStoneMasterColumns.ST_COLOR},
        {description: ArStoneMasterColumns.ST_SHAPE},
        {description: ArStoneMasterColumns.ST_CUT},
        {description: ArStoneMasterColumns.ST_HEIGHT},
        {description: ArStoneMasterColumns.ST_WIDTH},
        {description: ArStoneMasterColumns.ST_ORIENTATION},
        {description: ArStoneMasterColumns.ST_ORIGIN},
        {description: ArStoneMasterColumns.ST_CTW},
        {description: ArStoneMasterColumns.ST_COST},
        {description: ArStoneMasterColumns.ST_CERT_TYPE},
        {description: ArStoneMasterColumns.ST_CERT_COLOR},
        {description: ArStoneMasterColumns.ST_CERT_CLARITY},
        {description: ArStoneMasterColumns.DATE}
    ]

    private rowOptions = {
        'Default': this.defaultView,
        'Engagement Loose Stones': this.baseRows,
        'Other Loose Stones': this.baseRows
    }

    getDefaultRows() {
        return this.rowOptions
    }

}