import React, {useState} from "react";
import {Tables} from "../../Definitions/definitions.ts";
import {useNavigate} from "react-router-dom";
import {FilterModal} from "./FilterModal.tsx";
import Button from "./Button.tsx";
import filterIcon from "../../assets/filter.svg"
import downloadIcon from "../../assets/download.svg"

export interface TableProps {
    title: string;
    columns: string[];
    data: Tables<'ar_jewelry_master'>[];
    style?: string | null;
    children?: (item: Tables<'ar_jewelry_master'>) => React.JSX.Element
}

const download = () => {
    console.log("export button")
}

const Table = ({title, columns, data, style, children}: TableProps) => {
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState<boolean>(false);

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
                            onClick={() => setModalOpen(true)}
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
                                <th key={index} className="p-4">{column} </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                {children ? children(item) : null}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <FilterModal isOpen={isModalOpen} onClose={() => setModalOpen(false)}/>
        </>
    );
};

export default Table;