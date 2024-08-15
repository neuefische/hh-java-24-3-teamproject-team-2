import './EditForm.css'
import {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";


type FormData = {
    title?: string,
    author?: string,
    description?: string,
    genre?: string,
    isbn?: string,
    cover?: string,
    id?: string

}

export default function EditForm() {


    const [formData, setFormData] = useState<FormData>()

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setFormData({
            ...formData, [name]: value
        });
    }

// wenn ein feld nicht bearbeitet wird dasnn die alten daten uebernehmen nicht ueberschreiben mit leerem string
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            const response = await axios.put(`/api/books/${book.id}/update`, formData);
            console.log('Update successful:', response.data);
        } catch (error) {
            console.error('Update failed:', error);
        }
        console.log(formData)
    }

    function onCancel() {
        console.log("cancel")
    }

    return (

        <form onSubmit={onSubmit}>
            <label>Title: <input placeholder={"Title"} type="text" name="title" onChange={handleChange}/></label>
            <label>Author: <input placeholder={"Author"} type="text" name="author" onChange={handleChange}/></label>
            <label>Description: </label>
            <textarea rows={5} cols={30} placeholder={"Description"} name="description" onChange={handleChange}/>
            <label>Genre: <input placeholder={"Genre"} type="text" name="genre" onChange={handleChange}/></label>
            <label>ISBN: <input placeholder={"ISBN"} type="text" name="isbn" onChange={handleChange}/></label>
            <label>Cover: <input placeholder={"Cover"} type="text" name="cover" onChange={handleChange}/></label>
            <div>
                <button type={"submit"}>Submit</button>
                <button onClick={onCancel} type={"button"}>Cancel</button>
            </div>
        </form>

    )
}