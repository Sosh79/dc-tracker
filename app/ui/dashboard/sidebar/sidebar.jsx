import styles from "./sidebar.module.css";
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
                title: "CreateAdmin",
                path: "/dashboard/createAdmin",
                icon: <MdAdminPanelSettings />,
            },
            {
                title: "Search",
                path: "/dashboard/search",
                icon: <MdPersonSearch />,
            },
        ],
    },
];
const Sidebar = () => {
    return (
        <div className={styles.container}>
            <ul>
                {menuItems.map((cat) => (
                    <li key={cat.title}>{cat.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar;