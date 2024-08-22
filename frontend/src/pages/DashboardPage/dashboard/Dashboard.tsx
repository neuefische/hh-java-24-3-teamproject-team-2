import Greeting from "../components/greeting/Greeting.tsx";
import Summary from "../components/summary/Summary.tsx";

import {User} from "../../../types/types.ts"
import ReadingGoal from "../readingGoal/ReadingGoal.tsx";

type DashboardProps = {
    user: User
}

export default function Dashboard({user}: DashboardProps) {


    return (
        <div id={"DashboardPage"}>
            <h2>Hello {user.userName}</h2>
            <ReadingGoal readBooks={user.readBooks} goalDate={user.goalDate} readingGoal={user.readingGoal}/>
            <Greeting/>
            <Summary/>
        </div>
    );
}
