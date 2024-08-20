import "./FilterPage.css";
import {ChangeEvent, Dispatch, SetStateAction} from "react";

type FilterPageProps = {
    selectedGenre: string,
    setSelectedGenre: (genre: string) => void,
    handleApplyFilter: () => void,
    setShowKeywordTag: Dispatch<SetStateAction<boolean>>
}

export default function FilterPage({ selectedGenre, setSelectedGenre, handleApplyFilter, setShowKeywordTag }: FilterPageProps) {

    //const [selectedGenre, setSelectedGenre] = useState<string>("Select");

    const genres : string[] = ["NONE", "FICTION", "MYSTERY", "THRILLER",
        "FANTASY", "SCIENCE", "NON_FICTION", "HISTORY", "NOVEL", "HISTORICAL_FICTION", "SCIENCE_FICTION",
        "ROMANCE", "YOUNG_ADULT", "ADVENTURE", "HORROR"];

    function formatGenre(genre :string): string {
        return genre.split('_').map((letter) => {
            return letter.charAt(0).toUpperCase() + letter.slice(1).toLowerCase();
        }).join(genre != "NON_FICTION" ? " " : "-");
    }

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedGenre(event.target.value);
    }

    const handleReset = () => {
        setSelectedGenre("Select");
        setShowKeywordTag(false);
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
                <button className={"delete-btn"} onClick={handleApplyFilter}>Apply</button>
            </div>

        </div>
    )
}