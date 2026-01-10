'use client';

import React from 'react';
import styles from './DocumentList.module.css';

interface Document {
    id: string;
    title: string;
    type: 'PDF' | 'IMG' | 'DOC';
    date: string;
    size: string;
    category: 'Meal Plan' | 'Workout' | 'results';
    sharedWith?: string[];
}

interface DocumentListProps {
    documents: Document[];
}

export default function DocumentList({ documents }: DocumentListProps) {
    const getIcon = (type: string) => {
        switch (type) {
            case 'PDF': return '📄';
            case 'IMG': return '🖼️';
            default: return '📝';
        }
    };

    return (
        <div className={styles.container}>
            {documents.map((doc) => (
                <div key={doc.id} className={styles.item}>
                    <div className={styles.icon}>{getIcon(doc.type)}</div>
                    <div className={styles.info}>
                        <h4 className={styles.title}>{doc.title}</h4>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                            <span className={styles.meta}>{doc.date} • {doc.size}</span>
                            {doc.sharedWith && (
                                <span style={{ fontSize: '0.75rem', background: '#e0f2fe', color: '#0284c7', padding: '2px 6px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    🔒 Shared with {doc.sharedWith.join(', ')}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className={styles.tag}>{doc.category}</div>
                    <button className={styles.actionButton}>Download</button>
                </div>
            ))}
        </div>
    );
}
