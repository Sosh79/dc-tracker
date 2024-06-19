import styles from "@/app/ui/dashboard/createWord/createWord.module.css";
import SearchBar from "@/app/ui/dashboard/searchbar/searchbar";
import Link from "next/link";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { fetchServer } from "@/app/lib/data";
import { deleteServer } from "@/app/lib/actions";


const DiscordChat = async ({ searchParams }) => {
    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;
    const { servers, count } = await fetchServer(q, page)
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <SearchBar placeholder="Sarch for server..." />
                <Link href="/dashboard/discordChat/addServer">
                    <button className={styles.addButton}>Add New</button>
                </Link>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>ServerId</td>
                        <td>ChannelId</td>
                        <td>Created At</td>
                    </tr>
                </thead>
                <tbody>
                    {servers.map((server) => (
                        <tr key={server.id}>
                            <td><div className={styles.server}>
                                {server.name}
                            </div>
                            </td>
                            <td>{server.guildId}</td>
                            <td>{server.channelId}</td>
                            <td>{server.createdAt?.toString().slice(4, 16)}</td>
                            <td>
                                <div className={styles.buttons}>
                                    <Link href={`/dashboard/discordChat/${server.id}`}>
                                        <button className={` ${styles.button} ${styles.editButton}`}>Chat</button>
                                    </Link>
                                    <form action={deleteServer}>
                                        <input type="hidden" name="id" value={server.id} />
                                        <button className={` ${styles.button} ${styles.deleteButton}`}>Delete</button>
                                    </form>

                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination count={count} />
        </div>

    )
}

export default DiscordChat;