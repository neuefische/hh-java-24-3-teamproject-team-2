import {useEffect} from "react";

type DashboardProps = {
    user: string,
    loadUser: () => void;
}
export default function Dashboard({user, loadUser}:DashboardProps) {
    useEffect(() => {
        loadUser()
    },[])

    return (
        <div>
            {user && <h2>Hello {user}</h2>}
        </div>
    );
}
