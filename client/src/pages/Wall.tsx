import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NoteCard from '../components/NoteCard';
import { Plus, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Wall.css';

interface Comment {
    id: string;
    author: string;
    text: string;
    createdAt: string;
}

interface Note {
    id: string;
    content: string;
    color: string;
    author: string;
    likes: number;
    createdAt: string;
    rotation: number;
    x?: number;
    y?: number;
    comments?: Comment[];
}

const Wall: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);
    const boardRef = React.useRef<HTMLDivElement>(null);

    const [expandedNote, setExpandedNote] = useState<Note | null>(null);

    const fetchNotes = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/notes');

            const mappedNotes = await Promise.all(res.data.map(async (n: Note) => {
                // If note doesn't have valid position, assign random and save to server
                if (n.x == null || n.y == null || typeof n.x !== 'number' || typeof n.y !== 'number') {
                    const newX = Math.floor(Math.random() * (1600 - 250)) + 50;
                    const newY = Math.floor(Math.random() * (1500 - 250)) + 50;
                    // Persist position to server
                    try {
                        await axios.patch(`http://localhost:3000/api/notes/${n.id}/position`, { x: newX, y: newY });
                    } catch (e) {
                        console.error('Failed to save initial position', e);
                    }
                    return { ...n, x: newX, y: newY };
                }
                return n;
            }));
            setNotes(mappedNotes);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`http://localhost:3000/api/notes/${id}`);
            setNotes(notes.filter(n => n.id !== id));
            if (expandedNote?.id === id) setExpandedNote(null);
        } catch (err) {
            console.error(err);
        }
    };

    const handleLike = async (id: string) => {
        try {
            await axios.patch(`http://localhost:3000/api/notes/${id}/like`);
            setNotes(notes.map(n => n.id === id ? { ...n, likes: n.likes + 1 } : n));
            if (expandedNote?.id === id) {
                setExpandedNote(prev => prev ? { ...prev, likes: prev.likes + 1 } : null);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handlePositionChange = async (id: string, x: number, y: number) => {
        setNotes(notes.map(n => n.id === id ? { ...n, x, y } : n));
        try {
            await axios.patch(`http://localhost:3000/api/notes/${id}/position`, { x, y });
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div className="loading">正在加载灵感墙...</div>;

    return (
        <div className="wall-container">
            {notes.length === 0 ? (
                <div className="empty-state">
                    <h2>墙面空空如也</h2>
                    <p>快来贴上第一张便利贴吧！</p>
                    <Link to="/create" className="cta-btn"><Plus /> 发布灵感</Link>
                </div>
            ) : (
                <div className="wall-board" ref={boardRef}>
                    {notes.map(note => (
                        <NoteCard
                            key={note.id}
                            {...note}
                            dragConstraints={boardRef}
                            onDelete={handleDelete}
                            onLike={handleLike}
                            onPositionChange={handlePositionChange}
                            onExpand={setExpandedNote}
                        />
                    ))}
                </div>
            )}

            {/* Expanded View Modal with Comments */}
            {expandedNote && (
                <div className="note-modal-overlay" onClick={() => setExpandedNote(null)}>
                    <div
                        className="note-modal-content"
                        style={{ '--note-color': `var(--note-${expandedNote.color})` } as any}
                        onClick={e => e.stopPropagation()}
                    >
                        <button className="modal-close-btn" onClick={() => setExpandedNote(null)}>
                            <X size={24} />
                        </button>

                        <div className="modal-body">
                            {expandedNote.content}
                        </div>

                        <div className="note-footer" style={{ marginTop: '16px', paddingTop: '16px' }}>
                            <div className="note-meta">
                                <span className="author" style={{ fontSize: '1rem' }}>@{expandedNote.author}</span>
                                <span className="date">{new Date(expandedNote.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>

                        {/* Comments Section */}
                        <div className="comments-section">
                            <h4>💬 留言 ({expandedNote.comments?.length || 0})</h4>

                            <div className="comments-list">
                                {expandedNote.comments && expandedNote.comments.length > 0 ? (
                                    expandedNote.comments.map(comment => (
                                        <div key={comment.id} className="comment-item">
                                            <span className="comment-author">@{comment.author}</span>
                                            <p className="comment-text">{comment.text}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="no-comments">还没有留言，快来抢沙发！</p>
                                )}
                            </div>

                            {/* Add Comment Form */}
                            <form className="add-comment-form" onSubmit={async (e) => {
                                e.preventDefault();
                                const form = e.target as HTMLFormElement;
                                const text = (form.elements.namedItem('commentText') as HTMLInputElement).value;
                                const author = (form.elements.namedItem('commentAuthor') as HTMLInputElement).value || '匿名用户';

                                if (!text.trim()) return;

                                try {
                                    const res = await axios.post(`http://localhost:3000/api/notes/${expandedNote.id}/comments`, {
                                        author,
                                        text
                                    });

                                    // Update local state
                                    const newComment = res.data;
                                    setExpandedNote(prev => prev ? {
                                        ...prev,
                                        comments: [...(prev.comments || []), newComment]
                                    } : null);

                                    // Also update notes array
                                    setNotes(notes.map(n => n.id === expandedNote.id ? {
                                        ...n,
                                        comments: [...(n.comments || []), newComment]
                                    } : n));

                                    form.reset();
                                } catch (err) {
                                    console.error(err);
                                }
                            }}>
                                <input type="text" name="commentAuthor" placeholder="你的昵称" className="comment-input" />
                                <input type="text" name="commentText" placeholder="写下你的留言..." className="comment-input" required />
                                <button type="submit" className="comment-submit-btn">发送</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Wall;
