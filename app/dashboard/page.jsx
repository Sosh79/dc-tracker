import Most from "../ui/dashboard/most/most";
import InAllServer from "../ui/dashboard/inAllServer/inAllServer";
import styles from "../ui/dashboard/dashboard.module.css";
import Rightbar from "../ui/dashboard/rightbar/rightbar";
import Content from "../ui/dashboard/content/content";

const Dashboard = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.most}>
                    <Most />
                    <Most />
                    <Most />
                </div>
                <InAllServer />
                <Content />
            </div>
            <div className={styles.side}>
                <Rightbar />
            </div>
        </div>
    );
};

export default Dashboard;