import React from "react";
import Button from "./Button.tsx";
import {Tables} from "../../Definitions/definitions.ts";

export interface TableProps {
    title: string;
    columns: string[];
    data: Tables<'ar_jewelry_master'>[];
    style?: string | null;
    children?: (item: Tables<'ar_jewelry_master'>) => React.JSX.Element
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