import './Searchbar.css'

export default function Searchbar({setSearchInput}: any) {
    return (
        <>
            <label htmlFor={"searchbar"}>Search:
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

