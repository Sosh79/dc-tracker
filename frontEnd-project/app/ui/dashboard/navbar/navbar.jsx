"use client";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";
import GoogleTranslate from "@/app/lib/googleTranslate";
import Link from "next/link"; // Import Link component

import {
    // MdNotifications,
    MdOutlineChat,
    // MdSearch,
} from "react-icons/md";
const Navbar = () => {
    const pathname = usePathname();
    return (
        <div className={styles.container}>
            <div className={styles.title}>{pathname.split("/").pop()}</div>
            <div className={styles.menu}>
                <div className={styles.icons}>
                    <Link href="/dashboard/discordChat">
                        <MdOutlineChat size={20} />
                    </Link>
                    <GoogleTranslate />
                </div>
            </div>
        </div>
    )
}

export default Navbar;