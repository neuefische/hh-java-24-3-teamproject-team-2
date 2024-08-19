import './Searchbar.css'

export default function Searchbar({setSearchInput}: any) {
    return (
        <>
            <label className={"search-label"} htmlFor={"searchbar"}>
                <span className="material-symbols-outlined search-lense">search </span>
                <input className={"search-input"}
                       type={"text"}
                       name={"searchbar"}
                       placeholder={"Search for Title or Author"}
                       onChange={(event) => setSearchInput(event.target.value)}
                />
            </label>
        </>
    )
}

