import {useEffect, useState} from "react";
import {Error} from "../Util/Error.tsx";
import {ArLoader} from "../Util/Loading.tsx";
import {Option} from "../../Definitions/DropdownOption.ts";
import {AdminTable} from "./AdminTable.tsx";
import {AdminTables} from "../../Definitions/enum.ts";
import {AdminRow} from "./AdminRow.tsx";
import {AddOptionModal} from "../Modal/AddOptionModal.tsx";
import {EditOptionModal} from "../Modal/EditOptionModal.tsx";
import {DeleteConfirmModal} from "../Modal/DeleteConfirmModal.tsx";
import {FactoryDAO} from "../../model/DAO/interface/FactoryDAO.ts";
import {SupabaseFactoryDAO} from "../../model/DAO/Supabase/SupabaseFactoryDAO.ts";

const Admin = () => {
    const [tableData, setTableData] = useState<any[]>();
    const [isLoading, setIsLoading] = useState(true);
    const [addOptionModalIsOpen, setAddOptionModalIsOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedTable, setSelectedTable] = useState<string>(AdminTables.AR_STYLE);
    const [nonce, setNonce] = useState(1)
    const [editingOption, setEditingOption] = useState<Option | null>(null);
    const [deletingOption, setDeletingOption] = useState<Option | null>(null);
    const daoFactory: FactoryDAO = new SupabaseFactoryDAO()
    const DAO = daoFactory.getBaseDAO()

    const fetchData = async (table: string) => {
        setIsLoading(true);
        try {
            const data = await DAO.getOptionsFromClient(table.toLowerCase().replace(/ /g, "_"));
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

    const onEdit = (item: Option) => {
        console.log('Editing option:', item);  // Log the item being edited
        setEditingOption(item);
        console.log('EditingOption state after setting:', editingOption);  // Log the state after setting
    };

    const handleUpdateOption = async (updatedOption: Option) => {
        try {
            console.log(selectedTable.toLowerCase().replace(/ /g, "_"))
            await DAO.updateOption(selectedTable.toLowerCase().replace(/ /g, "_"), updatedOption);
            setNonce(nonce + 1); // Reload data after update
            setEditingOption(null); // Close the modal
        } catch (error) {
            setError(`Failed to update ${updatedOption.description}. Please try again later.`);
        }
    };

    const handleAddOption = async (option: Option) => {
        try {
            console.log("option to add: ", option)
            await DAO.addOption(selectedTable.toLowerCase().replace(/ /g, '_'), option)
            setNonce(nonce + 1);
        } catch (error) {
            setError(`Failed to add ${option.description}. Please try again later.`);
        }
    }

    const onDelete = async (item: Option) => {
        console.log('Deleting option:', item);  // Log the item being edited
        setDeletingOption(item);
        console.log('DeletingOption state after setting:', deletingOption);  // Log the state after setting
    };

    const handleDeleteOption = async (item: Option) => {
        await DAO.deleteOption(selectedTable.toLowerCase().replace(/ /g, "_"), item);
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