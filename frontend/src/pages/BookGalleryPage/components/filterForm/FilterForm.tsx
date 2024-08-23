import "./FilterForm.css";
import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState} from "react";
import {formatEnum} from "../../../../utils/utilFunctions.ts";
import {GENRES, STAR_RATINGS} from "../../../../utils/utilConstants.ts";
import {Filter} from "../../../../types/types.ts";

type FilterPageProps = {
    selectedFilter: Filter,
    setSelectedFilter: Dispatch<SetStateAction<Filter>>,
    handleApplyFilter: (filter: Filter) => void,
    setShowFilterTag: Dispatch<SetStateAction<boolean>>,
}

export default function FilterForm({selectedFilter, setSelectedFilter, handleApplyFilter, setShowFilterTag }: FilterPageProps) {
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [filter, setFilter] = useState<Filter>({genre:undefined, rating: undefined})

    useEffect(()=> {
        setFilter({genre: selectedFilter.genre, rating: selectedFilter.rating})
    } ,[])

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setFilter({...filter, [event.target.name]: event.target.value});
        setIsDisabled(false);
    }

    const handleReset = () => {
        setSelectedFilter({genre: undefined, rating: undefined})
        setShowFilterTag(false);
        setIsDisabled(true);
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setSelectedFilter({genre: filter.genre, rating: filter.rating})
        handleApplyFilter(filter)
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
                    <option>All</option>
                    {GENRES.map((genre) => (
                        <option key={genre} value={genre}>
                            {formatEnum(genre)}
                        </option>
                    ))}
                </select>
                <label htmlFor={"rating"} className={"book-label"}>Rating</label>
                <select name={"rating"} onChange={handleChange} value={filter.rating}>
                    <option >All</option>
                    {STAR_RATINGS.map((rating, index) =>
                        <option key={`rating-${index}`} value={index}>
                            {rating}
                        </option>
                    )}
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