import "./Header.css";

export default function Header() {
    return (
        <header>
            <div>
                <img id={"logo"} src={"/book.svg"} alt={"Book Logo"}/>
                <h1>TaleTrail</h1>
                <p id={"tag-line"}>Discover, Track, Repeat ( ͡° ͜ʖ ͡°)</p>
            </div>
        </header>
    )
}