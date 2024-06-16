import styles from "@/app/ui/dashboard/createWord/createWord.module.css";
import SearchBar from "@/app/ui/dashboard/searchbar/searchbar";
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { fetchWord } from "@/app/lib/data";
import { deleteWord } from "@/app/lib/actions";


const CreateWordPage = async ({ searchParams }) => {
    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;
    const { words, count } = await fetchWord(q, page)
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <SearchBar placeholder="Sarch for word..." />
                <Link href="/dashboard/createWord/addWord">
                    <button className={styles.addButton}>Add New</button>
                </Link>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Created At</td>
                    </tr>
                </thead>
                <tbody>
                    {words.map((word) => (
                        <tr key={word.id}>
                            <td><div className={styles.word}>
                                <Image src={word.img || "/games.jpg"} alt="avatar"
                                    width={40}
                                    height={40}
                                    className={styles.avatar}
                                />
                                {word.name}
                            </div>
                            </td>
                            <td>{word.createdAt?.toString().slice(4, 16)}</td>
                            <td>
                                <div className={styles.buttons}>
                                    <Link href={`/dashboard/createWord/${word.id}`}>
                                        <button className={` ${styles.button} ${styles.editButton}`}>Edit</button>
                                    </Link>
                                    <form action={deleteWord}>
                                        <input type="hidden" name="id" value={word.id} />
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

export default CreateWordPage;