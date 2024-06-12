"use client"
import React, { useState } from 'react';
import styles from "@/app/ui/dashboard/createWord/addWord/addWord.module.css";
import { addServer } from "@/app/lib/actions"

const AddServer = () => {
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const response = await addServer(formData);

        if (response && response.message) {
            setMessage(response.message);
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input type="text" placeholder="name" name="name" required />
                <input type="text" placeholder="serverId" name="guildId" required />
                <input type="text" placeholder="channelId" name="channelId" required />
                <button type="submit">Submit</button>
            </form>
            {message && <p className={styles.error}>{message}</p>}
        </div>
    )
}

export default AddServer;
