import {FormColumn} from "../FormColumn.ts";
import {AdminTables, LabeledInputType} from "../enum.ts";
export class AdminTableConfig {
    private baseRows: FormColumn[] = [
        new FormColumn('description', LabeledInputType.STRING, true)
    ]

    getAdminTableConfig = async (table: string): Promise<FormColumn[]> => {
        switch (table) {
            case AdminTables.CTW_RANGE:
                return this.getCtwRangeRows()
            case AdminTables.ST_TYPE:
                return this.getStTypeRows()
            case AdminTables.MATERIAL_TYPE:
                return this.getMaterialTypeRows()
            case AdminTables.ST_CUT:
                return this.getStCutRows()
            default:
                return this.baseRows
        }
    }

    private getCtwRangeRows = async (): Promise<FormColumn[]> => {
        return [
            new FormColumn('ctw', LabeledInputType.NUMBER, true),
            new FormColumn('range', LabeledInputType.STRING, true),
        ]
    }

    private getStTypeRows = async (): Promise<FormColumn[]> => {
        return [
            new FormColumn('st_type', LabeledInputType.STRING, true),
            new FormColumn('mat_code', LabeledInputType.STRING, true),
            new FormColumn('mat_color', LabeledInputType.STRING, true),
            new FormColumn('mat_color_name', LabeledInputType.STRING, true),
        ]
    }

    private getMaterialTypeRows = async (): Promise<FormColumn[]> => {
        return [
            ...this.baseRows,
            new FormColumn('mat_code', LabeledInputType.STRING, true),
            new FormColumn('mat_color', LabeledInputType.NUMBER, true),
        ]
    }

    private getStCutRows = async (): Promise<FormColumn[]> => {
        return [
            new FormColumn('cut', LabeledInputType.STRING, true),
            new FormColumn('st_table', LabeledInputType.STRING, true),
        ]
    }
}