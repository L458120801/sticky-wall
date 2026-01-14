import { JSONFilePreset } from 'lowdb/node';
import { nanoid } from 'nanoid';

const defaultData = { notes: [] };
const db = await JSONFilePreset('db.json', defaultData);

const seedNotes = [
    {
        content: "这是一个用来展示华为云构建能力的 Cloud Wall 项目！ 🚀",
        color: "blue",
        author: "Developer",
        rotation: -2,
        comments: [
            { id: nanoid(), author: "CloudFan", text: "太棒了！期待更多功能！", createdAt: new Date().toISOString() },
            { id: nanoid(), author: "新手小白", text: "请问部署难吗？", createdAt: new Date().toISOString() },
            { id: nanoid(), author: "Developer", text: "很简单的，跟着教程走就行！", createdAt: new Date().toISOString() }
        ]
    },
    {
        content: "记得下午 3 点参加 Team Meeting。",
        color: "yellow",
        author: "Alice",
        rotation: 1,
        comments: [
            { id: nanoid(), author: "Bob", text: "收到！我会准时参加", createdAt: new Date().toISOString() }
        ]
    },
    {
        content: "灵感：做一个 AI 驱动的食谱生成器？🥦🥩",
        color: "green",
        author: "ChefBot",
        rotation: 3,
        comments: [
            { id: nanoid(), author: "吃货一号", text: "支持！请加上卡路里计算", createdAt: new Date().toISOString() },
            { id: nanoid(), author: "减肥中", text: "能推荐低卡食谱吗？", createdAt: new Date().toISOString() }
        ]
    },
    {
        content: "Don't forget to drink water! 💧",
        color: "pink",
        author: "HealthMod",
        rotation: -1,
        comments: []
    },
    {
        content: "ECS 部署非常顺利，不到 10 分钟搞定。",
        color: "purple",
        author: "DevOps",
        rotation: 2,
        comments: [
            { id: nanoid(), author: "运维新手", text: "求教程链接！", createdAt: new Date().toISOString() },
            { id: nanoid(), author: "DevOps", text: "官方文档很详细，搜索华为云ECS即可", createdAt: new Date().toISOString() },
            { id: nanoid(), author: "小明", text: "已部署成功，感谢分享！", createdAt: new Date().toISOString() },
            { id: nanoid(), author: "架构师", text: "性能如何？", createdAt: new Date().toISOString() }
        ]
    }
];

// Clear and reseed
await db.update(({ notes }) => {
    notes.length = 0; // Clear existing
    seedNotes.forEach(n => {
        notes.push({
            id: nanoid(),
            content: n.content,
            color: n.color,
            author: n.author,
            likes: Math.floor(Math.random() * 15),
            createdAt: new Date().toISOString(),
            rotation: n.rotation,
            x: Math.floor(Math.random() * (1600 - 300)) + 100,
            y: Math.floor(Math.random() * (1200 - 300)) + 100,
            comments: n.comments || []
        });
    });
    console.log("Database seeded with comments!");
});
