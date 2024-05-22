import styles from './loginForm.module.css';
const LoginForm = () => {
    return (
        <form action="" className={styles.form}>
            <h1>Login</h1>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button>Login</button>
        </form>
    )
}

export default LoginForm;