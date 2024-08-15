import React from "react";
import {useParams} from "react-router-dom";

const ProductDetailPage = () => {
    const { sku } = useParams();
    // TODO: query the db based on the sku and fill the information of the details page
    return (
        <div className="mx-4 border border-lightgr rounded-lg mt-10 bg-white">
            <div className="flex items-center justify-between p-4">
                <h1 className="text-argray text-left my-8 text-4xl justify-start">{sku}</h1>
            </div>
            <div>
                <p>Overview</p>
                <p>Materials</p>
                <p>Additional</p>
            </div>
        </div>
    );
};

export default ProductDetailPage;