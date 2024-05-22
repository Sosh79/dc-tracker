import styles from "@/app/ui/dashboard/createAdmin/createAdmin.module.css";
import SearchBar from "@/app/ui/dashboard/searchbar/searchbar";
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { fetchAdmins } from "@/app/lib/data";
const CreateAdminPage = async ({ searchParams }) => {
    const q = searchParams?.q || "";
    const admins = await fetchAdmins(q)
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <SearchBar placeholder="Sarch for admin..." />
                <Link href="/dashboard/createAdmin/addAdmin">
                    <button className={styles.addButton}>Add New</button>
                </Link>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Created At</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {admins.map((admin) => (
                        <tr key={admin.id}>
                            <td><div className={styles.user}>
                                <Image src={admin.img || "/noavatar.png"} alt="avatar"
                                    width={40}
                                    height={40}
                                    className={styles.avatar}
                                />
                                {admin.username}
                            </div>
                            </td>
                            <td>{admin.email}</td>
                            <td>{admin.createdAt?.toString().slice(4, 16)}</td>
                            <td>active</td>
                            <td>
                                <div className={styles.buttons}>
                                    <Link href="/dashboard/createAdmin/edit">
                                        <button className={` ${styles.button} ${styles.editButton}`}>Edit</button>
                                    </Link>
                                    <Link href="/dashboard/createAdmin/delete">
                                        <button className={` ${styles.button} ${styles.deleteButton}`}>Delete</button>
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination />
        </div>

    )
}

export default CreateAdminPage;