import "./FilterPage.css";

export default function FilterPage() {
    const genres : string[] = ["NONE", "FICTION", "MYSTERY", "THRILLER",
        "FANTASY", "SCIENCE", "NON_FICTION", "HISTORY", "NOVEL", "HISTORICAL_FICTION", "SCIENCE_FICTION",
        "ROMANCE", "YOUNG_ADULT", "ADVENTURE", "HORROR"];

    function formatGenre(genre :string): string {
        return genre.split('_').map((letter) => {
            return letter.charAt(0).toUpperCase() + letter.slice(1).toLowerCase();
        }).join(genre != "NON_FICTION" ? " " : "-");
    }

    return (
        <div className={"filter-content"}>
            <div className={"filter-body"}>
                <label>Genre</label>
                <select
                    name={"filter"}
                    id={"filter"}
                >
                    {genres.map((genre) => (
                        <option key={genre} value={genre}>
                            {formatGenre(genre)}
                        </option>
                    ))}
                </select>
            </div>
            <div className={"filter-buttons"}>
                {/*<button className={"close-btn"} onClick={handleClick}>x</button>*/}
                <button className={"close-btn"}>Reset</button>
                <button className={"delete-btn"}>Apply</button>
            </div>

        </div>
    )
}