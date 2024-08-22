import "./FilterForm.css";
import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState} from "react";
import {formatEnum} from "../../../../utils/utilFunctions.ts";
import {GENRES, STAR_RATINGS} from "../../../../utils/utilConstants.ts";

type FilterPageProps = {
    selectedGenre: string,
    setSelectedGenre: Dispatch<SetStateAction<string>>,
    handleApplyFilter: (genre: string) => void,
    setShowKeywordTag: Dispatch<SetStateAction<boolean>>,
    ratingFilter: number | null,
    setRatingFilter: Dispatch<SetStateAction<number | null>>
}

type Filter = {
    genre: string,
    rating: number | null
}

export default function FilterForm({selectedGenre, setSelectedGenre, handleApplyFilter, ratingFilter, setRatingFilter, setShowKeywordTag }: FilterPageProps) {
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [genre, setGenre] = useState<string>('Select');
    const [filter, setFilter] = useState<Filter>({genre:"Select", rating: null})

    useEffect(()=> {
        setFilter({genre: selectedGenre, rating: ratingFilter})
    } ,[])

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        // setGenre(event.target.value);
        setFilter({...filter, [event.target.name]: event.target.value});
        setIsDisabled(false);
    }

    const handleReset = () => {
        setGenre("Select");
        setSelectedGenre("Select");
        setRatingFilter(null);
        setShowKeywordTag(false);
        setIsDisabled(true);
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setSelectedGenre(filter.genre);
        setRatingFilter(filter.rating ? filter.rating : null)
        handleApplyFilter(filter.genre);
        handleApplyFilter(STAR_RATINGS[Number(filter.rating)]);
    }

    return (
        <div className={"filter-content"}>
            <form className={"filter-body"} onSubmit={handleSubmit}>
                <label className={"book-label"} htmlFor={"genre"}>Genre</label>
                <select
                    name={"genre"}
                    onChange={handleChange}
                    value={filter.genre}
                >
                    <option>{formatEnum(genre)}</option>
                    {GENRES.map((genre) => (
                        <option key={genre} value={genre}>
                            {formatEnum(genre)}
                        </option>
                    ))}
                </select>
                <label htmlFor={"rating"} className={"book-label"}>Rating</label>
                <select name={"rating"} onChange={handleChange} value={filter.rating ? filter.rating : undefined}>
                    <option >All</option>
                    <option value={0}>☆☆☆☆☆</option>
                    <option value={1}>★☆☆☆☆</option>
                    <option value={2}>★★☆☆☆</option>
                    <option value={3}>★★★☆☆</option>
                    <option value={4}>★★★★☆</option>
                    <option value={5}>★★★★★</option>
                </select>
                <div className={"filter-buttons"}>
                    <button
                        type={"reset"}
                        className={"reset-btn"}
                        onClick={handleReset}
                    >Reset
                    </button>
                    <button
                        type={"submit"}
                        className={"apply-btn"}
                        disabled={isDisabled}
                    >Apply
                    </button>
                </div>
            </form>
        </div>
    )
}