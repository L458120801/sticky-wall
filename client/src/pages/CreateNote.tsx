import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Send } from 'lucide-react';
import './CreateNote.css';

const colors = [
    { name: 'yellow', hex: '#fde047', label: '柠檬黄' },
    { name: 'blue', hex: '#7dd3fc', label: '天空蓝' },
    { name: 'pink', hex: '#f9a8d4', label: '樱花粉' },
    { name: 'green', hex: '#86efac', label: '薄荷绿' },
    { name: 'purple', hex: '#d8b4fe', label: '香芋紫' },
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
                author: author || '匿名用户',
                color: selectedColor
            });
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('发布失败，请检查网络');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-container">
            <div className="form-card">
                <h1>发布新灵感</h1>
                <p className="subtitle">把你的想法贴在墙上，与大家分享。</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>你的想法</label>
                        <textarea
                            placeholder="写点什么有趣的..."
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            rows={5}
                            maxLength={200}
                            required
                        />
                        <div className="char-count">{content.length}/200</div>
                    </div>

                    <div className="form-group">
                        <label>选择颜色</label>
                        <div className="color-picker">
                            {colors.map(c => (
                                <button
                                    type="button"
                                    key={c.name}
                                    className={`color-btn ${selectedColor === c.name ? 'selected' : ''}`}
                                    style={{ backgroundColor: c.hex }}
                                    onClick={() => setSelectedColor(c.name)}
                                    aria-label={`选择 ${c.label}`}
                                    title={c.label}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>署名 (可选)</label>
                        <input
                            type="text"
                            placeholder="匿名用户"
                            value={author}
                            onChange={e => setAuthor(e.target.value)}
                            maxLength={20}
                        />
                    </div>

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? '发布中...' : <><Send size={18} /> 贴到墙上</>}
                    </button>
                </form>
            </div>

            <div className="preview-section">
                <h3>实时预览</h3>
                <div
                    className="note-card preview-card"
                    style={{ '--note-color': `var(--note-${selectedColor})`, '--rot': '-2deg' } as React.CSSProperties}
                >
                    <div className="note-content">
                        <p>{content || "你的想法会显示在这里..."}</p>
                    </div>
                    <div className="note-footer" style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }}>
                        <div className="note-meta">
                            <span className="author" style={{ fontWeight: 600 }}>@{author || "匿名用户"}</span>
                            <span className="date">刚刚</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateNote;
