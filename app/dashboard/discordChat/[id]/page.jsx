import styles from "@/app/ui/dashboard/discordChat/singleChat/singleChat.module.css";
import { addMessage } from "@/app/lib/discordBot";
import { dcChat } from '@/app/lib/data';

const SingleChat = async ({ params }) => {
    const { id } = params;
    const chatId = await dcChat(id);

    return (
        <div className={styles.container}>
            <form action={addMessage} className={styles.form} method="POST">
                <input type="hidden" name="id" value={chatId.id} />
                <input type="text" placeholder={chatId.guildId || "ServerId..."} name="guildId" defaultValue={chatId.guildId} required />
                <input type="text" placeholder={chatId.channelId || "ChannelId..."} name="channelId" defaultValue={chatId.channelId} required />
                <input type="text" placeholder="Message..." name="message" required />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SingleChat;
