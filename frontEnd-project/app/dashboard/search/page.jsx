"use client";
import React, { useState } from 'react';
import styles from '@/app/ui/dashboard/search/search.module.css';
import { fetchUserSearch } from '@/app/lib/actions';

const Search = () => {
    const [formData, setFormData] = useState({ username: '', gamename: '' });
    const [games, setGames] = useState([]);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset the error state before new submission
        try {
            const results = await fetchUserSearch(formData);
            setGames(results);
        } catch (error) {
            console.error('Error fetching search results:', error);
            setGames([]);
            setError("username or game name not found");
        }
    };
    const renderMessages = (messages) => {
        return messages.split('\n').map((message, index) => (
            <span key={index}>
                {message}
                <br />
            </span>
        ));
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input type="text" placeholder="username" name="username" value={formData.username} onChange={handleChange} required
                />
                <input type="text" placeholder="gamename" name="gamename" value={formData.gamename} onChange={handleChange} required
                />
                <button type="submit">Submit</button>
            </form>
            {error && <p className={styles.error}>{error}</p>}
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Count</td>
                        <td>Positive</td>
                        <td>Negative</td>
                    </tr>
                </thead>
                <tbody>
                    {games.map((game) => (
                        <tr key={game.id}>
                            <td>{game.name}</td>
                            <td>{game.count}</td>
                            <td>{game.Positive}</td>
                            <td>{game.Negative}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
            <table className={styles.table}>
                <thead >
                    <tr className={styles.PN}>
                        <td>PositiveMessage</td>
                        <td>NegativeMessage</td>
                    </tr>
                </thead>
                <tbody>
                    {games.map((game) => (
                        <tr key={game.id}>
                            <div className={styles.x}>
                                <td >
                                    <ol className={styles.positiveContainer}>
                                        {game.PositiveMessage.map((message, index) => {
                                            return (
                                                <li key={index}>
                                                    {renderMessages(message)}
                                                </li>

                                            );
                                        })}
                                    </ol>
                                </td>
                                <td >
                                    <ol className={styles.negativeContainer}>
                                        {game.NegativeMessage.map((message, index) => {
                                            return (

                                                <li key={index} className={styles.message}>

                                                    {renderMessages(message)}

                                                </li>
                                            );
                                        })}
                                    </ol>
                                </td>
                            </div>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Search;
