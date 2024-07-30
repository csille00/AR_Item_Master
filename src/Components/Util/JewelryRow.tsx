import React from "react";

export interface JewelryItem {
    adjustable: boolean | null;
    age: string | null;
    ar_style: string | null;
    band_style: string | null;
    band_width: number | null;
    bundle: boolean | null;
    chain_type: string | null;
    charm_type: string | null;
    configurator: boolean | null;
    cost: number | null;
    create_date: string | null;
    earring_type: string | null;
    engravable: boolean | null;
    gender: string | null;
    id: string | null;
    length: string | null;
    made_to_order: boolean | null;
    mat_code: string | null;
    mat_color: number | null;
    metal_finish: string | null;
    metal_texture: string | null;
    metal_type: string | null;
    msrp: number | null;
    multi_finish: boolean | null;
    multi_texture: boolean | null;
    pendant_type: string | null;
    primary_setting: string | null;
    prod_code: string | null;
    product_type: string | null;
    repair_upgrade: string | null;
    returnable: boolean | null;
    serial_no: number;
    setting_style: string | null;
    shape: string | null;
    sku_number: string;
    status: string | null;
    stone_carat_size: number | null;
    stone_clarity: string | null;
    stone_color: string | null;
    stone_cut: string | null;
    stone_height: number | null;
    stone_orientation: string | null;
    stone_origin: string | null;
    stone_shape: string | null;
    stone_type: string | null;
    stone_width: number | null;
    style_number: number | null;
    title: string | null;
    variant_id: string | null;
    weight: number | null;
}

const JewelryRow = (item: JewelryItem): React.ReactNode => (
    <>
        <td className="p-4">{item.sku_number}</td>
        <td className="p-4">{item.title}</td>
        <td className="p-4">{item.product_type}</td>
        <td className="p-4">{item.msrp}</td>
        <td className="p-4">{item.create_date}</td>
        <td className="p-4">{item.status}</td>
    </>
);


export default JewelryRow;