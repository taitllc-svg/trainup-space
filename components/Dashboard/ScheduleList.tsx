import React from 'react';
import styles from './ScheduleList.module.css';

interface ScheduleItem {
    id: string;
    title: string;
    time: string;
    instructor?: string;
    location?: string;
}

interface ScheduleListProps {
    title: string;
    items: ScheduleItem[];
    actionLabel?: string;
}

const ScheduleList: React.FC<ScheduleListProps> = ({ title, items, actionLabel }) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3 className={styles.title}>{title}</h3>
                {actionLabel && <button className={styles.actionBtn}>{actionLabel}</button>}
            </div>
            <div className={styles.list}>
                {items.map((item) => (
                    <div key={item.id} className={styles.item}>
                        <div className={styles.timeBox}>
                            <span className={styles.time}>{item.time}</span>
                        </div>
                        <div className={styles.details}>
                            <div className={styles.itemTitle}>{item.title}</div>
                            <div className={styles.meta}>
                                {item.instructor && <span>{item.instructor} • </span>}
                                {item.location && <span>{item.location}</span>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ScheduleList;
