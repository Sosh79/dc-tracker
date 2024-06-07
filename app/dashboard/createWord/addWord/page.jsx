"use client"
import React, { useState } from 'react';
import styles from "@/app/ui/dashboard/createWord/addWord/addWord.module.css";
import { addWord } from "@/app/lib/actions"

const AddWord = () => {
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const response = await addWord(formData);

        if (response && response.message) {
            setMessage(response.message);
        } else {
            setMessage("Word added successfully!");
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input type="text" placeholder="name" name="name" required />
                <button type="submit">Submit</button>
            </form>
            {message && <p className={styles.error}>{message}</p>}
        </div>
    )
}

export default AddWord;
