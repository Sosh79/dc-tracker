"use client"
import React, { useState } from 'react';
import styles from "@/app/ui/dashboard/createAdmin/addAdmin/addAdmin.module.css";
import { checkUsernameAndEmail, addAdmin } from "@/app/lib/actions";

const AddAdmin = () => {
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const username = formData.get("username");
        const email = formData.get("email");

        const checkResult = await checkUsernameAndEmail(username, email);
        if (checkResult && checkResult.message === "Both username and email are available") {
            const response = await addAdmin(formData);
            if (response && response.message) {
                setMessage(response.message);
            }
        } else if (checkResult && checkResult.message) {
            setMessage(checkResult.message);
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input type="text" placeholder="username" name="username" required />
                <input type="email" placeholder="email" name="email" required />
                <input type="password" placeholder="password" name="password" required />
                <button type="submit">Submit</button>
            </form>
            {message && <p className={styles.error}>{message}</p>}
        </div>
    );
};

export default AddAdmin;
