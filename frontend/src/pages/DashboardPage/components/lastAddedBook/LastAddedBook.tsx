import "./LastAddedBook.css";
import {Book} from "../../../../types/types.ts";

type LastAddedBookProps = {
    data: Book[]
}

export default function LastAddedBook({data}: LastAddedBookProps) {
console.log(new Date(data[0]?.createdDate));

    const sortedBooks = data?.sort((a, b) => new Date(b?.createdDate).getTime() - new Date(a?.createdDate).getTime());

    return (
        <div className={"dashboard-last-added-book"}>
            <h2 className={"section-title"}>Recently Added Books</h2>
            {sortedBooks.map(book =>
                <>
                    <div>{book.cover}</div>
                    <div>{book.title}</div>
                </>
            )}

        </div>
    )
}