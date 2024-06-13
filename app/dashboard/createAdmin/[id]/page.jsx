"use client"
import styles from '@/app/ui/dashboard/createAdmin/singleAdmin/singleAdmin.module.css'
import { editAdmin, checkUsernameAndEmail } from '@/app/lib/actions'
import { useEffect, useState } from 'react'
const dotEnv = require("dotenv");
dotEnv.config();

const SingleAdmin = ({ params }) => {
    const { id } = params
    const [admin, setAdmin] = useState();
    const [message, setMessage] = useState("");

    const fetchEditAdmin = async () => {
        let response;
        try {
            response = await fetch(`${window.location.origin}/api/fetchEditAdmin`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id }),
            });
            response = await response.json();
        } catch (err) {
            console.log(err);
        }
        if (response?.result) {
            setAdmin(response?.result);
        }
    };

    useEffect(() => {
        fetchEditAdmin();
    }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const username = formData.get("username");
        const email = formData.get("email");

        const checkResult = await checkUsernameAndEmail(username, email);
        if (checkResult && checkResult.message === "Both username and email are available") {
            const response = await editAdmin(formData);
            if (response && response.message) {
                setMessage(response.message);
            }
        } else if (checkResult && checkResult.message) {
            setMessage(checkResult.message);
        }
    };

    if (!admin) {
        return <div>Loading...</div>;
    }
    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input type="hidden" name="id" value={admin?._id} />
                    <label> Username</label>
                    <input type="text" placeholder={admin?.username} name="username" />
                    <label> Email</label>
                    <input type="email" placeholder={admin?.email} name="email" />
                    <label> Password</label>
                    <input type="password" placeholder="New Password" name="password" />
                    <button>Update</button>
                </form>
                {message && <p className={styles.error}>{message}</p>}

            </div>
        </div>
    )
}

export default SingleAdmin;