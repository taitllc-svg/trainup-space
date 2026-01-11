import React from 'react';
import styles from './LoadingScreen.module.css';

interface LoadingScreenProps {
    message?: string;
}

export default function LoadingScreen({ message = 'INITIALIZING' }: LoadingScreenProps) {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.logo}>TRAINUP</h1>

                <div className={styles.loaderLine}>
                    <div className={styles.loaderProgress}></div>
                </div>

                <p className={styles.message}>{message}</p>
            </div>
        </div>
    );
}
