import "./Navigation.css"
import {Link} from "react-router-dom";

export default function Navigation() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to={"/"}><span className="material-symbols-outlined">home</span>Dashboard</Link>
                </li>
                <li>
                    <Link to={"/books"}><span className="material-symbols-outlined">auto_stories</span>All Books</Link>
                </li>
                <li>
                    <Link to={"/books/add"}><span className="material-symbols-outlined">add_circle</span>Add Book</Link>
                </li>
                <li>
                    <Link to={"/settings"}><span className="material-symbols-outlined">settings</span>Settings</Link>
                </li>
            </ul>
        </nav>
    )
}