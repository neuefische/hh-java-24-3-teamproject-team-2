import {Dispatch, SetStateAction} from "react";
import "./StatusFilter.css";

type StatusFilterProps = {
    statusFilter: string,
    setStatusFilter: Dispatch<SetStateAction<string>>
}

export default function StatusFilter ({statusFilter, setStatusFilter}:StatusFilterProps) {
    const bookStatuses : string[] = ["ALL", "TO_BE_READ", "READING", "READ"];

    function formatEnum(enumString :string): string {
        return enumString.split('_').map((letter) => {
            return letter.charAt(0).toUpperCase() + letter.slice(1).toLowerCase();
        }).join(enumString != "NON_FICTION" ? " " : "-");
    }

    return (
        <div className={"status-buttons"}>
            {bookStatuses.map((status) => (
                <button className={`${status === statusFilter ? "selected-status" : "not-selected-status"}`} key={status} onClick={() => setStatusFilter(status)}>{formatEnum(status)}</button>
            ))}
        </div>
    )
}