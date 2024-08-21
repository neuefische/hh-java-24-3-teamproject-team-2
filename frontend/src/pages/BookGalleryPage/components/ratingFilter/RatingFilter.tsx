import {ChangeEvent} from "react";
import './RatingFilter.css'

type RatingFilterProps = {
    setRatingFilter: (rating: number | null) => void;
}

export default function RatingFilter({setRatingFilter}: RatingFilterProps) {

    function handleAscending() {
        //const sortedBooksAscending = books.sort((a, b) => a.rating - b.rating);
        console.log()
    }

    function handleDescending() {
        //const sortedBooksDescending = books.sort((a, b) => b.rating - a.rating);
        console.log("desc")
    }

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
                <button type={"button"} onClick={handleAscending}>ascending</button>
                <button type={"button"} onClick={handleDescending}>descending</button>
                <button type={"reset"} onClick={handleReset}>Reset</button>
                <select name={"rating"} onChange={handleRatingValue}>
                    <option value={""}></option>
                    <option value={"0"}>0</option>
                    <option value={"1"}>1</option>
                    <option value={"2"}>2</option>
                    <option value={"3"}>3</option>
                    <option value={"4"}>4</option>
                    <option value={"5"}>5</option>
                </select>
            </form>
        </>
    )
}