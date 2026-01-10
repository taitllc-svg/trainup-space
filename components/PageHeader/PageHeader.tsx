import React from 'react';
import styles from './PageHeader.module.css';

interface PageHeaderProps {
    title: string;
    description?: string;
    action?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, action }) => {
    return (
        <div className={styles.header}>
            <div>
                <h1 className={styles.title}>{title}</h1>
                {description && <p className={styles.description}>{description}</p>}
            </div>
            {action && <div className={styles.action}>{action}</div>}
        </div>
    );
};

export default PageHeader;
