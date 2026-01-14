import express from 'express';
import cors from 'cors';
import { JSONFilePreset } from 'lowdb/node';
import { nanoid } from 'nanoid';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// DB Setup
const defaultData = { notes: [] };
const db = await JSONFilePreset('db.json', defaultData);

// Routes
// 1. Get all notes
app.get('/api/notes', async (req, res) => {
    await db.read();
    // Return newest first
    const sortedNotes = [...db.data.notes].reverse();
    res.json(sortedNotes);
});

// 2. Create a note
app.post('/api/notes', async (req, res) => {
    const { content, color, category, author } = req.body;

    if (!content) {
        return res.status(400).json({ error: 'Content is required' });
    }

    const newNote = {
        id: nanoid(),
        content,
        color: color || 'yellow', // yellow, pink, blue, green
        category: category || 'General',
        author: author || 'Anonymous',
        likes: 0,
        createdAt: new Date().toISOString(),
        rotation: Math.floor(Math.random() * 6) - 3 // Random rotation -3 to 3 deg
    };

    await db.update(({ notes }) => notes.push(newNote));
    res.status(201).json(newNote);
});

// 3. Like a note
app.patch('/api/notes/:id/like', async (req, res) => {
    const { id } = req.params;
    await db.update(({ notes }) => {
        const note = notes.find(n => n.id === id);
        if (note) note.likes += 1;
    });
    res.json({ success: true });
});

// 4. Delete a note
app.delete('/api/notes/:id', async (req, res) => {
    const { id } = req.params;
    await db.update(({ notes }) => {
        const index = notes.findIndex(n => n.id === id);
        if (index !== -1) notes.splice(index, 1);
    });
    res.json({ success: true });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
