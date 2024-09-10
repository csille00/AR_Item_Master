import React, {useEffect, useMemo, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Button from "./Button.tsx";
import filterIcon from "../../assets/filter.svg"
import downloadIcon from "../../assets/download.svg"
import tableIcon from "../../assets/table.svg"
import addIcon from "../../assets/addWhite.svg";
import {Error} from "./Error.tsx";
import {ArLoader} from "./Loading.tsx";
import InfiniteScroll from "react-infinite-scroll-component";

export interface TableProps {
    title: string;
    columns: string[];
    fetchData: (page: number) => Promise<{ data: any, count: number }>
    style?: string | null;
    error?: string | null;
    isLoading?: boolean
    page: number,
    setPage: (value: (((prevState: number) => number) | number)) => void
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
                   fetchData,
                   style,
                   error,
                   isLoading,
                   page,
                   setPage,
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
    const [dataCount, setDataCount] = useState<number>(0)
    const pathVar = title.includes('Jewelry') ? "jewelry" : "stone"
    const [data, setData] = useState<any[]>([])
    const [hasMore, setHasMore] = useState(true)
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        getMoreData();
    }, [page]);

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                const {scrollTop, scrollHeight, clientHeight} = containerRef.current;
                if (scrollHeight - scrollTop <= clientHeight + 10) { // Add a small buffer
                    if (hasMore) {
                        setPage(prevPage => prevPage + 1)
                    }
                }
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, [hasMore, setPage]);

    const getMoreData = async () => {
        try {
            if (!hasMore) {
                console.log('stopping')
                return
            }
            const items = await fetchData(page);
            setData(prevData => [...prevData, ...items.data]);
            setDataCount(prevCount => prevCount + items.data.length);
            setHasMore(items.data.length === 100);
        } catch (error) {
            // Handle errors here, e.g., set an error state
        }
    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleSort = (column: string) => {
        setSortColumn(prevColumn =>
            prevColumn === column
                ? column
                : column
        );
        setSortDirection(prevDirection =>
            sortColumn === column
                ? prevDirection === 'asc' ? 'desc' : 'asc'
                : 'asc'
        );
    };

    // useEffect(() => {
    //     if (data) setDataCount(data.length)
    // }, [data]);

    const getValueByPath = (obj) => {
        if (obj === null) return ''
        if (typeof obj !== 'object') return obj;
        return Object.values(obj)[0]
    };

    const sortedData = useMemo(() => {
        let filteredData = data;

        if (search) {
            filteredData = filteredData
                .filter(item =>
                    item.prod_name?.toLowerCase().includes(search.toLowerCase()) ||
                    item.sku_number?.toLowerCase().includes(search.toLowerCase())
                );
        }

        if (!sortColumn) return filteredData;

        return [...filteredData].sort((a, b) => {
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
    }, [data, sortColumn, sortDirection, search, getSortColumn]);

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
                <div ref={containerRef} className="flex justify-center pb-6 px-4 overflow-y-scroll h-auto"
                     style={{maxHeight: '44rem'}}>
                    <table className="w-full text-left text-argray">
                        <thead className="sticky top-0 bg-white">
                        <tr>
                            {columns.map((column, index) => (
                                <th key={index} className="p-4 cursor-pointer hover:underline"
                                    onClick={() => handleSort(column)}>
                                    {sortColumn === column ? (
                                        <div className="flex items-center">
                                            {column}
                                            {sortDirection === 'asc' ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                     viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                                     className="size-6 pl-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"/>
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                     viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                                     className="size-6 pl-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"/>
                                                </svg>
                                            )}
                                        </div>
                                    ) : (
                                        <>{column}</>

                                    )}

                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {sortedData.map((item: any, index: React.Key | null | undefined) => (
                            <tr key={index}>
                                {children ? children(item, columns) : null}
                                <td>
                                    <Link to={`/productDetails/${pathVar}/${item.sku_number}`} state={{item}}
                                          className="text-argold hover:text-argold hover:font-bold">
                                        View/Edit
                                    </Link>
                                </td>
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