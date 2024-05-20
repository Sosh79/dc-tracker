import { FaRegCirclePlay } from "react-icons/fa6";
import { RiGitRepositoryFill } from "react-icons/ri";
import Image from "next/image";
import styles from "./rightbar.module.css";

const Rightbar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <div className={styles.bgContainer}>
                    <Image className={styles.bg} src="/YouTube.svg" alt="" fill />
                </div>
                <div className={styles.text}>
                    <span className={styles.notification}>✨ Coming soon</span>
                    <h3 className={styles.title}>How to use discord-bot analyzer?</h3>
                    <span className={styles.subtitle}>YouTube</span>
                    <p className={styles.desc}>Learn how to operate and use this bot.</p>
                    <a target="_blank" href="">
                        <button className={styles.button}>
                            <FaRegCirclePlay />
                            Watch
                        </button>
                    </a>
                </div>
            </div>
            <div className={styles.item}>
                <div className={styles.bgContainer}>
                    <Image className={styles.bg} src="/GitHub.svg" alt="" fill />
                </div>
                <div className={styles.text}>
                    <span className={styles.notification}>✨ Available now</span>
                    <h3 className={styles.title}>Get the updated code</h3>
                    <span className={styles.subtitle}>Github</span>
                    <p className={styles.desc}>Check if there is a new update for bot.</p>
                    <a target="_blank" href="https://github.com/Sosh79/discord-bot">
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