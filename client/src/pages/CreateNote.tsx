import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Send } from 'lucide-react';
import './CreateNote.css';

const colors = [
    { name: 'yellow', hex: '#fde047' },
    { name: 'blue', hex: '#7dd3fc' },
    { name: 'pink', hex: '#f9a8d4' },
    { name: 'green', hex: '#86efac' },
    { name: 'purple', hex: '#d8b4fe' },
];

const CreateNote: React.FC = () => {
    const navigate = useNavigate();
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [selectedColor, setSelectedColor] = useState('yellow');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        setLoading(true);
        try {
            await axios.post('http://localhost:3000/api/notes', {
                content,
                author: author || 'Anonymous',
                color: selectedColor
            });
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('Failed to post note');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-container">
            <div className="form-card">
                <h1>Post a Sticky Note</h1>
                <p className="subtitle">Share your thought with the world.</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Your Idea</label>
                        <textarea
                            placeholder="Write something awesome..."
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            rows={5}
                            maxLength={200}
                            required
                        />
                        <div className="char-count">{content.length}/200</div>
                    </div>

                    <div className="form-group">
                        <label>Pick a Color</label>
                        <div className="color-picker">
                            {colors.map(c => (
                                <button
                                    type="button"
                                    key={c.name}
                                    className={`color-btn ${selectedColor === c.name ? 'selected' : ''}`}
                                    style={{ backgroundColor: c.hex }}
                                    onClick={() => setSelectedColor(c.name)}
                                    aria-label={`Select ${c.name}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Signed By (Optional)</label>
                        <input
                            type="text"
                            placeholder="Anonymous"
                            value={author}
                            onChange={e => setAuthor(e.target.value)}
                            maxLength={20}
                        />
                    </div>

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Posting...' : <><Send size={18} /> Post to Wall</>}
                    </button>
                </form>
            </div>

            <div className="preview-section">
                <h3>Preview</h3>
                <div
                    className="note-card preview-card"
                    style={{ '--note-color': `var(--note-${selectedColor})`, '--rot': '-2deg' } as React.CSSProperties}
                >
                    <div className="note-content">
                        <p>{content || "Your thoughts will appear here..."}</p>
                    </div>
                    <div className="note-footer" style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }}>
                        <div className="note-meta">
                            <span className="author" style={{ fontWeight: 600 }}>@{author || "Anonymous"}</span>
                            <span className="date">Just now</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateNote;
