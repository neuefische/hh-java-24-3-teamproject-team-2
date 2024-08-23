import {User} from "../../../types/types.ts";
import {ChangeEvent, FormEvent, useState} from "react";
import './SettingsPage.css'

type SettingsPageProps = {
    user: User,
    updateUser: (updatedProperty: string, updatedValue: string | number) => void
}

export default function SettingsPage({user, updateUser}: SettingsPageProps) {

    const [formData, setFormData] = useState({
        readingGoal: user.readingGoal,
        goalDate: user.goalDate
    });

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        updateUser("readingGoal", formData.readingGoal);
        updateUser("goalDate", formData.goalDate);
    }

    return (
        <>
            <h2>Settings</h2>
            <h3>{user.userName}</h3>
            <form className={"settingsPageForm"} onSubmit={handleSubmit}>
                <label htmlFor={"readingGoal"} className={"book-label"}>Reading Goal: </label>
                <input
                    name="readingGoal"
                    type="number"
                    value={formData.readingGoal}
                    onChange={handleChange}
                />
                <label htmlFor={"goalDate"} className={"book-label"}>Goal Date: </label>
                <input
                    type="date"
                    name="goalDate"
                    value={formData.goalDate}
                    onChange={handleChange}
                />
                <button type={"submit"}>Update</button>
            </form>
            <h3>Created By</h3>
            <p>Eva Goetzke</p>
            <p>Marcel Herr</p>
            <p>Rinae Hyun</p>
            <p>Simon Staß</p>
        </>
    )
}