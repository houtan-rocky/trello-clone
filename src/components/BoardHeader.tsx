/**
 * BoardHeader Component
 * Displays board title with inline editing capability
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { useBoardActions } from '@/hooks';
import { Board as BoardType } from '@/types';
import styles from './BoardHeader.module.scss';

interface BoardHeaderProps {
  board: BoardType;
}

export const BoardHeader = ({ board }: BoardHeaderProps) => {
  const { updateBoardTitle } = useBoardActions();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(board.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTitle(board.title);
  }, [board.title]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (title.trim() && title !== board.title) {
      updateBoardTitle(title.trim());
    } else {
      setTitle(board.title);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      inputRef.current?.blur();
    } else if (e.key === 'Escape') {
      setTitle(board.title);
      setIsEditing(false);
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={styles.titleInput}
            maxLength={100}
          />
        ) : (
          <h1 className={styles.title} onClick={handleClick}>
            {board.title}
          </h1>
        )}
      </div>
    </div>
  );
};

