import {FormColumn} from "../FormColumn.ts"
import {ArJewelryMasterColumns, LabeledInputType, StoneProductTypeIds} from "../enum.ts";
import {getStoneTypesFromClient} from "../../model/queries/StoneTypeDAO.ts";
import {getCertTypesFromClient} from "../../model/queries/STCertTypeDAO.ts";
import {getColorGradeFromClient} from "../../model/queries/StColorGradeDAO.ts";
import {getCertClarityFromClient} from "../../model/queries/StCertClarityDAO.ts";
import {getStSourceFromClient} from "../../model/queries/StSourceDAO.ts";
import {getStoneColorFromClient} from "../../model/queries/StoneColorDAO.ts";
import {getStoneShapeFromClient} from "../../model/queries/StoneShapeDAO.ts";
import {getStoneCutFromClient} from "../../model/queries/StoneCutDAO.ts";
import {getStoneOrientationFromClient} from "../../model/queries/StoneOrientationDAO.ts";
import {getStoneOriginFromClient} from "../../model/queries/StoneOriginDAO.ts";
import {getStCertCutFromClient} from "../../model/queries/STCertCutDAO.ts";


const baseRows: FormColumn[] = [
    new FormColumn(ArJewelryMasterColumns.MSRP, LabeledInputType.NUMBER, true),
    new FormColumn(ArJewelryMasterColumns.COST, LabeledInputType.NUMBER, true),
    new FormColumn(ArJewelryMasterColumns.ST_TYPE, LabeledInputType.SELECT, true, await getStoneTypesFromClient()),
    new FormColumn(ArJewelryMasterColumns.ST_SOURCE, LabeledInputType.SELECT, true, await getStSourceFromClient()),
    new FormColumn(ArJewelryMasterColumns.ST_COLOR, LabeledInputType.SELECT, true, await getStoneColorFromClient()),
    new FormColumn(ArJewelryMasterColumns.ST_SHAPE, LabeledInputType.SELECT, true, await getStoneShapeFromClient()),
    new FormColumn(ArJewelryMasterColumns.ST_CUT, LabeledInputType.SELECT, true, await getStoneCutFromClient()),
    new FormColumn(ArJewelryMasterColumns.ST_HEIGHT, LabeledInputType.NUMBER, true),
    new FormColumn(ArJewelryMasterColumns.ST_WIDTH, LabeledInputType.NUMBER, true),
    new FormColumn(ArJewelryMasterColumns.ST_ORIENTATION, LabeledInputType.SELECT, true, await getStoneOrientationFromClient()),
    new FormColumn(ArJewelryMasterColumns.ST_ORIGIN, LabeledInputType.SELECT, true, await getStoneOriginFromClient()),
    new FormColumn(ArJewelryMasterColumns.ST_CTW, LabeledInputType.NUMBER, true),
    new FormColumn(ArJewelryMasterColumns.ST_COST_CT, LabeledInputType.NUMBER, true),
    new FormColumn(ArJewelryMasterColumns.ST_CERT_TYPE, LabeledInputType.SELECT, true, await getCertTypesFromClient()),
    new FormColumn(ArJewelryMasterColumns.ST_CERT_CUT, LabeledInputType.SELECT, true, await getStCertCutFromClient()),
    new FormColumn(ArJewelryMasterColumns.ST_CERT_COLOR, LabeledInputType.SELECT, true, await getColorGradeFromClient()),
    new FormColumn(ArJewelryMasterColumns.ST_CERT_CLARITY, LabeledInputType.SELECT, true, await getCertClarityFromClient())
]

export const getStoneFormConfig = async (type: string): Promise<FormColumn[]> => {
    switch (type) {
        case StoneProductTypeIds.ELS:
            return getEngagementStoneRows()
        case StoneProductTypeIds.OLS:
            return getOtherLooseStoneRows()
        default:
            return []
    }
}

const getEngagementStoneRows = async (): Promise<FormColumn[]> => {
    return baseRows
}

const getOtherLooseStoneRows = async (): Promise<FormColumn[]> => {
    return baseRows
}
