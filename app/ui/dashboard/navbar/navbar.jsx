"use client";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";
import GoogleTranslate from "@/app/lib/googleTranslate";
import {
    // MdNotifications,
    // MdOutlineChat,
    // MdPublic,
    // MdSearch,
} from "react-icons/md";
const Navbar = () => {
    const pathname = usePathname();
    return (
        <div className={styles.container}>
            <div className={styles.title}>{pathname.split("/").pop()}</div>
            <div className={styles.menu}>
                <div className={styles.icons}>
                    {/* <MdOutlineChat size={20} /> */}
                    <GoogleTranslate />
                    {/* <MdNotifications size={20} /> */}
                    {/* <MdPublic size={20} /> */}
                </div>
            </div>
        </div>
    )
}

export default Navbar;