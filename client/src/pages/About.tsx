import React from 'react';

const About: React.FC = () => {
    return (
        <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '24px', background: 'linear-gradient(to right, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                About CloudWall
            </h1>
            <div style={{ lineHeight: '1.8', color: '#cbd5e1' }}>
                <p>
                    CloudWall is a digital space for your fleeting thoughts, brilliant ideas, and random musings.
                    Built with simplicity in mind, it captures the essence of a physical sticky-note wall but in the infinite cloud.
                </p>
                <h3 style={{ marginTop: '32px', color: '#f8fafc' }}>Technology Stack</h3>
                <ul style={{ paddingLeft: '20px', marginTop: '16px' }}>
                    <li><strong>Frontend:</strong> React, TypeScript, Vite</li>
                    <li><strong>Styling:</strong> Vanilla CSS with Modern Variables & Glassmorphism</li>
                    <li><strong>Backend:</strong> Node.js, Express</li>
                </ul>
                <h3 style={{ marginTop: '32px', color: '#f8fafc' }}>The Mission</h3>
                <p>
                    To provide a distraction-free environment for brainstorming and sharing ideas seamlessly across the web.
                </p>
            </div>
        </div>
    );
};

export default About;
