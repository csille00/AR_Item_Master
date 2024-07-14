import React from "react";

export interface Product {
    id: number;
    title: string;
    sku: string;
    type: string;
    msrp: number;
    createdDate: string;
    status: string;
}

interface ProductListPageProps {
    products: Product[];
    currentPage: number;
    totalPages: number;
    onNextPage: () => void;
    onPrevPage: () => void;
}

const ProductListPage: React.FC<ProductListPageProps> = ({
                                                             products,
                                                             currentPage,
                                                             totalPages,
                                                             onNextPage,
                                                             onPrevPage,
                                                         }) => {
    return (
        <div className="mx-10 my-10 bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between mb-4">
                <h2 className="font-bold text-xl">Product List</h2>
                <div className="space-x-2">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Add Product</button>
                    <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">Filter</button>
                    <button className="px-4 py-2 bg-green-500 text-white rounded-md">Download All</button>
                </div>
            </div>
            <div className="mb-4">
                <div className="flex font-bold border-b pb-2">
                    <div className="w-1/6">Product Title</div>
                    <div className="w-1/6">SKU</div>
                    <div className="w-1/6">Product Type</div>
                    <div className="w-1/6">MSRP</div>
                    <div className="w-1/6">Created Date</div>
                    <div className="w-1/6">Status</div>
                </div>
                {products.map((product) => (
                    <div key={product.id} className="flex border-b py-2">
                        <div className="w-1/6">{product.title}</div>
                        <div className="w-1/6">{product.sku}</div>
                        <div className="w-1/6">{product.type}</div>
                        <div className="w-1/6">{product.msrp}</div>
                        <div className="w-1/6">{product.createdDate}</div>
                        <div className="w-1/6">{product.status}</div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-4">
                <button
                    className={`px-4 py-2 ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"} rounded-md`}
                    onClick={onPrevPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button
                    className={`px-4 py-2 ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"} rounded-md`}
                    onClick={onNextPage}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};
export default ProductListPage;