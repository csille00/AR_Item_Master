import {useEffect, useState} from "react";
import {Error} from "../Util/Error.tsx";
import {ArLoader} from "../Util/Loading.tsx";
import {getStylesFromClient} from "../../../model/queries/ArStyleDAO.ts";
import {Option} from "../../../Definitions/DropdownOption.ts";
import {AdminTable} from "./AdminTable.tsx";
import {getBandStyleFromClient} from "../../../model/queries/BandStyleDAO.ts";
import {getBandWidthFromClient} from "../../../model/queries/BandWidthDAO.ts";
import {AdminTables} from "../../../Definitions/enum.ts";
import {getChainTypesFromClient} from "../../../model/queries/ChainTypeDAO.ts";
import {getCharmTypeFromClient} from "../../../model/queries/CharmTypeDAO.ts";
import {getEarringTypeFromClient} from "../../../model/queries/EarringTypeDAO.ts";
import {getSettingsFromClient} from "../../../model/queries/JewelrySettingDAO.ts";
import {addMaterialType, getMetalTypeFromClient, updateMaterialType} from "../../../model/queries/MetalTypeDAO.ts";
import {getMetalFinishesClient} from "../../../model/queries/MetalFinishDAO.ts";
import {getMetalTexturesFromClient} from "../../../model/queries/MetalTextureDAO.ts";
import {getPendantTypeFromClient} from "../../../model/queries/PendantTypeDAO.ts";
import {getProductTypesFromClient} from "../../../model/queries/ProductTypeDAO.ts";
import {getSideStonesFromClient} from "../../../model/queries/SideStonesDAO.ts";
import {getStCertCutFromClient} from "../../../model/queries/STCertCutDAO.ts";
import {getCertClarityFromClient} from "../../../model/queries/StCertClarityDAO.ts";
import {getStoneColorFromClient} from "../../../model/queries/StoneColorDAO.ts";
import {addStCut, getStoneCutFromClient, updateStCut} from "../../../model/queries/StoneCutDAO.ts";
import {getStoneOrientationFromClient} from "../../../model/queries/StoneOrientationDAO.ts";
import {getStoneOriginFromClient} from "../../../model/queries/StoneOriginDAO.ts";
import {getStoneProductTypesFromClient} from "../../../model/queries/StoneProductTypeDAO.ts";
import {getStoneShapeFromClient} from "../../../model/queries/StoneShapeDAO.ts";
import {getStSourceFromClient} from "../../../model/queries/StSourceDAO.ts";
import {addStType, getStoneTypesFromClient, updateStType} from "../../../model/queries/StoneTypeDAO.ts";
import {AdminRow} from "./AdminRow.tsx";
import {addOption, deleteOption, getOptionsFromClient, updateOption} from "../../../model/queries/BaseDAO.ts";
import {AddOptionModal} from "../Modal/AddOptionModal.tsx";
import {EditOptionModal} from "../Modal/EditOptionModal.tsx";
import {DeleteConfirmModal} from "../Modal/DeleteConfirmModal.tsx";
import {addCTWRange, getCTWRangeFromClient, updateCTWRange} from "../../../model/queries/CTWRangeDAO.ts";
import {Tables, TablesUpdate} from "../../../Definitions/generatedDefinitions.ts";

const Admin = () => {
    const [tableData, setTableData] = useState<any[]>();
    const [isLoading, setIsLoading] = useState(true);
    const [addOptionModalIsOpen, setAddOptionModalIsOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedTable, setSelectedTable] = useState<string>(AdminTables.AR_STYLE);
    const [nonce, setNonce] = useState(1)
    const [editingOption, setEditingOption] = useState<Option | null>(null);
    const [deletingOption, setDeletingOption] = useState<Option | null>(null);

    const fetchFunctions: Record<AdminTables, () => Promise<any[] | undefined>> = {
        [AdminTables.AR_STYLE]: getStylesFromClient,
        [AdminTables.BAND_STYLE]: getBandStyleFromClient,
        [AdminTables.BAND_WIDTH]: getBandWidthFromClient,
        [AdminTables.CHAIN_TYPE]: getChainTypesFromClient,
        [AdminTables.CHARM_TYPE]: getCharmTypeFromClient,
        [AdminTables.CTW_RANGE]: getCTWRangeFromClient,
        [AdminTables.EARRING_TYPE]: getEarringTypeFromClient,
        [AdminTables.JEWELRY_SETTING]: getSettingsFromClient,
        [AdminTables.LENGTH]: () => getOptionsFromClient(AdminTables.LENGTH.toLowerCase().replace(/ /g, "_")),
        [AdminTables.MATERIAL_TYPE]: getMetalTypeFromClient,
        [AdminTables.METAL_FINISH]: getMetalFinishesClient,
        [AdminTables.METAL_TEXTURE]: getMetalTexturesFromClient,
        [AdminTables.PENDANT_TYPE]: getPendantTypeFromClient,
        [AdminTables.PRODUCT_TYPE]: getProductTypesFromClient,
        [AdminTables.SIDE_STONES]: getSideStonesFromClient,
        [AdminTables.ST_CERT_CUT]: getStCertCutFromClient,
        [AdminTables.ST_CERT_TYPE]: () => getOptionsFromClient(AdminTables.ST_CERT_TYPE.toLowerCase().replace(/ /g, "_")),
        [AdminTables.ST_CLARITY_GRADE]: getCertClarityFromClient,
        [AdminTables.ST_COLOR]: getStoneColorFromClient,
        [AdminTables.ST_COLOR_GRADE]: () => getOptionsFromClient(AdminTables.ST_COLOR_GRADE.toLowerCase().replace(/ /g, "_")),
        [AdminTables.ST_ORIENTATION]: getStoneOrientationFromClient,
        [AdminTables.ST_ORIGIN]: getStoneOriginFromClient,
        [AdminTables.ST_PRICE_RANGE]: getStylesFromClient,//TODO: Fix this
        [AdminTables.ST_PRODUCT_TYPE]: getStoneProductTypesFromClient,
        [AdminTables.ST_SHAPE]: getStoneShapeFromClient,
        [AdminTables.ST_SOURCE]: getStSourceFromClient,
        [AdminTables.ST_TYPE]: getStoneTypesFromClient,
        [AdminTables.ST_CUT]: getStoneCutFromClient
    };

    const fetchData = async (table: string) => {
        setIsLoading(true);
        try {
            const fetchFunction = fetchFunctions[table as AdminTables];
            const data = fetchFunction ? await fetchFunction() : [];
            if (data) {
                //sort data by id
                data.sort((a, b) => {
                    if (a.id && b.id) {
                        // Numeric comparison if IDs are numbers
                        if (typeof a.id === "number" && typeof b.id === "number") {
                            return a.id - b.id;
                        }
                        // String comparison if IDs are strings
                        return String(a.id).localeCompare(String(b.id));
                    }
                    return 0;
                });
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
        return <Error message={error}/>;
    }

    if (isLoading) {
        return <ArLoader/>;
    }

    const onEdit = (item: any) => {
        console.log('Editing option:', item);  // Log the item being edited
        setEditingOption(item);
        console.log('EditingOption state after setting:', editingOption);  // Log the state after setting
    };

    const handleUpdateOption = async (updatedOption: Option) => {
        try {
            console.log(selectedTable.toLowerCase().replace(/ /g, "_"))

            switch (selectedTable) {
                case AdminTables.CTW_RANGE:
                    await updateCTWRange(updatedOption as TablesUpdate<'ctw_range'>);
                    break;
                case AdminTables.MATERIAL_TYPE:
                    await updateMaterialType(updatedOption as TablesUpdate<'material_type'>);
                    break;
                case AdminTables.ST_CUT:
                    await updateStCut(updatedOption as TablesUpdate<'ctw_cut'>);
                    break;
                case AdminTables.ST_TYPE:
                    await updateStType(updatedOption as TablesUpdate<'st_type'>);
                    break;
                default:
                    await updateOption(selectedTable.toLowerCase().replace(/ /g, "_"), updatedOption as Option)
            }

            setNonce(nonce + 1); // Reload data after update
            setEditingOption(null); // Close the modal
        } catch (error) {
            setError(`Failed to update ${updatedOption.description}. Please try again later.`);
            console.log(error)
        }
    };

    const handleAddOption = async (option: Option) => {
        try {
            console.log("option to add: ", option)

            switch (selectedTable) {
                case AdminTables.CTW_RANGE:
                    await addCTWRange(option as Tables<'ctw_range'>);
                    break;
                case AdminTables.MATERIAL_TYPE:
                    await addMaterialType(option as Tables<'material_type'>);
                    break;
                case AdminTables.ST_CUT:
                    await addStCut(option as Tables<'ctw_cut'>);
                    break;
                case AdminTables.ST_TYPE:
                    await addStType(option as Tables<'st_type'>);
                    break;
                default:
                    await addOption(selectedTable.toLowerCase().replace(/ /g, "_"), option as Option)
            }

            await addOption(selectedTable.toLowerCase().replace(/ /g, '_'), option)
            setNonce(nonce + 1);
        } catch (error) {
            setError(`Failed to add ${option.description}. Please try again later.`);
            console.log(error)
        }
    }

    const onDelete = async (item: Option) => {
        console.log('Deleting option:', item);  // Log the item being edited
        setDeletingOption(item);
        console.log('DeletingOption state after setting:', deletingOption);  // Log the state after setting
    };

    const handleDeleteOption = async (item: Option) => {
        await deleteOption(selectedTable.toLowerCase().replace(/ /g, "_"), item);
        setNonce(nonce + 1);
    }

    return (
        <div className="flex h-screen">
            <div className="w-1/4 bg-gray-200 overflow-y-scroll p-4">
                <ul>
                    {Object.values(AdminTables).map((table, index) => (
                        <li
                            key={index}
                            className={`cursor-pointer p-2 ${
                                table === selectedTable ? 'bg-lightgr text-white font-bold rounded' : ''
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
                    data={tableData}
                    style={'w-full'}
                    setAddOptionModalOpen={setAddOptionModalIsOpen}
                >
                    {(item, columns) => (
                        <AdminRow
                            item={item}
                            columns={columns}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    )}
                </AdminTable>
            </div>

            {editingOption && (
                <EditOptionModal
                    option={editingOption}
                    isOpen={!!editingOption}
                    onClose={() => setEditingOption(null)}
                    onUpdateOption={handleUpdateOption}
                    label={`${editingOption.description}`}
                />
            )}
            <AddOptionModal
                isOpen={addOptionModalIsOpen}
                onClose={() => setAddOptionModalIsOpen(false)}
                label={`Add to ${selectedTable}`}
                onAddOption={handleAddOption}
                selectedTable={selectedTable}
            />
            {deletingOption && (
                <DeleteConfirmModal
                    option={deletingOption}
                    isOpen={!!deletingOption}
                    onClose={() => setDeletingOption(null)}
                    label={`${deletingOption.description}`}
                    onDeleteOption={handleDeleteOption}
                />
            )}
        </div>
    );
};

export default Admin;