import React from "react";

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
            <div className={`mx-4 border border-lightgr rounded-lg mt-10 bg-white ${style ? style : ''}`}>
                <div className="flex items-center justify-between p-4">
                    <h1 className="text-argray text-left my-8 text-4xl justify-start">{title}</h1>
                    <button
                        className="bg-argold hover:font-bold hover:bg-darkgold hover:border-darkgold rounded-lg h-12 mx-1.5 flex items-center"
                        onClick={() => setAddOptionModalOpen(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="#FFFFFF" className="size-5 mx-1">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                    </button>
                </div>
                {/*Added inline styling because tailwind height has limitations*/}
                <div className="flex justify-center pb-6 px-4 overflow-y-scroll h-auto" style={{maxHeight: '34rem'}}>
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

