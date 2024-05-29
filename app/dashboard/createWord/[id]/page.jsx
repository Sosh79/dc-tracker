import styles from '@/app/ui/dashboard/createWord/singleWord/singleWord.module.css'
import { fetchEditWord } from '@/app/lib/data'
import { editWord } from '@/app/lib/actions'


const SingleAdmin = async ({ params }) => {
    const { id } = params
    const word = await fetchEditWord(id)
    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <form action={editWord} className={styles.form} >
                    <input type="hidden" name="id" value={word.id} />
                    <label> Username</label>
                    <input type="text" placeholder={word.name} name="name" />
                    <button>Update</button>
                </form>
            </div>
        </div>
    )
}

export default SingleAdmin;