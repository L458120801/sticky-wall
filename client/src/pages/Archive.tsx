import React from 'react';

const Archive: React.FC = () => {
    return (
        <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', textAlign: 'center', color: '#94a3b8' }}>
            <h1 style={{ color: '#f8fafc', marginBottom: '16px' }}>归档箱</h1>
            <p>好的想法即使过时了，也值得回味。</p>
            <div style={{ marginTop: '40px', padding: '40px', border: '2px dashed #334155', borderRadius: '16px' }}>
                暂时没有归档的笔记。
            </div>
        </div>
    );
};

export default Archive;
