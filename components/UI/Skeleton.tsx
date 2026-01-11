import React from 'react';
import styles from './Skeleton.module.css';

interface SkeletonProps {
    className?: string;
    width?: string | number;
    height?: string | number;
    borderRadius?: string | number;
}

export default function Skeleton({
    className = '',
    width,
    height,
    borderRadius
}: SkeletonProps) {
    const style: React.CSSProperties = {
        width: width,
        height: height,
        borderRadius: borderRadius,
    };

    return (
        <div
            className={`${styles.skeleton} ${className}`}
            style={style}
            aria-hidden="true"
        />
    );
}
