'use client';

import React from 'react';
import styles from './Leaderboard.module.css';

interface UserRank {
    rank: number;
    name: string;
    points: number;
    avatar?: string;
    isCurrentUser?: boolean;
}

export default function Leaderboard({ data }: { data: UserRank[] }) {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span>Rank</span>
                <span>User</span>
                <span>PTS</span>
            </div>
            <div className={styles.list}>
                {data.map((user) => (
                    <div
                        key={user.rank}
                        className={`${styles.row} ${user.isCurrentUser ? styles.currentUser : ''}`}
                    >
                        <div className={styles.rank}>
                            {user.rank <= 3 ? <span className={styles.medal}>{user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'}</span> : `#${user.rank}`}
                        </div>
                        <div className={styles.user}>
                            <a href={`/u/${user.name.replace(/\s+/g, '-').toLowerCase()}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: 'inherit' }}>
                                <div className={styles.avatar}>
                                    {user.name.charAt(0)}
                                </div>
                                <span className={styles.name}>{user.name} {user.isCurrentUser && '(You)'}</span>
                            </a>
                        </div>
                        <div className={styles.points}>{user.points.toLocaleString()}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
