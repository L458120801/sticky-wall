import React, { useRef } from 'react';
import { Trash2, Heart } from 'lucide-react';
import { motion, useDragControls } from 'framer-motion';
import './NoteCard.css';

interface NoteProps {
    id: string;
    content: string;
    author: string;
    color: string;
    likes: number;
    rotation: number;
    x?: number;
    y?: number;
    createdAt: string;
    comments?: { id: string; author: string; text: string; createdAt: string }[];
    dragConstraints: React.RefObject<Element>;
    onDelete: (id: string) => void;
    onLike: (id: string) => void;
    onPositionChange: (id: string, x: number, y: number) => void;
    onExpand: (note: any) => void;
}

const NoteCard: React.FC<NoteProps> = ({
    id, content, author, color, likes, rotation, createdAt, x, y, comments, dragConstraints,
    onDelete, onLike, onPositionChange, onExpand
}) => {
    const controls = useDragControls();

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        onLike(id);
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete(id);
    };

    return (
        <motion.div
            className="note-card"
            style={{
                '--note-color': `var(--note-${color})`,
                position: 'absolute',
                left: 0,
                top: 0,
                x,
                y,
                rotate: rotation
            } as any}

            // Drag Config
            drag
            dragListener={false} // Only drag via controls (handle)
            dragControls={controls}
            // Don't use dragConstraints - we will manually clamp in onDragEnd
            dragMomentum={false}
            dragElastic={0}
            layout={false} // Prevent layout animation on resize

            onDragEnd={(_, info) => {
                // Calculate new position
                let newX = (x || 0) + info.offset.x;
                let newY = (y || 0) + info.offset.y;

                // Card dimensions (from CSS)
                const CARD_WIDTH = 250;
                // PIN is at top-center of card: pinX = x + cardWidth/2, pinY = y - 15
                // We need PIN to stay within board bounds (1600 x 2160)

                const BOARD_WIDTH = 1600;
                const BOARD_HEIGHT = 2160;
                const MARGIN = 10;

                // PIN position: (x + CARD_WIDTH/2, y - 15)
                // To keep PIN in [MARGIN, BOARD_WIDTH - MARGIN]:
                //   MARGIN <= x + CARD_WIDTH/2 <= BOARD_WIDTH - MARGIN
                //   x >= MARGIN - CARD_WIDTH/2
                //   x <= BOARD_WIDTH - MARGIN - CARD_WIDTH/2

                const minX = MARGIN - CARD_WIDTH / 2;  // ~-115, allows card to hang left
                const maxX = BOARD_WIDTH - MARGIN - CARD_WIDTH / 2;  // ~1465
                const minY = MARGIN + 20;  // Pin is above card top, ensure some space
                const maxY = BOARD_HEIGHT - MARGIN;

                newX = Math.max(minX, Math.min(maxX, newX));
                newY = Math.max(minY, Math.min(maxY, newY));

                onPositionChange(id, newX, newY);
            }}

            onDoubleClick={(e) => {
                e.stopPropagation();
                onExpand({ id, content, author, color, likes, createdAt, comments });
            }}

            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}

            whileHover={{
                zIndex: 50,
                filter: "brightness(1.05)"
            }}
            whileDrag={{
                zIndex: 999,
                // No extra effects as requested
            }}
        >
            {/* Drag Handle - The Pin Area */}
            <div
                className="drag-handle"
                onPointerDown={(e) => controls.start(e)}
            ></div>

            <div className="note-content">
                <p>{content}</p>
            </div>

            <div className="note-footer">
                <div className="note-meta">
                    <span className="author">@{author}</span>
                    <span className="date">{new Date(createdAt).toLocaleDateString()}</span>
                </div>

                <div className="note-actions" onPointerDownCapture={e => e.stopPropagation()}>
                    <span className="action-btn comment-count" title="双击查看留言">
                        💬 {comments?.length || 0}
                    </span>
                    <button className="action-btn like-btn" onClick={handleLike}>
                        <Heart size={14} className={likes > 0 ? 'fill-current' : ''} />
                        <span>{likes}</span>
                    </button>
                    <button className="action-btn delete-btn" onClick={handleDelete}>
                        <Trash2 size={14} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default NoteCard;
