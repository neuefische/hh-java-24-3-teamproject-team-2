import "./FilterPage.css";
import {ChangeEvent} from "react";

type FilterPageProps = {
    selectedGenre: string,
    setSelectedGenre: (genre: string) => void,
    handleApplyFilter: () => void
}

export default function FilterPage({ selectedGenre, setSelectedGenre, handleApplyFilter }: FilterPageProps) {

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
    }

    return (
        <div className={"filter-content"}>
            <div className={"filter-body"}>
                <label>Genre</label>
                <select
                    name={"genre"}
                    onChange={handleChange}
                    value={selectedGenre}
                >
                    <option  >{formatGenre(selectedGenre)}</option>
                    {genres.map((genre) => (
                        <option key={genre} value={genre}>
                            {formatGenre(genre)}
                        </option>
                    ))}
                </select>
            </div>
            <div className={"filter-buttons"}>
                <button className={"reset-btn"} onClick={handleReset}>Reset</button>
                <button className={"delete-btn"} onClick={handleApplyFilter}>Apply</button>
            </div>

        </div>
    )
}