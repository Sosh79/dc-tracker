"use client"
import Link from "next/link"
import styles from './ui/error/error.module.css';

export default function Error() {
    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <h1 className={styles.title}>Error</h1>
                <p className={styles.discription}>Oops, There is an error in the process.</p>
                <Link
                    href="/dashboard"
                    className={styles.link}
                >
                    Go back dashboard
                </Link>
            </div>
        </div>
    )
}
