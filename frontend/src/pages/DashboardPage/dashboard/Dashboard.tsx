
import {User} from "../../../types/types.ts"
import ReadingGoal from "../readingGoal/ReadingGoal.tsx";

type DashboardProps = {
    user: User
}

export default function Dashboard({user}: DashboardProps) {


    return (
        <>
            <h2>Hello {user.userName}</h2>
            <ReadingGoal readBooks={user.readBooks} goalDate={user.goalDate} readingGoal={user.readingGoal}/>
        </>
    );
}
