'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/PageHeader/PageHeader';

// Mock Post Type
interface Post {
    id: number;
    author: string;
    avatar: string;
    time: string;
    content: string;
    image?: string;
    likes: number;
    comments: number;
    isLiked: boolean;
}

export default function CommunityPage() {
    const [posts, setPosts] = useState<Post[]>([
        {
            id: 1,
            author: "Sarah J.",
            avatar: "S",
            time: "2 hours ago",
            content: "Just finished leading the morning HIIT class! You all crushed it today. 💪🔥 Remember to hydrate!",
            likes: 24,
            comments: 5,
            isLiked: false
        },
        {
            id: 2,
            author: "Mike T.",
            avatar: "M",
            time: "4 hours ago",
            content: "New PR on the deadlift regarding proper form.  Check out the new tutorial video in the Files section.",
            likes: 18,
            comments: 2,
            isLiked: true
        },
        {
            id: 3,
            author: "Trainup Challenge",
            avatar: "🏆",
            time: "1 day ago",
            content: "The 'Spring Into Action' 5k challenge starts Monday! Who's in? 🏃‍♂️💨",
            image: "https://placehold.co/600x300/111827/FFF?text=5k+Challenge",
            likes: 156,
            comments: 42,
            isLiked: false
        }
    ]);

    const handleLike = (id: number) => {
        setPosts(posts.map(p => {
            if (p.id === id) {
                return {
                    ...p,
                    likes: p.isLiked ? p.likes - 1 : p.likes + 1,
                    isLiked: !p.isLiked
                };
            }
            return p;
        }));
    };

    return (
        <div className="container">
            <PageHeader
                title="Community Feed"
                description="Connect with your gym community and trainers."
                action={<button style={{
                    padding: '0.75rem 1.5rem',
                    background: '#111827',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 500
                }}>New Post</button>}
            />

            <div style={{ maxWidth: '700px', margin: '0 auto' }}>

                {/* Content Marketing: Featured Article */}
                <div style={{
                    background: 'white', borderRadius: '16px', overflow: 'hidden',
                    border: '1px solid #f3f4f6', marginBottom: '2rem',
                    display: 'flex', flexDirection: 'column'
                }}>
                    <div style={{
                        height: '200px', background: 'linear-gradient(to right, #4f46e5, #818cf8)',
                        display: 'flex', alignItems: 'flex-end', padding: '1.5rem', color: 'white'
                    }}>
                        <span style={{
                            background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)',
                            padding: '4px 12px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 700
                        }}>
                            TRAINUP EDITORIAL
                        </span>
                    </div>
                    <div style={{ padding: '1.5rem' }}>
                        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem', fontWeight: 800 }}>
                            The Science of Sleep & Recovery 💤
                        </h3>
                        <p style={{ color: '#4b5563', lineHeight: '1.6', marginBottom: '1rem' }}>
                            Why your gains happen in bed, not in the gym. Read our latest deep dive into circadian rhythms and muscle repair.
                        </p>
                        <a href="#" style={{ color: '#4f46e5', fontWeight: 600, textDecoration: 'none' }}>Read Article →</a>
                    </div>
                </div>

                {posts.map(post => (
                    <div key={post.id} style={{
                        background: 'white',
                        borderRadius: '1rem',
                        padding: '1.5rem',
                        marginBottom: '1.5rem',
                        border: '1px solid #f0f0f0',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                        width: '100%',
                        maxWidth: '100%'
                    }}>
                        {/* Post Header */}
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                            <div style={{
                                width: '40px', height: '40px',
                                background: '#f3f4f6', borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontWeight: 'bold', marginRight: '1rem'
                            }}>
                                {post.avatar}
                            </div>
                            <div>
                                <h4 style={{ margin: 0 }}>{post.author}</h4>
                                <span style={{ fontSize: '0.85rem', color: '#9ca3af' }}>{post.time}</span>
                            </div>
                        </div>

                        {/* Content */}
                        <p style={{ lineHeight: '1.6', marginBottom: '1rem', color: '#374151' }}>
                            {post.content}
                        </p>

                        {post.image && (
                            <div style={{
                                height: '200px',
                                background: '#f3f4f6',
                                borderRadius: '0.5rem',
                                marginBottom: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#9ca3af'
                            }}>
                                [Image Placeholder: {post.content.substring(0, 10)}...]
                            </div>
                        )}

                        {/* Actions */}
                        <div style={{
                            display: 'flex', gap: '1.5rem',
                            borderTop: '1px solid #f9fafb',
                            paddingTop: '1rem',
                            color: '#6b7280',
                            fontSize: '0.9rem'
                        }}>
                            <button
                                onClick={() => handleLike(post.id)}
                                style={{
                                    background: 'none', border: 'none', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                                    color: post.isLiked ? '#ef4444' : 'inherit'
                                }}
                            >
                                {post.isLiked ? '❤️' : '🤍'} {post.likes} Likes
                            </button>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                💬 {post.comments} Comments
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
