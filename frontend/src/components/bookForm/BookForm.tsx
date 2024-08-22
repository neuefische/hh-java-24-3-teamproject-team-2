import {BookWithoutId} from "../../types/types.ts";
import {ChangeEvent, Dispatch, FormEvent, SetStateAction} from "react";
import "./BookForm.css";
import {formatEnum} from "../../utils/utilFunctions.ts";
import {GENRES, READING_STATUSES} from "../../utils/utilConstants.ts";

type BookFormProps = {
    book: BookWithoutId,
    setBook: Dispatch<SetStateAction<BookWithoutId>>,
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void,
    action: string,
    editable: boolean
}

export default function BookForm({book, setBook, handleSubmit, action, editable}: Readonly<BookFormProps>) {

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>): void {
        setBook({...book, [event.target.name]: event.target.value})
    }

    return (
        <form onSubmit={handleSubmit} className={"book-form"}>
            <div className={`book-info`}>
                <label className={"book-label align-right"} htmlFor={"readingStatus"}>Reading Status</label>
                <select required={true} value={book.readingStatus} onChange={handleChange} name={"readingStatus"} disabled={!editable}>
                    {READING_STATUSES.map((status) => (
                        <option key={status} value={status}>{formatEnum(status)}</option>
                    ))}
                </select>
            </div>
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
                    {GENRES.map((genre) => (
                        <option key={genre} value={genre}>
                            {formatEnum(genre)}
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