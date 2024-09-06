import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {Tables} from "../Definitions/generatedDefinitions.ts";

// interface ProductDetailProps {
//     fetchData: (sku: string) =>
// }
const ProductDetailPage = () => {
    const { type, sku } = useParams();
    const [item, setItem ] = useState<Tables<'ar_jewelry_master'>>()
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