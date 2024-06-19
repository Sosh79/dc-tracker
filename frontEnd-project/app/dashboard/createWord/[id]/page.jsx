"use client"
import styles from '@/app/ui/dashboard/createWord/singleWord/singleWord.module.css'
import { editWord } from '@/app/lib/actions'
import { useState, useEffect } from 'react';


const SingleWord = ({ params }) => {
    const { id } = params
    const [word, setWord] = useState();
    const [message, setMessage] = useState("");
    const fetchEditWord = async () => {
        let response;
        try {
            response = await fetch(`${window.location.origin}/api/fetchEditWord`, {
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
            setWord(response?.result);
        }
    };
    useEffect(() => {
        fetchEditWord();
    }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const response = await editWord(formData);

        if (response && response.message) {
            setMessage(response.message);
        }
    };




    if (!word) {
        return <div>Loading...</div>;
    }
    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input type="hidden" name="id" value={word?._id} />
                    <label> Username</label>
                    <input type="text" placeholder={word?.name} name="name" />
                    <button>Update</button>
                </form>
                {message && <p className={styles.error}>{message}</p>}
            </div>
        </div>
    )
}

export default SingleWord;