import GreetingAndGoal from "../components/greeting/GreetingAndGoal.tsx";
import Summary from "../components/summary/Summary.tsx";

import {User} from "../../../types/types.ts";

type DashboardProps = {
    user: User
}

export default function Dashboard({user}: DashboardProps) {

    return (
        <div id={"DashboardPage"}>
            <GreetingAndGoal user={user}/>
            <Summary/>
        </div>
    );
}
