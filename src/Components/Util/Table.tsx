import React from "react";
import {Tables} from "../../Definitions/definitions.ts";
import Button from "./Button.tsx";
import {JewelryItem} from "./JewelryRow.tsx";
import {StoneItem} from "./StoneRow.tsx";
import Stone from "../Stone.tsx";

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

const Table = <T, >({title, columns, data, style, children}: TableProps) => {
    return (
        <div className={`m-2 ${style ? style : ''}`}>
            <div className="">
                <h1 className="text-argray text-left my-8 text-4xl">{title}</h1>
                <Button text="filter" style="bg-arbrown" onClick={filter}/>
            </div>
            <div className="flex justify-center">
                <table className="w-full text-left text-argray">
                    <thead className="border border-lightgr">
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index} className="p-4">{column} </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className="border border-lightgr" style={{padding: "1em"}}>
                            {children ? children(item) : null}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;