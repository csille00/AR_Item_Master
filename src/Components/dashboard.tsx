import React, {useState} from "react";
// import StylesList from "./stylesList.tsx";
import SidePanel from "./SidePanel/sidePanel.tsx";
import useClient from "../hooks/useClient.tsx";
import ProductListPage, {Product} from "./ProductPage.tsx";


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


    return (
        <div className="container">
            <div className="grid grid-cols-6 gap-2 h-screen w-screen">
                <div className="col-span-1">
                    <SidePanel client={client}/>
                </div>
                <div className="col-span-5">
                    <ProductListPage
                        products={products.slice((currentPage - 1) * 10, currentPage * 10)}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onNextPage={onNextPage}
                        onPrevPage={onPrevPage}
                    />
                </div>
            </div>
        </div>
    )
}

export default Dashboard