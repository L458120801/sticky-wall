import React from 'react';

const Archive: React.FC = () => {
    return (
        <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', textAlign: 'center', color: '#94a3b8' }}>
            <h1 style={{ color: '#f8fafc', marginBottom: '16px' }}>Archive</h1>
            <p>This is where old ideas go to sleep.</p>
            <div style={{ marginTop: '40px', padding: '40px', border: '2px dashed #334155', borderRadius: '16px' }}>
                No archived notes yet.
            </div>
        </div>
    );
};

export default Archive;
