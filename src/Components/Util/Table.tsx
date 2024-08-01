import React, {useState} from "react";
import {Tables} from "../../Definitions/definitions.ts";
import {useNavigate} from "react-router-dom";
import {FilterModal} from "./FilterModal.tsx";

export interface TableProps {
    title: string;
    columns: string[];
    data: Tables<'ar_jewelry_master'>[];
    style?: string | null;
    children?: (item: Tables<'ar_jewelry_master'>) => React.JSX.Element
}

// const filter = () => {
//     console.log("filter button")
// }

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
                        <button className="text-white text-sm bg-argold hover:font-bold rounded-lg px-4 h-12 mx-1.5 flex items-center"
                                onClick={() => navigate('/add')}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="size-5 mx-1">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                            Product
                        </button>
                        <button
                            className="text-argray bg-white hover:font-bold border border-argray rounded-lg text-sm px-3 w-auto h-12 mx-1.5 flex items-center"
                            onClick={() => setModalOpen(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 strokeWidth={1.5}
                                 stroke="currentColor" className="size-5 mx-1">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"/>
                            </svg>
                            Filter
                        </button>
                        <button
                            className="text-argray bg-white hover:font-bold border border-argray rounded-lg text-sm px-3 h-12 mx-1.5 flex items-center"
                            onClick={download}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="size-5 mx-1">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"/>
                            </svg>

                            Download
                        </button>
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