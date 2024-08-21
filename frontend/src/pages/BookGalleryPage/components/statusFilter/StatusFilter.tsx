import {Dispatch, SetStateAction} from "react";
import "./StatusFilter.css";
import {formatEnum} from "../../../../utils/utilFunctions.ts";

type StatusFilterProps = {
    statusFilter: string,
    setStatusFilter: Dispatch<SetStateAction<string>>
}

export default function StatusFilter ({statusFilter, setStatusFilter}:StatusFilterProps) {
    const bookStatuses : string[] = ["ALL", "TO_BE_READ", "READING", "READ"];

    return (
        <div className={"status-buttons"}>
            {bookStatuses.map((status) => (
                <button className={`${status === statusFilter ? "selected-status" : "not-selected-status"}`} key={status} onClick={() => setStatusFilter(status)}>{formatEnum(status)}</button>
            ))}
        </div>
    )
}