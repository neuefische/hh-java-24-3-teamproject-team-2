import {ChangeEvent} from "react";

export default function RatingFilter() {

    function handleAscending() {
        //const sortedBooksAscending = books.sort((a, b) => a.rating - b.rating);
        console.log("asc")
    }

    function handleDescending() {
        //const sortedBooksDescending = books.sort((a, b) => b.rating - a.rating);
        console.log("desc")
    }

    function handleRatingValue(event: ChangeEvent<HTMLSelectElement>) {
        const selectedBookRating = event.target.value;
        console.log(selectedBookRating)
    }

    return (
        <>
            <h3>Rating Filter</h3>
            <button onClick={handleAscending}>ascending</button>
            <button onClick={handleDescending}>descending</button>
            <select name={"rating"} onChange={handleRatingValue}>
                <option value={"0"}>0</option>
                <option value={"1"}>1</option>
                <option value={"2"}>2</option>
                <option value={"3"}>3</option>
                <option value={"4"}>4</option>
                <option value={"5"}>5</option>
            </select>
        </>
    )
}