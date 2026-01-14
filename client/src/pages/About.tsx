import React from 'react';

const About: React.FC = () => {
    return (
        <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '24px', background: 'linear-gradient(to right, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                关于 CloudWall
            </h1>
            <div style={{ lineHeight: '1.8', color: '#cbd5e1' }}>
                <p>
                    CloudWall 是一个为你捕捉稍纵即逝灵感、分享奇思妙想的云端空间。
                    它保留了物理便利贴墙的直观与便捷，又赋予了云端互联的无限可能。
                </p>
                <h3 style={{ marginTop: '32px', color: '#f8fafc' }}>技术栈</h3>
                <ul style={{ paddingLeft: '20px', marginTop: '16px' }}>
                    <li><strong>前端:</strong> React, TypeScript, Vite</li>
                    <li><strong>样式:</strong> 原生 CSS (支持 Glassmorphism 玻璃拟态)</li>
                    <li><strong>后端:</strong> Node.js, Express</li>
                </ul>
                <h3 style={{ marginTop: '32px', color: '#f8fafc' }}>我们的愿景</h3>
                <p>
                    打造一个纯粹、无干扰的创意分享环境。
                </p>
            </div>
        </div>
    );
};

export default About;
