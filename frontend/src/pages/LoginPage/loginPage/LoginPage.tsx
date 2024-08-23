type LoginPageProps = {
    login: () => void;
}

export default function LoginPage({login}: LoginPageProps) {
    return (
        <>
            <h2>Login</h2>
            <button onClick={login}>Login with GitHub</button>
        </>
    )
}