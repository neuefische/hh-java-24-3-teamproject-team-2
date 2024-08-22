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

export default function FilterPage({ setSelectedGenre, handleApplyFilter, setShowKeywordTag }: FilterPageProps) {
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [genre, setGenre] = useState<string>('Select');

    const genres: Genre[] = ["NONE", "FICTION", "MYSTERY", "THRILLER",
        "FANTASY", "SCIENCE", "NON_FICTION", "HISTORY", "NOVEL", "HISTORICAL_FICTION", "SCIENCE_FICTION",
        "ROMANCE", "YOUNG_ADULT", "ADVENTURE", "HORROR"];

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setGenre(event.target.value);
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
                <label className={"filter-label"}>Genre</label>
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
                <div className={"filter-buttons"}>
                    <button
                        type={"reset"}
                        className={"reset-btn"}
                        onClick={handleReset}
                    >Reset</button>
                    <button
                        type={"submit"}
                        className={"apply-btn"}
                        disabled={isDisabled}
                    >Apply</button>
                </div>
            </form>
        </div>
    )
}