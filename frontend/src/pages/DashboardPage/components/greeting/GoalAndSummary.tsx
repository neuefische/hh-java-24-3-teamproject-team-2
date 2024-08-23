import "./GoalAndSummary.css";
import ReadingGoal from "../../readingGoal/ReadingGoal.tsx";
import {Book, User} from "../../../../types/types.ts";
import Summary from "../summary/Summary.tsx";

type GreetingProps = {
    user: User,
    data: Book[]

}

export default function GoalAndSummary({user, data}: GreetingProps) {
    return (
        <>
            <div className={"dashboard-goal-summary"}>
                <ReadingGoal readBooks={user.readBooks} goalDate={user.goalDate} readingGoal={user.readingGoal}/>
                <Summary data={data} />
            </div>
        </>
    )
}