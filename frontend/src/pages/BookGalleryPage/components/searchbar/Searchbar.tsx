import './Searchbar.css'

export default function Searchbar({setSearchInput}: any) {
    return (
        <>
            <label htmlFor={"searchbar"}>Search: <span className="material-symbols-outlined">
search
</span>
                <input
                    type={"text"}
                    name={"searchbar"}
                    placeholder={"Search for Title or Author"}
                    onChange={(event) => setSearchInput(event.target.value)}
                />
            </label>
        </>
    )
}

