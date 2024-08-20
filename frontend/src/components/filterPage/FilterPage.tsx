import "./FilterPage.css";
import {ChangeEvent, Dispatch, SetStateAction, useState} from "react";
import {formatGenre} from "../functions/FormatGenre.ts";

type FilterPageProps = {
    selectedGenre: string,
    setSelectedGenre: (genre: string) => void,
    handleApplyFilter: () => void,
    setShowKeywordTag: Dispatch<SetStateAction<boolean>>
}

export default function FilterPage({ selectedGenre, setSelectedGenre, handleApplyFilter, setShowKeywordTag }: FilterPageProps) {
    const [isDisable, setIsDisable] = useState<boolean>(true);

    const genres : string[] = ["NONE", "FICTION", "MYSTERY", "THRILLER",
        "FANTASY", "SCIENCE", "NON_FICTION", "HISTORY", "NOVEL", "HISTORICAL_FICTION", "SCIENCE_FICTION",
        "ROMANCE", "YOUNG_ADULT", "ADVENTURE", "HORROR"];

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedGenre(event.target.value);
        setIsDisable(false);
    }

    const handleReset = () => {
        setSelectedGenre("Select");
        setShowKeywordTag(false);
        setIsDisable(true);
    }

    return (
        <div className={"filter-content"}>
            <form className={"filter-body"}>
                    <label className={"filter-label"}>Genre</label>
                    <select
                        name={"genre"}
                        onChange={handleChange}
                        value={selectedGenre}
                    >
                        <option>{formatGenre(selectedGenre)}</option>
                        {genres.map((genre) => (
                            <option key={genre} value={genre}>
                                {formatGenre(genre)}
                            </option>
                        ))}
                    </select>
            </form>
            <div className={"filter-buttons"}>
                <button className={"reset-btn"} onClick={handleReset}>Reset</button>
                <button
                    className={"apply-btn"}
                    onClick={handleApplyFilter}
                    disabled={isDisable}
                >Apply</button>
            </div>

        </div>
    )
}