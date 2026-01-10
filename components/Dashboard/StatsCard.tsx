import React from 'react';
import styles from './StatsCard.module.css';

interface StatsCardProps {
    title: string;
    value: string | number;
    trend?: string;
    trendDirection?: 'up' | 'down' | 'neutral';
    icon?: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, trend, trendDirection = 'neutral', icon }) => {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h3 className={styles.title}>{title}</h3>
                {icon && <div className={styles.icon}>{icon}</div>}
            </div>
            <div className={styles.content}>
                <div className={styles.value}>{value}</div>
                {trend && (
                    <div className={`${styles.trend} ${styles[trendDirection]}`}>
                        {trend}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatsCard;
