import styles from '@/app/ui/login/login.module.css';
import LoginForm from '@/app/ui/login/LoginForm/loginForm';

const LoginPage = () => {
    return (
        <div className={styles.container}>
            <LoginForm />
        </div>
    );
};

export default LoginPage;