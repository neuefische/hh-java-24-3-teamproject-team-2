import {Book, NewBook} from "../../types/types.ts";
import {ChangeEvent, FormEvent} from "react";
import "./BookForm.css";

type BookFormProps = {
    book: Book | NewBook,
    setBook: (book: Book | NewBook) => void,
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void,
    action: string,
    editable: boolean
}

/* not sure whether to use this, then genres would be of type Genre
type Genre = "NONE" | "FICTION" | "MYSTERY" | "THRILLER" |
    "FANTASY" | "SCIENCE" | "NON_FICTION" | "HISTORY" |
    "NOVEL" | "HISTORICAL_FICTION" | "SCIENCE_FICTION" |
    "ROMANCE" | "YOUNG_ADULT" | "ADVENTURE" | "HORROR";*/

export default function BookForm({book, setBook, handleSubmit, action, editable}: Readonly<BookFormProps>) {
    const genres : string[] = ["NONE", "FICTION", "MYSTERY", "THRILLER",
    "FANTASY", "SCIENCE", "NON_FICTION", "HISTORY", "NOVEL", "HISTORICAL_FICTION", "SCIENCE_FICTION",
    "ROMANCE", "YOUNG_ADULT", "ADVENTURE", "HORROR"];

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>): void {
        setBook({...book, [event.target.name]: event.target.value})
    }

    function formatGenre(genre :string): string {
        return genre.split('_').map((letter) => {
            return letter.charAt(0).toUpperCase() + letter.slice(1).toLowerCase();
        }).join(genre != "NON_FICTION" ? " " : "-");
    }

    return (
        <form onSubmit={handleSubmit} className={"book-form"}>
            <div className={`book-info`}>
                <label className={"book-label align-right"} htmlFor={"title"}>Title</label>
                <input
                    type={"text"}
                    name={"title"}
                    value={book.title}
                    onChange={handleChange}
                    required={true}
                    disabled={!editable}
                />
            </div>
            <div className={`book-info`}>
                <label className={"book-label align-right"} htmlFor={"author"}>Author</label>
                <input
                    type={"text"}
                    name={"author"}
                    value={book.author}
                    onChange={handleChange}
                    required={true}
                    disabled={!editable}
                />
            </div>
            <div className={`book-info`}>

                <label className={"book-label align-right"} htmlFor={"description"}>Description</label>
                <textarea rows={5} cols={30}
                          name="description"
                          value={book.description}
                          onChange={handleChange}
                          required={true}
                          disabled={!editable}
                />
            </div>
            <div className={`book-info`}>
                <label className={"book-label align-right"} htmlFor={"genre"}>Genre</label>
                <select required={true} value={book.genre} onChange={handleChange} name={"genre"}
                        disabled={!editable}>
                    {genres.map((genre) => (
                        <option key={genre} value={genre}>
                            {formatGenre(genre)}
                        </option>
                    ))}
                </select>
            </div>
            <div className={`book-info`}>
                <label htmlFor={"isbn"} className={"book-label align-right"}>ISBN</label>
                <input
                    type="text"
                    name="isbn"
                    value={book.isbn}
                    onChange={handleChange}
                    required={true}
                    disabled={!editable}
                />
            </div>
            <div className={`book-info`}>
                <label htmlFor={"cover"} className={"book-label align-right"}>Cover</label>
                <input
                    type="text"
                    name="cover"
                    value={book.cover}
                    onChange={handleChange}
                    required={true}
                    disabled={!editable}
                />
            </div>
            <div className={`book-info`}>
                <label htmlFor={"publicationDate"} className={"book-label align-right"}>Publication Date</label>
                <input
                    type={"date"}
                    name={"publicationDate"}
                    value={book.publicationDate}
                    onChange={handleChange}
                    required={true}
                    disabled={!editable}
                />
            </div>
            {editable && <button type={"submit"}>{action}</button>}
        </form>

)

}