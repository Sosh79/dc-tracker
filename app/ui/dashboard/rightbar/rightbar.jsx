import { FaRegCirclePlay } from "react-icons/fa6";
import { RiGitRepositoryFill } from "react-icons/ri";
import Image from "next/image";
import styles from "./rightbar.module.css";

const Rightbar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <div className={styles.bgContainer}>
                    <Image className={styles.bg} src="/GitHub.svg" alt="" fill />
                </div>
                <div className={styles.text}>
                    <span className={styles.notification}>✨ Available now</span>
                    <h3 className={styles.title}>Get the updated code</h3>
                    <span className={styles.subtitle}>Github</span>
                    <p className={styles.desc}>Check if there is a new update for bot.</p>
                    <a target="_blank" href="https://github.com/Sosh79/dc-tracker">
                        <button className={styles.button}>
                            <RiGitRepositoryFill />
                            Learn
                        </button>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Rightbar;