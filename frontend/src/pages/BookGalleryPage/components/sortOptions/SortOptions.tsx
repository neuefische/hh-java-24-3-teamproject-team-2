import "./SortOptions.css";
import {Dispatch, SetStateAction} from "react";

type SortOptionsProps = {
    sortABCDesc: boolean | null,
    setSortABCDesc: Dispatch<SetStateAction<boolean | null>>,
    sortGenreDesc: boolean | null,
    setSortGenreDesc: Dispatch<SetStateAction<boolean | null>>,
    sortRatingDesc: boolean | null,
    setSortRatingDesc: Dispatch<SetStateAction<boolean | null>>
}

export default function SortOptions({sortABCDesc, setSortABCDesc, sortGenreDesc,setSortGenreDesc, sortRatingDesc, setSortRatingDesc}: SortOptionsProps) {
    const onReset = () => {
        setSortABCDesc(null)
        setSortGenreDesc(null)
        setSortRatingDesc(null)
    }

    const onSort = (genreDesc: boolean | null, ratingDesc: boolean | null) => {
        setSortGenreDesc(genreDesc)
        setSortRatingDesc(ratingDesc)
    }

    return (
        <>
            <div className={"sort-container"}>
                Sort by:
                <button className={`sort-option ${sortABCDesc && "selected-sort"}`} onClick={() => setSortABCDesc(true)}>AZ↓</button>
                <button className={`sort-option ${sortABCDesc === false && "selected-sort"}`} onClick={() => setSortABCDesc(false)}>AZ↑</button> |
                <button className={`sort-option ${sortGenreDesc && "selected-sort"}`} onClick={() => onSort(true, null)}>Genre AZ↓</button>
                <button className={`sort-option ${sortGenreDesc === false && "selected-sort"}`} onClick={() => onSort(false, null)}>Genre AZ↑</button>
                <button className={`sort-option ${sortRatingDesc && "selected-sort"}`} onClick={() => onSort(null, true)}>
                    <span className="material-symbols-outlined">star</span>↓
                </button>
                <button className={`sort-option ${sortRatingDesc === false && "selected-sort"}`} onClick={() => onSort(null, false)}>
                    <span className="material-symbols-outlined">star</span>↑
                </button>
                <button className={`sort-option sort-reset`} onClick={onReset}>Reset</button>
            </div>
        </>
    )
}