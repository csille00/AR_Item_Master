import React from "react";
import edit from "../../assets/edit.svg";
import deleteIcon from "../../assets/delete.svg";
import {Option} from "../../Definitions/DropdownOption.ts";

interface AdminRowProps {
    item: Option,
    columns: string[],
    onEdit: (item: Option) => void
    onDelete: (item: Option) => Promise<void>
}

export const AdminRow: React.FC<AdminRowProps> = ({ item, columns, onEdit, onDelete }): React.ReactElement => {
    return (
        <tr>
            {columns.map((column, index) => (
                <td key={index} className="p-4">
                    {String(item[column])}
                </td>
            ))}
            <td className="p-4 flex justify-end gap-2">
                <img
                    src={edit}
                    alt="Edit"
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => onEdit(item)}
                />
                <img
                    src={deleteIcon}
                    alt="Delete"
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => onDelete(item)}
                />
            </td>
        </tr>
    );
};