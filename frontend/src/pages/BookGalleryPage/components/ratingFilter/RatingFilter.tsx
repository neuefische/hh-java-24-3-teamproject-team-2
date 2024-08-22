import {ChangeEvent} from "react";
import './RatingFilter.css';

type RatingFilterProps = {
    setRatingFilter: (rating: number | null) => void;
}

export default function RatingFilter({setRatingFilter}: RatingFilterProps) {

    function handleRatingValue(event: ChangeEvent<HTMLSelectElement>) {
        const selectedBookRating = Number(event.target.value);
        setRatingFilter(selectedBookRating)
    }

    function handleReset() {
        setRatingFilter(null)
    }

    return (
        <>
            <form className={"rating-form"}>
                <button type={"reset"} onClick={handleReset}>Reset</button>
                <select name={"rating"} onChange={handleRatingValue}>
                    <option value={""}>All</option>
                    <option value={"0"}>☆☆☆☆☆</option>
                    <option value={"1"}>★☆☆☆☆</option>
                    <option value={"2"}>★★☆☆☆</option>
                    <option value={"3"}>★★★☆☆</option>
                    <option value={"4"}>★★★★☆</option>
                    <option value={"5"}>★★★★★</option>
                </select>
            </form>
        </>
    )
}