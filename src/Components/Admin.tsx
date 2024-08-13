import {useEffect, useState} from "react";
import {Error} from "./Util/Error.tsx";
import {ArLoader} from "./Util/Loading.tsx";
import {getStylesFromClient} from "../model/queries/ArStyleDAO.ts";
import {Option} from "../Definitions/DropdownOption.ts";
import {AdminTable} from "./Util/AdminTable.tsx";
import {getBandStyleFromClient} from "../model/queries/BandStyleDAO.ts";
import {getBandWidthFromClient} from "../model/queries/BandWidthDAO.ts";
import {AdminTables} from "../Definitions/enum.ts";
import {getChainTypesFromClient} from "../model/queries/ChainTypeDAO.ts";
import {getCharmTypeFromClient} from "../model/queries/CharmTypeDAO.ts";
import {getEarringTypeFromClient} from "../model/queries/EarringTypeDAO.ts";
import {getSettingsFromClient} from "../model/queries/JewelrySettingDAO.ts";
import {getMetalTypesFromClient} from "../model/queries/MetalTypeDAO.ts";
import {getMetalFinishesClient} from "../model/queries/MetalFinishDAO.ts";
import {getMetalTexturesFromClient} from "../model/queries/MetalTextureDAO.ts";
import {getPendantTypeFromClient} from "../model/queries/PendantTypeDAO.ts";
import {getProductTypesFromClient} from "../model/queries/ProductTypeDAO.ts";
import {getSideStonesFromClient} from "../model/queries/SideStonesDAO.ts";
import {getStCertCutFromClient} from "../model/queries/STCertCutDAO.ts";
import {getCertClarityFromClient} from "../model/queries/StCertClarityDAO.ts";
import {getStoneColorFromClient} from "../model/queries/StoneColorDAO.ts";
import {getStoneCutFromClient} from "../model/queries/StoneCutDAO.ts";
import {getStoneOrientationFromClient} from "../model/queries/StoneOrientationDAO.ts";
import {getStoneOriginFromClient} from "../model/queries/StoneOriginDAO.ts";
import {getStoneProductTypesFromClient} from "../model/queries/StoneProductTypeDAO.ts";
import {getStoneShapeFromClient} from "../model/queries/StoneShapeDAO.ts";
import {getStSourceFromClient} from "../model/queries/StSourceDAO.ts";
import {getStoneTypesFromClient} from "../model/queries/StoneTypeDAO.ts";
import {AdminRow} from "./Util/AdminRow.tsx";
import {deleteOption} from "../model/queries/BaseDAO.ts";

const Admin = () => {
    const [tableData, setTableData] = useState<Option[]>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedTable, setSelectedTable] = useState<string>(AdminTables.AR_STYLE);
    const [nonce, setNonce] = useState(1)
    const fetchFunctions: Record<AdminTables, () => Promise<Option[] | undefined>> = {
        [AdminTables.AR_STYLE]: getStylesFromClient,
        [AdminTables.BAND_STYLE]: getBandStyleFromClient,
        [AdminTables.BAND_WIDTH]: getBandWidthFromClient,
        [AdminTables.CHAIN_TYPE]: getChainTypesFromClient,
        [AdminTables.CHARM_TYPE]: getCharmTypeFromClient,
        [AdminTables.CTW_RANGE]: getStylesFromClient,
        [AdminTables.EARRING_TYPE]: getEarringTypeFromClient,
        [AdminTables.JEWELRY_SETTING]: getSettingsFromClient,
        [AdminTables.LENGTH]: getStylesFromClient,
        [AdminTables.MATERIAL_TYPE]: getMetalTypesFromClient,
        [AdminTables.METAL_FINISH]: getMetalFinishesClient,
        [AdminTables.METAL_TEXTURE]: getMetalTexturesFromClient,
        [AdminTables.PENDANT_TYPE]: getPendantTypeFromClient,
        [AdminTables.PRODUCT_TYPE]: getProductTypesFromClient,
        [AdminTables.SIDE_STONES]: getSideStonesFromClient,
        [AdminTables.ST_CERT_CUT]: getStCertCutFromClient,
        [AdminTables.ST_CERT_TYPE]: getStylesFromClient,
        [AdminTables.ST_CLARITY_GRADE]: getCertClarityFromClient,
        [AdminTables.ST_COLOR]: getStoneColorFromClient,
        [AdminTables.ST_COLOR_GRADE]: getStylesFromClient,
        [AdminTables.ST_CUT]: getStoneCutFromClient,
        [AdminTables.ST_ORIENTATION]: getStoneOrientationFromClient,
        [AdminTables.ST_ORIGIN]: getStoneOriginFromClient,
        [AdminTables.ST_PRICE_RANGE]: getStylesFromClient,
        [AdminTables.ST_PRODUCT_TYPE]: getStoneProductTypesFromClient,
        [AdminTables.ST_SHAPE]: getStoneShapeFromClient,
        [AdminTables.ST_SOURCE]: getStSourceFromClient,
        [AdminTables.ST_TYPE]: getStoneTypesFromClient,
    };
    const columns = ["id", "description"];

    const fetchData = async (table: string) => {
        setIsLoading(true);
        try {
            const fetchFunction = fetchFunctions[table as AdminTables];
            const data = fetchFunction ? await fetchFunction() : [];
            if (data) {
                setTableData(data);
            }
        } catch (error) {
            setError('Error fetching items from the database: ' + (error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(selectedTable).then();
    }, [selectedTable, nonce]);

    if (error) {
        return <Error message={error ?? ""} />;
    }

    if (isLoading) {
        return <ArLoader />;
    }

    const onEdit = async (item: Option) => {
        console.log(item)
        setNonce(nonce + 1)
    }

    const onDelete = async (item: Option) => {
        await deleteOption(selectedTable.toLowerCase().replace(" ", "_"), item)
        setNonce(nonce + 1)
    }

    return (
        <div className="flex h-screen">
            <div className="w-1/4 bg-gray-200 overflow-y-scroll p-4">
                <ul>
                    {Object.values(AdminTables).map((table, index) => (
                        <li
                            key={index}
                            className={`cursor-pointer p-2 hover:bg-gray-300 ${
                                table === selectedTable ? 'bg-gray-300 font-bold' : ''
                            }`}
                            onClick={() => setSelectedTable(table)}
                        >
                            {table}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="w-3/4 p-4">
                <AdminTable
                    title={selectedTable}
                    columns={columns}
                    data={tableData}
                    style={'w-full'}
                >
                    {(item, columns) => <AdminRow item={item} columns={columns} onEdit={onEdit} onDelete={onDelete}/>}
                </AdminTable>
            </div>
        </div>
    );
};
export default Admin;