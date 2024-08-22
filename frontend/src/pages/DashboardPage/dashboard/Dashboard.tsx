import Greeting from "../components/greeting/Greeting.tsx";
import Summary from "../components/summary/Summary.tsx";

export default function Dashboard() {
    return (
        <div id={"DashboardPage"}>
            <Greeting />
            <Summary />
        </div>
    );
}
