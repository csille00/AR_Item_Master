import React from "react";
import editIcon from "../../../assets/edit.svg";
import deleteIcon from "../../../assets/delete.svg";
import {Option} from "../../../Definitions/DropdownOption.ts";
import Button from "../Util/Button.tsx";

interface AdminRowProps {
    item: Option,
    columns: string[],
    onEdit: (item: Option) => void
    onDelete: (item: Option) => Promise<void>
}

export const AdminRow: React.FC<AdminRowProps> = ({item, columns, onEdit, onDelete}): React.ReactElement => {
    return (
        <tr>
            {columns.map((column, index) => (
                <td key={index} className="p-4">
                    {String(item[column])}
                </td>
            ))}
            <td className="p-4 flex justify-end gap-2">
                <Button
                    icon={editIcon}
                    onClick={() => onEdit(item)}
                />
                <Button
                    icon={deleteIcon}
                    onClick={() => onDelete(item)}
                />
            </td>
        </tr>
    );
};