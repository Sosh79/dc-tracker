import styles from "@/app/ui/dashboard/createAdmin/addAdmin/addAdmin.module.css";
const AddAdmin = () => {
    return (
        <div className={styles.container}>
            <form action="" className={styles.form}>
                <input type="text" placeholder="username" name="username" required />
                <input type="email" placeholder="email" name="email" required />
                <input type="password" placeholder="password" name="password" required />
                <button type="submit">Submit</button>
            </form>
        </div>

    )
}

export default AddAdmin;