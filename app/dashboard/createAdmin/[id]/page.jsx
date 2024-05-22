import styles from '@/app/ui/dashboard/createAdmin/singleAdmin/singleAdmin.module.css'
import Image from 'next/image'

const SingleAdmin = () => {
    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={styles.imgContainer}>
                    <Image src="/noavatar.png" alt="" fill />
                </div>
                Saad Shekhani
            </div>
            <div className={styles.formContainer}>
                <form action="" className={styles.form}>
                    <label> Username</label>
                    <input type="text" placeholder="Saad Shekhani" name='username' />
                    <label> Email</label>
                    <input type="email" placeholder="Admin@gmail.com" name='email' />
                    <label> Password</label>
                    <input type="password" placeholder="Password" name='password' />
                    <button>Update</button>
                </form>
            </div>
        </div>
    )
}

export default SingleAdmin;