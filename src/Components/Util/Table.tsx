import React from "react";
import {Tables} from "../../Definitions/definitions.ts";
import Button from "./Button.tsx";
import {JewelryItem} from "./JewelryRow.tsx";
import {StoneItem} from "./StoneRow.tsx";
import Stone from "../Stone.tsx";
import {useNavigate} from "react-router-dom";

export interface TableProps {
    title: string;
    columns: string[];
    data: JewelryItem[] | StoneItem[];
    style?: string | null;
    children?: (item: JewelryItem | StoneItem) => React.JSX.Element
}

const filter = () => {
    console.log("filter button")
}

const download = () => {
    console.log("export button")
}

const Table = <T, >({title, columns, data, style, children}: TableProps) => {
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
                    <button className="text-white bg-argold hover:bg-argold rounded-lg text-sm px-6 h-12 mx-1.5"
                                onClick={() => navigate('/add')}>
                            Add Product
                        </button>
                        <button
                            className="text-argray bg-white border border-argray rounded-lg text-sm px-5 h-12 mx-1.5"
                            onClick={filter}>
                            Filter
                        </button>
                        <button
                            className="text-argray bg-white border border-argray rounded-lg text-sm px-5 h-12 mx-1.5"
                            onClick={download}>
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
        </>
    );
};

export default Table;