"use client"
import styles from "@/app/ui/dashboard/discordChat/discordChat.module.css";
import { addMessage } from "@/app/lib/discordBot";

const DiscordChat = () => {
    return (
        <div className={styles.container}>
            <form action={addMessage} className={styles.form} method="POST">
                <input type="text" placeholder="Message..." name="message" required />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default DiscordChat;
