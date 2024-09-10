import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Button from "./Button.tsx";
import filterIcon from "../../assets/filter.svg"
import downloadIcon from "../../assets/download.svg"
import tableIcon from "../../assets/table.svg"
import addIcon from "../../assets/addWhite.svg";
import {Error} from "./Error.tsx";
import {ArLoader} from "./Loading.tsx";

export interface TableProps {
    title: string;
    columns: string[];
    data: any;
    style?: string | null;
    error?: string | null;
    isLoading?: boolean
    getSortColumn: (column: string) => string
    setColumnModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setFilterModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    fetchDataAsCSV?: () => Promise<string>;
    children?: (item: any, columns: string[]) => React.JSX.Element;
    filename?: string
}


const Table = ({
                   title,
                   columns,
                   data,
                   style,
                   error,
                   isLoading,
                   getSortColumn,
                   setColumnModalOpen,
                   setFilterModalOpen,
                   fetchDataAsCSV,
                   children,
                   filename
               }: TableProps) => {
    const navigate = useNavigate();
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [search, setSearch] = useState<string | null>(null);
    const [dataCount, setDataCount] = useState<number>(data ? data.length : 0)

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };


    const handleSort = (column: string) => {
        if (sortColumn === column) {
            // Toggle sort direction
            setSortDirection(prevDirection => prevDirection === 'asc' ? 'desc' : 'asc');
        } else {
            // Set new column and default to ascending
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    useEffect(() => {
        if(data) setDataCount(data.length)
    }, [data]);

    const getValueByPath = (obj) => {
        if (obj === null) return ''
        if (typeof obj !== 'object') return obj;
        return Object.values(obj)[0]
    };

    const sortedData = React.useMemo(() => {
        if (search) {
            data = data
                .filter((item: any) => item !== null && item !== undefined) // Remove null/undefined
                .filter((item: any) =>
                    (item.prod_name && item.prod_name.toLowerCase().includes(search.toLowerCase())) ||
                    (item.sku_number && item.sku_number.toLowerCase().includes(search.toLowerCase()))
                );
        }

        if (!sortColumn) return data;

        return [...data].sort((a, b) => {
            const col = getSortColumn(sortColumn);

            const aValue = getValueByPath(a[col]);
            const bValue = getValueByPath(b[col]);

            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
            } else {
                const aStr = String(aValue);
                const bStr = String(bValue);
                return sortDirection === 'asc' ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
            }
        });
    }, [data, sortColumn, sortDirection, search]);

    const download = async () => {
        if (!fetchDataAsCSV) return
        const data = await fetchDataAsCSV()
        const blob = new Blob([data], {type: 'text/csv'});
        const url = window.URL.createObjectURL(blob);
        // Create a link element
        const a = document.createElement('a');
        a.href = url;
        a.download = filename ?? "data.csv";

        a.click();
        window.URL.revokeObjectURL(url);
    }

    if (error) {
        return <Error message={error}/>
    }

    if (isLoading) {
        return <ArLoader/>;
    }

    return (
        <>
            <div className="mt-5 mx-4 flex justify-end">
                <form className="flex items-center border border-lightgr rounded-lg bg-superlightgr px-5 h-12 w-fit">
                    <input
                        type="text"
                        placeholder="Search by name or SKU"
                        className="text-lightgr bg-superlightgr outline-none flex-grow text-right"
                        onChange={handleSearch}
                    />
                </form>
            </div>
            <div className={`mx-4 border border-lightgr rounded-lg mt-10 bg-white ${style ? style : ''}`}>
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-end">
                        <h1 className="text-argray text-4xl">{title}</h1>
                        <p className="text-lightgr ml-4 text-xl">{dataCount}</p>
                    </div>
                    <div className="flex justify-end items-center">
                        <Button
                            icon={addIcon as SVGElement}
                            style="bg-argold hover:font-bold hover:bg-darkgold hover:border-darkgold rounded-lg h-12 mx-1.5 flex items-center"
                            onClick={() => navigate('/addJewelry')}
                        />
                        <Button
                            icon={filterIcon as SVGElement}
                            text="Filter"
                            onClick={() => setFilterModalOpen(true)}
                            style="text-argray bg-white hover:text-argray hover:bg-superlightgr hover:border-superlightgr border border-argray rounded-lg text-sm px-3 w-auto h-12 mx-1.5 flex items-center"
                        />
                        <Button
                            icon={tableIcon as SVGElement}
                            text="Change View"
                            onClick={() => setColumnModalOpen(true)}
                            style="text-argray bg-white hover:text-argray hover:bg-superlightgr hover:border-superlightgr border border-argray rounded-lg text-sm px-3 w-auto h-12 mx-1.5 flex items-center"
                        />
                        <Button
                            icon={downloadIcon as SVGElement}
                            text="Download"
                            onClick={download}
                            style="text-argray bg-white hover:text-argray hover:bg-superlightgr hover:border-superlightgr border border-argray rounded-lg text-sm px-3 w-auto h-12 mx-1.5 flex items-center"
                        />
                    </div>
                </div>
                {/*Added inline styling because tailwind height has limitations*/}
                <div className="flex justify-center pb-6 px-4 overflow-y-scroll h-auto" style={{maxHeight: '44rem'}}>
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