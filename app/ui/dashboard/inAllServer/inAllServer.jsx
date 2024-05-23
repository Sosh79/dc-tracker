import Image from "next/image";
import SearchBar from "../searchbar/searchbar";
import Pagination from "../pagination/pagination";
import styles from "./inAllServer.module.css";
import { fetchGames } from "@/app/lib/data";

const InAllServer = async ({ q, page }) => {
    const { games, count } = await fetchGames(q, page);
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <SearchBar placeholder="Sarch for game..." />

            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Count</td>
                        <td>Positive</td>
                        <td>Negative</td>
                    </tr>
                </thead>
                {/* Games Name Start */}
                <tbody>
                    {games.map((game) => (
                        <tr key={game.id}>
                            <td><div className={styles.user}>
                                <Image src="/noavatar.png" alt="avatar"
                                    width={40}
                                    height={40}
                                    className={styles.avatar}
                                />
                                {game.name}
                            </div>
                            </td>
                            <td>{game.count}</td>
                            <td>{game.Positive}</td>
                            <td>{game.Negative}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination count={count} />
        </div>
    )
}

export default InAllServer;