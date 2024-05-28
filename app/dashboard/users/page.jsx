import styles from "@/app/ui/dashboard/users/users.module.css";
import SearchBar from "@/app/ui/dashboard/searchbar/searchbar";
import Image from "next/image";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { fetchUser } from "@/app/lib/data";

const UsersPage = async ({ searchParams }) => {
    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;
    const { users, count } = await fetchUser(q, page)
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
                                <Image src={user.avatar || "/noavatar.png"} alt="avatar"
                                    width={40}
                                    height={40}
                                    className={styles.avatar}
                                />
                                {user.username}
                            </div>
                            </td>
                            <td>{user.discordId}</td>
                            <td>{user.createdAt?.toString().slice(4, 16)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination count={count} />
        </div>
    )
}

export default UsersPage;