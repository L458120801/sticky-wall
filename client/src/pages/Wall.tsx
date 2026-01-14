import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NoteCard from '../components/NoteCard';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Wall.css';

interface Note {
    id: string;
    content: string;
    color: string;
    author: string;
    likes: number;
    createdAt: string;
    rotation: number;
}

const Wall: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchNotes = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/notes');
            setNotes(res.data);
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
        } catch (err) {
            console.error(err);
        }
    };

    const handleLike = async (id: string) => {
        try {
            await axios.patch(`http://localhost:3000/api/notes/${id}/like`);
            setNotes(notes.map(n => n.id === id ? { ...n, likes: n.likes + 1 } : n));
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div className="loading">Loading Idea Wall...</div>;

    return (
        <div className="wall-container">
            {notes.length === 0 ? (
                <div className="empty-state">
                    <h2>The Wall is Empty</h2>
                    <p>Be the first to post an idea!</p>
                    <Link to="/create" className="cta-btn"><Plus /> Post Idea</Link>
                </div>
            ) : (
                <div className="masonry-grid">
                    {notes.map(note => (
                        <NoteCard
                            key={note.id}
                            {...note}
                            onDelete={handleDelete}
                            onLike={handleLike}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wall;
