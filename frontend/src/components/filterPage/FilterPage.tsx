import "./FilterPage.css";
import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useState} from "react";
import {formatEnum} from "../../utils/utilFunctions.ts";
import {Genre} from "../../types/types.ts";

type FilterPageProps = {
    selectedGenre: string,
    setSelectedGenre: (genre: string) => void,
    handleApplyFilter: (genre: string) => void,
    setShowKeywordTag: Dispatch<SetStateAction<boolean>>
}

type Filter = {
    genre: string,
    rating: string
}

export default function FilterPage({ setSelectedGenre, handleApplyFilter, setShowKeywordTag }: FilterPageProps) {
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [genre, setGenre] = useState<string>('Select');
    const [filter, setFilter] = useState<Filter>({genre:"Select", rating: ""})

    const genres: Genre[] = ["NONE", "FICTION", "MYSTERY", "THRILLER",
        "FANTASY", "SCIENCE", "NON_FICTION", "HISTORY", "NOVEL", "HISTORICAL_FICTION", "SCIENCE_FICTION",
        "ROMANCE", "YOUNG_ADULT", "ADVENTURE", "HORROR"];

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        // setGenre(event.target.value);
        setFilter({...filter, [event.target.name]: event.target.value})
        setIsDisabled(false);
    }

    const handleReset = () => {
        setGenre("Select");
        setSelectedGenre("Select");
        setShowKeywordTag(false);
        setIsDisabled(true);
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setSelectedGenre(genre);
        handleApplyFilter(genre);
    }

    return (
        <div className={"filter-content"}>
            <form className={"filter-body"} onSubmit={handleSubmit}>
                <label className={"book-label"} htmlFor={"genre"}>Genre</label>
                <select
                    name={"genre"}
                    onChange={handleChange}
                    value={genre}
                >
                    <option>{formatEnum(genre)}</option>
                    {genres.map((genre) => (
                        <option key={genre} value={genre}>
                            {formatEnum(genre)}
                        </option>
                    ))}
                </select>
                <label htmlFor={"rating"} className={"book-label"}>Rating</label>
                <select name={"rating"} onChange={handleChange}>
                    <option value={"All"}>All</option>
                    <option value={"0"}>☆☆☆☆☆</option>
                    <option value={"1"}>★☆☆☆☆</option>
                    <option value={"2"}>★★☆☆☆</option>
                    <option value={"3"}>★★★☆☆</option>
                    <option value={"4"}>★★★★☆</option>
                    <option value={"5"}>★★★★★</option>
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