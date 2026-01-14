import React from 'react';
import { Trash2, Heart } from 'lucide-react';
import './NoteCard.css';

interface NoteProps {
    id: string;
    content: string;
    author: string;
    color: string;
    likes: number;
    rotation: number;
    createdAt: string;
    onDelete: (id: string) => void;
    onLike: (id: string) => void;
}

const NoteCard: React.FC<NoteProps> = ({ id, content, author, color, likes, rotation, createdAt, onDelete, onLike }) => {

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        onLike(id);
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete(id);
    };

    const getRelativeTime = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString();
    };

    return (
        <div
            className="note-card"
            style={{
                '--note-color': `var(--note-${color})`,
                '--rot': `${rotation}deg`
            } as React.CSSProperties}
        >
            <div className="note-content">
                <p>{content}</p>
            </div>

            <div className="note-footer">
                <div className="note-meta">
                    <span className="author">@{author}</span>
                    <span className="date">{getRelativeTime(createdAt)}</span>
                </div>

                <div className="note-actions">
                    <button className="action-btn like-btn" onClick={handleLike}>
                        <Heart size={14} className={likes > 0 ? 'fill-current' : ''} />
                        <span>{likes}</span>
                    </button>
                    <button className="action-btn delete-btn" onClick={handleDelete}>
                        <Trash2 size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoteCard;
