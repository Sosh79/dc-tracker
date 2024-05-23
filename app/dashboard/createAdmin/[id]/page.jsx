import styles from '@/app/ui/dashboard/createAdmin/singleAdmin/singleAdmin.module.css'
import Image from 'next/image'
import { fetchEditAdmin } from '@/app/lib/data'
import { editAdmin } from '@/app/lib/actions'

const SingleAdmin = async ({ params }) => {
    const { id } = params
    const admin = await fetchEditAdmin(id)
    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={styles.imgContainer}>
                    <Image src={admin.img || "/noavatar.png"} alt="" fill />
                </div>
                {admin.username}
            </div>
            <div className={styles.formContainer}>
                <form action={editAdmin} className={styles.form}>
                    <input type="hidden" name="id" value={admin.id} />
                    <label> Username</label>
                    <input type="text" placeholder={admin.username} name="username" />
                    <label> Email</label>
                    <input type="email" placeholder={admin.email} name="email" />
                    <label> Password</label>
                    <input type="password" placeholder="New Password" name="password" />
                    <button>Update</button>
                </form>
            </div>
        </div>
    )
}

export default SingleAdmin;