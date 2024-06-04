import Link from "next/link"
import styles from './homepage.module.css';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1 className={styles.title}>Spy Discord Bot</h1>
        <p className={styles.description}>
          Spy is a powerful Discord bot that helps you
          monitor your server and manage your members.
        </p>
        <Link
          href="/login"
          className={styles.link}>Go to Login</Link>
      </div>

    </div>
  )
}