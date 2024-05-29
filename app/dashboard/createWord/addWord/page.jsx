import styles from "@/app/ui/dashboard/createWord/addWord/addWord.module.css";
import { addWord } from "@/app/lib/actions"

const AddWord = () => {
    return (
        <div className={styles.container}>
            <form action={addWord} className={styles.form}>
                <input type="text" placeholder="name" name="name" required />
                <button type="submit">Submit</button>
            </form>
        </div>

    )
}

export default AddWord;