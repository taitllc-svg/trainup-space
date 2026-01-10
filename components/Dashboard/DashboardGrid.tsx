import React from 'react';
import styles from './DashboardGrid.module.css';

const DashboardGrid = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={styles.grid}>
            {children}
        </div>
    );
};

export default DashboardGrid;
