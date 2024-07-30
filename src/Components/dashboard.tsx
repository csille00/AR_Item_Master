import React, {useState} from "react";
// import StylesList from "./stylesList.tsx";
import SidePanel from "./SidePanel/sidePanel.tsx";
import useClient from "../hooks/useClient.tsx";
import ProductListPage, {Product} from "./ProductPage.tsx";
import Table, {TableProps} from "../Components/Util/Table.tsx";
import AddForm from "./AddForm.tsx";
import {LabeledInputType} from "./Util/LabeledInput.tsx";
import {Tables} from "../Definitions/definitions.ts";
import JewelryRow, {JewelryItem} from "./Util/JewelryRow.tsx";


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

    const ar_jewelry_mock: JewelryItem[] = [
        {
            adjustable: true,
            age: 'Adult',
            ar_style: 'Modern',
            band_style: 'Classic',
            band_width: 5,
            bundle: false,
            chain_type: 'Cable',
            charm_type: 'Heart',
            configurator: true,
            cost: 150,
            create_date: '2023-01-15',
            earring_type: 'Stud',
            engravable: true,
            gender: 'Female',
            id: 'A001',
            length: '18 inches',
            made_to_order: false,
            mat_code: 'GOLD',
            mat_color: 16776960,
            metal_finish: 'Polished',
            metal_texture: 'Smooth',
            metal_type: 'Gold',
            msrp: 200,
            multi_finish: false,
            multi_texture: false,
            pendant_type: 'Solitaire',
            primary_setting: 'Prong',
            prod_code: 'P001',
            product_type: 'Necklace',
            repair_upgrade: 'Available',
            returnable: true,
            serial_no: 1001,
            setting_style: 'Bezel',
            shape: 'Round',
            sku_number: 'SKU001',
            status: 'Available',
            stone_carat_size: 1.5,
            stone_clarity: 'VS1',
            stone_color: 'D',
            stone_cut: 'Brilliant',
            stone_height: 4,
            stone_orientation: 'Vertical',
            stone_origin: 'Natural',
            stone_shape: 'Round',
            stone_type: 'Diamond',
            stone_width: 4,
            style_number: 12345,
            title: 'Elegant Gold Necklace',
            variant_id: 'V001',
            weight: 10,
        },
        {
            adjustable: false,
            age: 'Child',
            ar_style: 'Vintage',
            band_style: 'Thin',
            band_width: 2,
            bundle: true,
            chain_type: 'Rope',
            charm_type: 'Star',
            configurator: false,
            cost: 75,
            create_date: '2023-02-20',
            earring_type: 'Hoop',
            engravable: false,
            gender: 'Unisex',
            id: 'A002',
            length: '16 inches',
            made_to_order: true,
            mat_code: 'SILVER',
            mat_color: 13421772,
            metal_finish: 'Matte',
            metal_texture: 'Hammered',
            metal_type: 'Silver',
            msrp: 100,
            multi_finish: true,
            multi_texture: true,
            pendant_type: 'Cluster',
            primary_setting: 'Channel',
            prod_code: 'P002',
            product_type: 'Bracelet',
            repair_upgrade: 'Not Available',
            returnable: false,
            serial_no: 1002,
            setting_style: 'Pave',
            shape: 'Oval',
            sku_number: 'SKU002',
            status: 'Out of Stock',
            stone_carat_size: 0.5,
            stone_clarity: 'SI1',
            stone_color: 'H',
            stone_cut: 'Emerald',
            stone_height: 2,
            stone_orientation: 'Horizontal',
            stone_origin: 'Lab-Created',
            stone_shape: 'Oval',
            stone_type: 'Ruby',
            stone_width: 2,
            style_number: 54321,
            title: 'Vintage Silver Bracelet',
            variant_id: 'V002',
            weight: 5,
        },
        {
            adjustable: true,
            age: 'Adult',
            ar_style: 'Classic',
            band_style: 'Wide',
            band_width: 8,
            bundle: false,
            chain_type: 'Figaro',
            charm_type: 'Butterfly',
            configurator: true,
            cost: 300,
            create_date: '2023-03-10',
            earring_type: 'Drop',
            engravable: true,
            gender: 'Male',
            id: 'A003',
            length: '20 inches',
            made_to_order: false,
            mat_code: 'PLATINUM',
            mat_color: 8421504,
            metal_finish: 'High Polish',
            metal_texture: 'Brushed',
            metal_type: 'Platinum',
            msrp: 400,
            multi_finish: false,
            multi_texture: false,
            pendant_type: 'Pendant',
            primary_setting: 'Invisible',
            prod_code: 'P003',
            product_type: 'Ring',
            repair_upgrade: 'Available',
            returnable: true,
            serial_no: 1003,
            setting_style: 'Tension',
            shape: 'Square',
            sku_number: 'SKU003',
            status: 'Available',
            stone_carat_size: 2.0,
            stone_clarity: 'VVS2',
            stone_color: 'E',
            stone_cut: 'Princess',
            stone_height: 5,
            stone_orientation: 'Diagonal',
            stone_origin: 'Natural',
            stone_shape: 'Square',
            stone_type: 'Sapphire',
            stone_width: 5,
            style_number: 67890,
            title: 'Classic Platinum Ring',
            variant_id: 'V003',
            weight: 15,
        }
    ]

    const ar_stone_columns = [
        "Product Name",
        "SKU",
        "Product Type",
        "MSRP",
        "Date Added",
        "Status"
        // "productType",
        // "prodCode",
        // "matCode",
        // "matColor",
        // "msrp",
        // "cost",
        // "color",
        // "shape",
        // "cut",
        // "dimensions",
        // "caratWeight",
    ]

    const ar_stone_mock = [
        {
            "serialNo": 1,
            "skuNumber": "SKU001",
            "date": "2024-07-18",
            "styleNumber": "ST001",
            "stoneType": "Diamond",
            "productType": "Ring",
            "prodCode": "PR001",
            "matCode": "MC001",
            "matColor": "Gold",
            "msrp": 500,
            "cost": 250,
            "color": "Clear",
            "shape": "Round",
            "cut": "Brilliant",
            "dimensions": "4.5mm",
            "caratWeight": 0.5,
            "caratRange": "0.4-0.6",
            "certType": "GIA",
            "certNumber": "1234567890",
            "certCut": "Excellent",
            "certColor": "D",
            "certClarity": "VS1",
            "stoneNumber": "S001",
            "catStatus": "Available",
            "stoneSku": "STN001",
            "refinedShape": "Round"
        },
        {
            "serialNo": 2,
            "skuNumber": "SKU002",
            "date": "2024-07-17",
            "styleNumber": "ST002",
            "stoneType": "Emerald",
            "productType": "Necklace",
            "prodCode": "PR002",
            "matCode": "MC002",
            "matColor": "Silver",
            "msrp": 800,
            "cost": 400,
            "color": "Green",
            "shape": "Oval",
            "cut": "Faceted",
            "dimensions": "6.2x4.8mm",
            "caratWeight": 1.2,
            "caratRange": "1.0-1.5",
            "certType": "IGI",
            "certNumber": "0987654321",
            "certCut": "Very Good",
            "certColor": "F",
            "certClarity": "SI1",
            "stoneNumber": "S002",
            "catStatus": "Available",
            "stoneSku": "STN002",
            "refinedShape": "Oval"
        }
    ]


    const totalPages = Math.ceil(products.length / 10); // Assuming 10 products per page
    const onNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const onPrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const stoneColumns = [
        {label: "Product Name", type: LabeledInputType.String},
        {label: "Product Id", type: LabeledInputType.String},
        {label: "Category", type: LabeledInputType.String},
        {label: "Buying Price", type: LabeledInputType.Number},
        {label: "Quantity", type: LabeledInputType.Number},
        {label: "Unit", type: LabeledInputType.Number},
        {label: "Expiration Date", type: LabeledInputType.DateTime},
        {label: "Threshold Value", type: LabeledInputType.Number},
    ]

    return (
        <div className="bg-superlightgr">
            <div className="grid grid-cols-6 gap-2 h-screen w-screen">
                <div className="col-span-1">
                    <SidePanel client={client}/>
                </div>
                <div className="col-span-5">
                    {/*<div className="flex justify-center items-center align-middle">*/}
                        <div className="">
                            <Table columns={ar_stone_columns} data={ar_jewelry_mock} title={"Jewelry Master"}>
                                {(item: JewelryItem) => <JewelryRow {...item} />}
                            </Table>

                            {/*<ProductListPage*/}
                            {/*    products={products.slice((currentPage - 1) * 10, currentPage * 10)}*/}
                            {/*    currentPage={currentPage}*/}
                            {/*    totalPages={totalPages}*/}
                            {/*    onNextPage={onNextPage}*/}
                            {/*    onPrevPage={onPrevPage}*/}
                            {/*/>*/}
                        </div>
                        {/*<div className="w-1/2">*/}
                        {/*    <AddForm title={"New Jewelry Info"} addProduct={onNextPage} columns={stoneColumns}/>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    )
}

export default Dashboard