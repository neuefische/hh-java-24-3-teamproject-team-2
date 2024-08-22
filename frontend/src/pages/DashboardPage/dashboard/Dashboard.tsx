import GreetingAndGoal from "../components/greeting/GreetingAndGoal.tsx";
import Summary from "../components/summary/Summary.tsx";

import {Book, User} from "../../../types/types.ts";
import LastAddedBook from "../components/lastAddedBook/LastAddedBook.tsx";

type DashboardProps = {
    user: User,
    data: Book[]
}

export default function Dashboard({user, data}: DashboardProps) {

    return (
        <div id={"DashboardPage"}>
            <GreetingAndGoal user={user}/>
            <Summary data={data}/>
            <LastAddedBook data={data}/>
        </div>
    );
}
