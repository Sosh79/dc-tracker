import Most from "../ui/dashboard/most/most";
import InAllServer from "../ui/dashboard/inAllServer/inAllServer";
import styles from "../ui/dashboard/dashboard.module.css";
import Rightbar from "../ui/dashboard/rightbar/rightbar";
import Content from "../ui/dashboard/content/content";


const Dashboard = async ({ searchParams }) => {
    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;
    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.most}>
                    <Most nr={1} />
                    <Most nr={2} />
                    <Most nr={3} />
                </div>
                <InAllServer page={page} q={q} />
                <Content />
            </div>
            <div className={styles.side}>
                <Rightbar />
            </div>
        </div>
    );
};

export default Dashboard;