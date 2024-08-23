import "./Dashboard.css";
import GreetingAndGoal from "../components/greeting/GoalAndSummary.tsx";
import {Book, User} from "../../../types/types.ts";
import LastAddedBook from "../components/lastAddedBook/LastAddedBook.tsx";

type DashboardProps = {
    user: User | null | undefined,
    data: Book[]
}

export default function Dashboard({user, data}: DashboardProps) {

    return (
        <div id={"dashboard-page"}>
            <h2>Welcome to TaleTrail{user && `, ${user.userName}!`}</h2>
            <div>
                {user && <GreetingAndGoal user={user} data={data}/>}
                <LastAddedBook data={data}/>
            </div>
        </div>
    );
}
