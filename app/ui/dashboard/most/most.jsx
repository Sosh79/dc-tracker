import { GoGraph } from "react-icons/go";
import styles from "./most.module.css";
const Most = () => {
    return (
        <div className={styles.container}>
            <GoGraph size={24} />
            <div className={styles.texts}>
                <span className={styles.title}>Counter strike</span>
                <span className={styles.number}>5754</span>
                <span className={styles.detail}>
                    <span className={styles.positive}>20%</span> Popularity rate.
                </span>
            </div>
        </div>
    )
}

export default Most;