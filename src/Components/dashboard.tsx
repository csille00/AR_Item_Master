import React, {useState} from "react";
// import StylesList from "./stylesList.tsx";
import SidePanel from "./SidePanel/sidePanel.tsx";
import useClient from "../hooks/useClient.tsx";
import ProductListPage, {Product} from "./ProductPage.tsx";
import AddForm from "./AddForm.tsx";
import {LabeledInputType} from "./Util/LabeledInput.tsx";


const Dashboard: React.FC = () => {

    const client = useClient()
    const [currentPage, setCurrentPage] = useState(1);

    //TODO: Get the real data
    const products: Product[] = [
        {
            id: 1,
            title: "Product 1",
            sku: "SKU001",
            type: "Type A",
            msrp: 100,
            createdDate: "2024-07-12",
            status: "Active"
        },
        {
            id: 2,
            title: "Product 2",
            sku: "SKU002",
            type: "Type B",
            msrp: 150,
            createdDate: "2024-07-11",
            status: "Inactive"
        },
    ];

    const totalPages = Math.ceil(products.length / 10); // Assuming 10 products per page
    const onNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const onPrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const handleAddProduct = (formData: { [key: string]: string }) => {
        console.log("Form Data:", formData);
        // Insert into your database here
    };

    const stoneColumns = [
        {label: "Serial Number", type: LabeledInputType.Number},
        {label: "SKU Number", type: LabeledInputType.String},
        {label: "Create Date", type: LabeledInputType.DateTime},
        {label: "Style Number", type: LabeledInputType.Number},
        {label: "Title", type: LabeledInputType.String},
        {label: "Category", type: LabeledInputType.String},
        {label: "Product Type", type: LabeledInputType.String},
        {label: "Prod Code", type: LabeledInputType.String},
        {label: "Cost", type: LabeledInputType.Number},
        {label: "Style", type: LabeledInputType.String},
        {label: "Color", type: LabeledInputType.String}
    ]

    return (
        <div className="bg-superlightgr">
            <div className="grid grid-cols-6 gap-2 h-screen w-screen">
                <div className="col-span-1">
                    <SidePanel client={client}/>
                </div>
                <div className="col-span-5">
                    <div className="flex justify-around">
                        {/*<div className="">*/}
                        {/*    <ProductListPage*/}
                        {/*        products={products.slice((currentPage - 1) * 10, currentPage * 10)}*/}
                        {/*        currentPage={currentPage}*/}
                        {/*        totalPages={totalPages}*/}
                        {/*        onNextPage={onNextPage}*/}
                        {/*        onPrevPage={onPrevPage}*/}
                        {/*    />*/}
                        {/*</div>*/}
                        <div className="w-1/2">
                            <AddForm title={"New Jewelry Info"} addProduct={handleAddProduct} columns={stoneColumns}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard