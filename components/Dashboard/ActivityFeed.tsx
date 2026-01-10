import React from 'react';
import styles from './ActivityFeed.module.css';

interface ActivityItem {
    id: string;
    text: string;
    time: string;
    type?: 'info' | 'success' | 'warning';
}

interface ActivityFeedProps {
    title: string;
    items: ActivityItem[];
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ title, items }) => {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>{title}</h3>
            <ul className={styles.list}>
                {items.map((item) => (
                    <li key={item.id} className={styles.item}>
                        <div className={styles.itemContent}>
                            <span className={styles.text}>{item.text}</span>
                            <span className={styles.time}>{item.time}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ActivityFeed;
