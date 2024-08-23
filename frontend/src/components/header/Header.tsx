import "./Header.css";
import {Link} from "react-router-dom";
import {User} from "../../types/types.ts";

type HeaderProps = {
    user: User | null | undefined,
    logout: () => void
}
export default function Header({user, logout}: HeaderProps) {
    return (
        <header>
            <div>
                <img id={"logo"} src={"/book.svg"} alt={"Book Logo"}/>
                <h1>TaleTrail</h1>
                <p id={"tag-line"}>Discover, Track, Repeat ( ͡° ͜ʖ ͡°)</p>
            </div>
            <div className={"profile"}>
                {user ? <button onClick={logout} ><span className="material-symbols-outlined">
logout
</span>Logout</button> : user === null && <Link to={"/login"} className={"book-button"}><span className="material-symbols-outlined">
login
</span>Login</Link>}
            </div>
        </header>
    )
}