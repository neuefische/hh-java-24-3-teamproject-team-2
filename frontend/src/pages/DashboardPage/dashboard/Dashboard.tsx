import GreetingAndGoal from "../components/greeting/GoalAndSummary.tsx";

import {Book, User} from "../../../types/types.ts";
import LastAddedBook from "../components/lastAddedBook/LastAddedBook.tsx";

type DashboardProps = {
    user: User,
    data: Book[]
}

export default function Dashboard({user, data}: DashboardProps) {

    return (
        <div id={"DashboardPage"}>
            <h2 style={{paddingLeft: "15px"}}>Welcome to TaleTrail, <em>{user.userName}</em>!</h2>
            <GreetingAndGoal user={user} data={data}/>
            <LastAddedBook data={data}/>
        </div>
    );
}
