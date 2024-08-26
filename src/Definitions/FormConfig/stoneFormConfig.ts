import {FormColumn} from "../FormColumn.ts"
import {AdminTables, ArStoneMasterColumns, LabeledInputType, StoneProductTypeIds} from "../enum.ts";
import {FactoryDAO} from "../../model/DAO/interface/FactoryDAO.ts";
import {SupabaseFactoryDAO} from "../../model/DAO/Supabase/SupabaseFactoryDAO.ts";

const daoFactory: FactoryDAO = new SupabaseFactoryDAO()
const baseDAO = daoFactory.getBaseDAO()
const stTypeDAO = daoFactory.getStTypeDAO()
const stCutDAO = daoFactory.getStCutDAO()

const baseRows: FormColumn[] = [
    new FormColumn(ArStoneMasterColumns.MSRP, LabeledInputType.NUMBER, true, null, {high: Number.MAX_SAFE_INTEGER, low: 0}),
    new FormColumn(ArStoneMasterColumns.COST, LabeledInputType.NUMBER, true, null, {high: Number.MAX_SAFE_INTEGER, low: 0}),
    new FormColumn(ArStoneMasterColumns.ST_TYPE, LabeledInputType.SELECT, true, await stTypeDAO.getStoneTypesOptionsFromClient()),
    new FormColumn(ArStoneMasterColumns.ST_SOURCE, LabeledInputType.SELECT, true, await baseDAO.getOptionsFromClient(AdminTables.ST_SOURCE)),
    new FormColumn(ArStoneMasterColumns.ST_COLOR, LabeledInputType.SELECT, true, await baseDAO.getOptionsFromClient(AdminTables.ST_COLOR)),
    new FormColumn(ArStoneMasterColumns.ST_SHAPE, LabeledInputType.SELECT, true, await baseDAO.getOptionsFromClient(AdminTables.ST_SHAPE)),
    new FormColumn(ArStoneMasterColumns.ST_CUT, LabeledInputType.SELECT, true, await stCutDAO.getStoneCutOptionFromClient()),
    new FormColumn(ArStoneMasterColumns.ST_HEIGHT, LabeledInputType.NUMBER, true, null, {high: 49.99, low: 0.01}),
    new FormColumn(ArStoneMasterColumns.ST_WIDTH, LabeledInputType.NUMBER, true, null, {high: 49.99, low: 0.01}),
    new FormColumn(ArStoneMasterColumns.ST_ORIENTATION, LabeledInputType.SELECT, true, await baseDAO.getOptionsFromClient(AdminTables.ST_ORIENTATION)),
    new FormColumn(ArStoneMasterColumns.ST_ORIGIN, LabeledInputType.SELECT, true, await baseDAO.getOptionsFromClient(AdminTables.ST_ORIGIN)),
    new FormColumn(ArStoneMasterColumns.ST_CTW, LabeledInputType.NUMBER, true, null, {high: 29, low: 0}),
    new FormColumn(ArStoneMasterColumns.ST_COST, LabeledInputType.NUMBER, true, null, {high: Number.MAX_SAFE_INTEGER, low: 0}),
    new FormColumn(ArStoneMasterColumns.ST_CERT_TYPE, LabeledInputType.SELECT, true, await baseDAO.getOptionsFromClient(AdminTables.ST_CERT_TYPE)),
    new FormColumn(ArStoneMasterColumns.ST_CERT_CUT, LabeledInputType.SELECT, true, await baseDAO.getOptionsFromClient(AdminTables.ST_CERT_CUT)),
    new FormColumn(ArStoneMasterColumns.ST_CERT_COLOR, LabeledInputType.SELECT, true, await baseDAO.getOptionsFromClient(AdminTables.ST_COLOR_GRADE)),
    // new FormColumn(ArStoneMasterColumns.ST_CERT_CLARITY, LabeledInputType.SELECT, true, await getCertClarityFromClient())
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
