import {FormColumn} from "../FormColumn.ts"
import {ArStoneMasterColumns, LabeledInputType, StoneProductTypeIds} from "../enum.ts";
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
    new FormColumn(ArStoneMasterColumns.MSRP, LabeledInputType.NUMBER, true, null, {high: Number.MAX_SAFE_INTEGER, low: 0}),
    new FormColumn(ArStoneMasterColumns.COST, LabeledInputType.NUMBER, true, null, {high: Number.MAX_SAFE_INTEGER, low: 0}),
    new FormColumn(ArStoneMasterColumns.ST_TYPE, LabeledInputType.SELECT, true, await getStoneTypesFromClient()),
    new FormColumn(ArStoneMasterColumns.ST_SOURCE, LabeledInputType.SELECT, true, await getStSourceFromClient()),
    new FormColumn(ArStoneMasterColumns.ST_COLOR, LabeledInputType.SELECT, true, await getStoneColorFromClient()),
    new FormColumn(ArStoneMasterColumns.ST_SHAPE, LabeledInputType.SELECT, true, await getStoneShapeFromClient()),
    new FormColumn(ArStoneMasterColumns.ST_CUT, LabeledInputType.SELECT, true, await getStoneCutFromClient()),
    new FormColumn(ArStoneMasterColumns.ST_HEIGHT, LabeledInputType.NUMBER, true, null, {high: 49.99, low: 0.01}),
    new FormColumn(ArStoneMasterColumns.ST_WIDTH, LabeledInputType.NUMBER, true, null, {high: 49.99, low: 0.01}),
    new FormColumn(ArStoneMasterColumns.ST_ORIENTATION, LabeledInputType.SELECT, true, await getStoneOrientationFromClient()),
    new FormColumn(ArStoneMasterColumns.ST_ORIGIN, LabeledInputType.SELECT, true, await getStoneOriginFromClient()),
    new FormColumn(ArStoneMasterColumns.ST_CTW, LabeledInputType.NUMBER, true, null, {high: 29, low: 0}),
    new FormColumn(ArStoneMasterColumns.ST_COST, LabeledInputType.NUMBER, true, null, {high: Number.MAX_SAFE_INTEGER, low: 0}),
    new FormColumn(ArStoneMasterColumns.ST_CERT_TYPE, LabeledInputType.SELECT, true, await getCertTypesFromClient()),
    new FormColumn(ArStoneMasterColumns.ST_CERT_CUT, LabeledInputType.SELECT, true, await getStCertCutFromClient()),
    new FormColumn(ArStoneMasterColumns.ST_CERT_COLOR, LabeledInputType.SELECT, true, await getColorGradeFromClient()),
    new FormColumn(ArStoneMasterColumns.ST_CERT_CLARITY, LabeledInputType.SELECT, true, await getCertClarityFromClient())
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
