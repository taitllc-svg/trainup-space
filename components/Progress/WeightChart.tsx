'use client';

import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import styles from './WeightChart.module.css';

const data = [
    { date: 'Jan 1', weight: 185 },
    { date: 'Jan 15', weight: 183 },
    { date: 'Feb 1', weight: 181 },
    { date: 'Feb 15', weight: 180 },
    { date: 'Mar 1', weight: 178 },
    { date: 'Mar 15', weight: 177 },
    { date: 'Apr 1', weight: 175 },
];

export default function WeightChart() {
    return (
        <div className={styles.chartContainer}>
            <h3 className={styles.title}>Weight History (lbs)</h3>
            <div className={styles.chartWrapper}>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" vertical={false} />
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#888', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#888', fontSize: 12 }}
                            domain={['dataMin - 5', 'dataMax + 5']}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="weight"
                            stroke="var(--foreground)"
                            strokeWidth={3}
                            dot={{ r: 4, fill: 'var(--foreground)', strokeWidth: 0 }}
                            activeDot={{ r: 7 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
