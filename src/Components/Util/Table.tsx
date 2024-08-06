import React, {useState} from "react";
import {JewelryMasterQuery, Tables} from "../../Definitions/definitions.ts";
import {useNavigate} from "react-router-dom";
import Button from "./Button.tsx";
import filterIcon from "../../assets/filter.svg"
import downloadIcon from "../../assets/download.svg"
import {ArJewelryMasterColumns} from "../../Definitions/enum.ts";

export interface TableProps {
    title: string;
    columns: string[];
    data: JewelryMasterQuery;
    style?: string | null;
    setColumnModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setFilterModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    children?: (item: Tables<'ar_jewelry_master'>, columns: string[]) => React.JSX.Element
}

const download = () => {
    console.log("export button")
}

const Table = ({title, columns, data, style, setColumnModalOpen, setFilterModalOpen, children}: TableProps) => {
    const navigate = useNavigate();
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const handleSort = (column: string) => {
        //for now, only support the sorting of the data column.
        // It is set up to support the other ones, I just dont know how to properly sort them right now (8/05/24)
        if(!(column == ArJewelryMasterColumns.DATE)) return
        if (sortColumn === column) {
            // Toggle sort direction
            setSortDirection(prevDirection => prevDirection === 'asc' ? 'desc' : 'asc');
        } else {
            // Set new column and default to ascending
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const sortedData = React.useMemo(() => {
        if (!sortColumn) return data;

        return [...data].sort((a, b) => {
            const aValue = a['date'];
            const bValue = b['date'];

            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
            } else {
                const aStr = String(aValue);
                const bStr = String(bValue);
                return sortDirection === 'asc' ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
            }
        });
    }, [data, sortColumn, sortDirection])

    return (
        <>
            <div className="mt-5 mx-4 flex justify-end">
                <form className="flex items-center border border-lightgr rounded-lg bg-superlightgr px-5 h-12 w-fit">
                    <input
                        type="text"
                        placeholder="Search by name or SKU"
                        className="text-lightgr bg-superlightgr outline-none flex-grow text-right"
                    />
                    {/*<button type="submit" className="text-lightgr text-sm ml-2">*/}
                    {/*    Search*/}
                    {/*</button>*/}
                </form>
            </div>
            <div className={`mx-4 border border-lightgr rounded-lg mt-10 bg-white ${style ? style : ''}`}>
                <div className="flex items-center justify-between p-4">
                    <h1 className="text-argray text-left my-8 text-4xl justify-start">{title}</h1>
                    <div className="flex justify-end items-center">
                        <button
                            className="bg-argold hover:font-bold rounded-lg h-12 mx-1.5 flex items-center"
                            onClick={() => navigate('/addJewelry')}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="#FFFFFF" className="size-5 mx-1">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                        </button>
                        <Button
                            icon={filterIcon}
                            text="Filter"
                            onClick={() => setFilterModalOpen(true)}
                            style="text-argray bg-white hover:text-argray border border-argray rounded-lg text-sm px-3 w-auto h-12 mx-1.5 flex items-center"
                        />
                        <Button
                            icon={filterIcon}
                            text="Change View"
                            onClick={() => setColumnModalOpen(true)}
                            style="text-argray bg-white hover:text-argray border border-argray rounded-lg text-sm px-3 w-auto h-12 mx-1.5 flex items-center"
                        />
                        <Button
                            icon={downloadIcon}
                            text="Download"
                            onClick={download}
                            style="text-argray bg-white hover:text-argray border border-argray rounded-lg text-sm px-3 w-auto h-12 mx-1.5 flex items-center"
                       />
                    </div>
                </div>
                <div className="flex justify-center pb-6 px-4">
                    <table className="w-full text-left text-argray">
                        <thead className="">
                        <tr>
                            {columns.map((column, index) => (
                                <th key={index} className="p-4 cursor-pointer" onClick={() => handleSort(column)}>
                                    {column}
                                    {sortColumn === column && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {sortedData.map((item, index) => (
                            <tr key={index}>
                                {children ? children(item as unknown as Tables<'ar_jewelry_master'>, columns) : null}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Table;