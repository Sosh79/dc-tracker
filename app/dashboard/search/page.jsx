"use client";
import React, { useState } from 'react';
import styles from '@/app/ui/dashboard/search/search.module.css';
import { fetchUserSearch } from '@/app/lib/actions';

const Search = () => {
    const [formData, setFormData] = useState({ username: '', gamesname: '' });
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
            setError(error.message);
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
                <input type="text" placeholder="gamesname" name="gamesname" value={formData.gamesname} onChange={handleChange} required
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
            <table className={styles.ss}>
                <thead>
                    <tr>
                        <td>PositiveMessage</td>
                        <td>NegativeMessage</td>
                    </tr>
                </thead>
                <tbody>
                    {games.map((game) => (
                        <tr key={game.id}>
                            <td>
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
                            <td>
                                <div className={styles.negativeContainer}>
                                    {game.NegativeMessage.map((message, index) => {
                                        return (

                                            <div key={index} className={styles.message}>

                                                {renderMessages(message)}

                                            </div>
                                        );
                                    })}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Search;
