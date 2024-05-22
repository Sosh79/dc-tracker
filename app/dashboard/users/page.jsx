import styles from "@/app/ui/dashboard/users/users.module.css";
import SearchBar from "@/app/ui/dashboard/searchbar/searchbar";
import Image from "next/image";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { fetchUser } from "@/app/lib/data";

const UsersPage = async () => {
    const users = await fetchUser();
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <SearchBar placeholder="Sarch for admin..." />

            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>DiscordId</td>
                        <td>Created At</td>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td><div className={styles.user}>
                                <Image src={user.img || "/noavatar.png"} alt="avatar"
                                    width={40}
                                    height={40}
                                    className={styles.avatar}
                                />
                                {user.username}
                            </div>
                            </td>
                            <td>{user.discordId}</td>
                            <td>{user.createdAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination />
        </div>
    )
}

export default UsersPage;