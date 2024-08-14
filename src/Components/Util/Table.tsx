import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import Button from "./Button.tsx";
import filterIcon from "../../assets/filter.svg"
import downloadIcon from "../../assets/download.svg"
import tableIcon from "../../assets/table.svg"
import {ArJewelryMasterColumns} from "../../Definitions/enum.ts";

export interface TableProps {
    title: string;
    columns: string[];
    data: any;
    style?: string | null;
    setColumnModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setFilterModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    fetchDataAsCSV?: () => Promise<string>;
    children?: (item: any, columns: string[]) => React.JSX.Element;
    filename?: string
}


const Table = ({title, columns, data, style, setColumnModalOpen, setFilterModalOpen, fetchDataAsCSV, children, filename}: TableProps) => {
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

    const download = async () => {
        if(!fetchDataAsCSV) return
        const data = await fetchDataAsCSV()
        const blob = new Blob([data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        // Create a link element
        const a = document.createElement('a');
        a.href = url;
        a.download = filename ?? "data.csv";

        a.click();
        window.URL.revokeObjectURL(url);
    }

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
                            className="bg-argold hover:font-bold hover:bg-darkgold hover:border-darkgold rounded-lg h-12 mx-1.5 flex items-center"
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
                            style="text-argray bg-white hover:text-argray hover:bg-superlightgr hover:border-superlightgr border border-argray rounded-lg text-sm px-3 w-auto h-12 mx-1.5 flex items-center"
                        />
                        <Button
                            icon={tableIcon}
                            text="Change View"
                            onClick={() => setColumnModalOpen(true)}
                            style="text-argray bg-white hover:text-argray hover:bg-superlightgr hover:border-superlightgr border border-argray rounded-lg text-sm px-3 w-auto h-12 mx-1.5 flex items-center"
                        />
                        <Button
                            icon={downloadIcon}
                            text="Download"
                            onClick={download}
                            style="text-argray bg-white hover:text-argray hover:bg-superlightgr hover:border-superlightgr border border-argray rounded-lg text-sm px-3 w-auto h-12 mx-1.5 flex items-center"
                       />
                    </div>
                </div>
                {/*Added inline styling because tailwind height has limitations*/}
                <div className="flex justify-center pb-6 px-4 overflow-y-scroll h-auto" style={{maxHeight: '34rem'}}>
                    <table className="w-full text-left text-argray">
                        <thead className="sticky top-0 bg-white">
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
                        {sortedData.map((item: any, index: React.Key | null | undefined) => (
                            <tr key={index}>
                                {children ? children(item, columns) : null}
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