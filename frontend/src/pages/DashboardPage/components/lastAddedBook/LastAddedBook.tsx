import "./LastAddedBook.css";
import {Book} from "../../../../types/types.ts";

type LastAddedBookProps = {
    data: Book[]
}

export default function LastAddedBook({data}: LastAddedBookProps) {
console.log(new Date(data[0]?.createdDate));

    const sortedBooks = data?.sort((a, b) =>
        new Date(b?.createdDate).getTime() - new Date(a?.createdDate).getTime()
    ).slice(0, 4);

    return (
        <div className={"dashboard-last-added-book"}>
            <h3 className={"section-title"}>Recently Added Books</h3>
            <div className={"recently-added-books"}>
            {sortedBooks.map(book =>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                    <img className={"cover-in-dashboard"} alt={`${book.title} Book Cover`} src={`${book.cover}`}/>
                    <h4 style={{textAlign: "center", maxWidth: "150px"}}>{book.title}</h4>
                </div>
            )}
            </div>
        </div>
    )
}