import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";
import { signOut } from "@/app/auth";
import { TfiClipboard } from "react-icons/tfi";
import {
    MdDashboard,
    MdSupervisedUserCircle,
    MdAdminPanelSettings,
    MdPersonSearch,
    MdLogout,
} from "react-icons/md";
const menuItems = [
    {
        title: "Pages",
        list: [
            {
                title: "Dashboard",
                path: "/dashboard",
                icon: <MdDashboard />,
            },
            {
                title: "Users",
                path: "/dashboard/users",
                icon: <MdSupervisedUserCircle />,
            },
            {
                title: "Search",
                path: "/dashboard/search",
                icon: <MdPersonSearch />,
            },
            {
                title: "CreateAdmin",
                path: "/dashboard/createAdmin",
                icon: <MdAdminPanelSettings />,
            },
            {
                title: "CreateWord",
                path: "/dashboard/createWord",
                icon: <TfiClipboard />,
            },
        ],
    },
];
const Sidebar = async () => {
    return (
        <div className={styles.container}>
            <ul className={styles.list}>
                {menuItems.map((sid) => (
                    <li key={sid.title}>
                        <span className={styles.cat}>{sid.title}</span>
                        {sid.list.map((item) => (
                            <MenuLink item={item} key={item.title} />
                        ))}
                    </li>
                ))}
            </ul>
            <form action={async () => {
                "use server"
                await signOut()
            }}>
                <button className={styles.logout}>
                    <MdLogout />
                    Logout</button>
            </form>
        </div>
    )
}

export default Sidebar;