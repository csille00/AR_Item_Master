import React from "react";
import {JewelryMasterQuery, Tables} from "../../Definitions/definitions.ts";
import {useNavigate} from "react-router-dom";
import Button from "./Button.tsx";
import filterIcon from "../../assets/filter.svg"
import downloadIcon from "../../assets/download.svg"
import tableIcon from "../../assets/table.svg"

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
                <div className="flex justify-center pb-6 px-4">
                    <table className="w-full text-left text-argray">
                        <thead className="">
                        <tr>
                            {columns.map((column, index) => (
                                <th key={index} className="p-4">{column} </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((item, index) => (
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