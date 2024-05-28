import { GoGraph } from "react-icons/go";
import styles from "./most.module.css";
import { fetchGamesRate } from "@/app/lib/data";

const Most = async (nr) => {
    const rateOfGames = await fetchGamesRate(nr);

    // Check if rateOfGames is empty or contains undefined values
    if (!rateOfGames || rateOfGames.length === 0 || !rateOfGames[0]) {
        return (
            <div className={styles.container}>
                <GoGraph size={24} />
                <div className={styles.texts}>
                    <span className={styles.title}>No data available</span>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <GoGraph size={24} />
            {rateOfGames.map((rate) => (
                <div className={styles.texts} key={rate.id}>
                    <span className={styles.title}>{rate.name}</span>
                    <span className={styles.number}>{rate.count}</span>
                    <span className={styles.detail}>
                        Popularity.
                    </span>
                </div>
            ))}
        </div>
    );
};

export default Most;
