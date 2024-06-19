"use client";
import styles from "@/app/ui/dashboard/discordChat/singleChat/singleChat.module.css";
import { addMessage } from "@/app/lib/discordBot";
import { useEffect, useState } from "react";

const SingleChat = ({ params }) => {
    const { id } = params;
    const [chatId, setChatId] = useState();
    const [message, setMessage] = useState("");

    const getServerValue = async () => {
        let response;
        try {
            response = await fetch(`${window.location.origin}/api/chat/get`, {
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
            setChatId(response?.result);
        }
    };

    useEffect(() => {
        getServerValue();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const response = await addMessage(formData);
        if (response && response.message) {
            setMessage(response.message);
        }
    };

    if (!chatId) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input type="hidden" name="id" value={chatId?._id} />
                <input type="text" placeholder={chatId?.guildId || "ServerId..."} name="guildId" defaultValue={chatId?.guildId} required />
                <input type="text" placeholder={chatId?.channelId || "ChannelId..."} name="channelId" defaultValue={chatId?.channelId} required />
                <input type="text" placeholder="Message..." name="message" required />
                <button type="submit">Submit</button>
            </form>
            {message && <p className={styles.error}>{message}</p>}
        </div>
    );
};

export default SingleChat;