'use client';

import React from 'react';
import styles from './TrainerFilters.module.css';

interface TrainerFiltersProps {
    search: string;
    setSearch: (s: string) => void;
    location: string;
    setLocation: (l: string) => void;
    selectedSpecialties: string[];
    toggleSpecialty: (s: string) => void;
    availableSpecialties: string[];
}

const TrainerFilters: React.FC<TrainerFiltersProps> = ({
    search, setSearch,
    location, setLocation,
    selectedSpecialties, toggleSpecialty,
    availableSpecialties
}) => {
    return (
        <div className={styles.filters}>
            <div className={styles.topRow}>
                <input
                    type="text"
                    placeholder="Search trainers..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={styles.searchInput}
                />

                <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className={styles.locationSelect}
                >
                    <option value="All">All Locations</option>
                    <option value="New York">New York</option>
                    <option value="London">London</option>
                    <option value="Remote">Remote</option>
                </select>
            </div>

            <div className={styles.specialtiesRow}>
                <span className={styles.label}>Adjust Specialty:</span>
                <div className={styles.pills}>
                    {availableSpecialties.map(spec => (
                        <button
                            key={spec}
                            onClick={() => toggleSpecialty(spec)}
                            className={`${styles.pill} ${selectedSpecialties.includes(spec) ? styles.active : ''}`}
                        >
                            {spec}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrainerFilters;
