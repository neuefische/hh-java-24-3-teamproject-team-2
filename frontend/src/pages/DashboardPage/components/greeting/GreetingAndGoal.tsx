import "./GreetingAndGoal.css";
import ReadingGoal from "../../readingGoal/ReadingGoal.tsx";
import {User} from "../../../../types/types.ts";

type GreetingProps = {
    user: User
}

export default function GreetingAndGoal({user}: GreetingProps) {
    return (
        <div className={"dashboard-greeting"}>
            <p className={"greeting-message"}>Welcome to TaleTrail, <em>{user.userName}</em>!</p>
            <ReadingGoal readBooks={user.readBooks} goalDate={user.goalDate} readingGoal={user.readingGoal}/>
        </div>
    )
}