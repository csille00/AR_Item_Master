import React from "react";
import Button from "./Button.tsx";
import addIcon from "../../assets/addWhite.svg";

export interface AdminTableProps {
    title: string;
    data: any;
    style?: string | null;
    children: (item: any, columns: string[]) => React.JSX.Element;
    setAddOptionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AdminTable = ({title, data, setAddOptionModalOpen, style, children}: AdminTableProps) => {
    const columns = data && data.length > 0 ? Object.keys(data[0]) : [];

    return (
        <>
            <div className={`border border-lightgr rounded-lg mt-10 bg-white ${style ? style : ''}`}>
                <div className="flex items-center justify-between p-4">
                    <h1 className="text-argray text-left my-8 text-4xl justify-start">{title}</h1>
                    <Button
                        icon={addIcon as SVGElement}
                        style="bg-argold hover:font-bold hover:bg-darkgold hover:border-darkgold rounded-lg h-12 mx-1.5 flex items-center"
                        onClick={() => setAddOptionModalOpen(true)}
                    />
                </div>
                {/*Added inline styling because tailwind height has limitations*/}
                <div className="flex justify-center pb-6 px-4 overflow-y-scroll h-auto" style={{maxHeight: '44rem'}}>
                    <table className="w-full text-left text-argray">
                        <thead className="sticky top-0 bg-white">
                            <tr>
                                {columns.map((column, index) => (
                                    <th key={index} className="p-4 cursor-pointer">
                                        {column}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                        {data.map((item: any) => (
                            children(item, columns)
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

