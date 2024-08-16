import "./Navigation.css"
import {Link} from "react-router-dom";

export default function Navigation() {
    return (
        <>
            <ul>
                <li><Link to={"/books"}>All Books</Link></li>
                <li><Link to={"/books/add"}>Add Book</Link></li>
            </ul>
        </>
    )
}