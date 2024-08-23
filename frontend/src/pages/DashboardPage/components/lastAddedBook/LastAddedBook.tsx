import "./LastAddedBook.css";
import {Book} from "../../../../types/types.ts";

type LastAddedBookProps = {
    data: Book[]
}

export default function LastAddedBook({data}: LastAddedBookProps) {

    const sortedBooks = [...data].sort((a, b) =>
        new Date(b?.createdDate).getTime() - new Date(a?.createdDate).getTime()
    ).slice(0, 4);

    return (
        <div className={"dashboard-recent-books"}>
            <section className={"dashboard-last-added-book"}>
                <h3 className={"section-title"}>Recently Added Books</h3>
                <div className={"books-cover-title-container"}>
                {sortedBooks.map(book =>
                    <div className={"books-cover-title"} key={book.id}>
                        <img className={"book-cover"} alt={`${book.title} Book Cover`} src={`${book.cover}`}/>
                        <h4 className={"book-title"}>{book.title}</h4>
                    </div>
                )}
                </div>
            </section>
        </div>
    )
}