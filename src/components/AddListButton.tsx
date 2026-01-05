/**
 * AddListButton Component
 * Button to add a new list to the board
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { useBoardActions } from '@/hooks';
import { useBoard } from '@/hooks';
import { APP_CONFIG } from '@/utils/constants';
import styles from './AddListButton.module.scss';

export const AddListButton = () => {
  const { board } = useBoard();
  const { addList } = useBoardActions();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleCancel = () => {
    setTitle('');
    setIsEditing(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        handleCancel();
      }
    };

    if (isEditing) {
      // Use setTimeout to avoid closing immediately when clicking the button
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 0);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isEditing]);

  if (!board) return null;

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addList({
        title: title.trim(),
        boardId: board.id,
        order: board.lists.length,
      });
      setTitle('');
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div ref={containerRef} className={styles.editingContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            ref={inputRef}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            className={styles.input}
            placeholder="Enter a list title..."
            spellCheck={false}
            maxLength={APP_CONFIG.MAX_LIST_TITLE_LENGTH}
          />
          <div className={styles.buttonGroup}>
            <button
              type="submit"
              disabled={!title.trim()}
              className={styles.createButton}
            >
              Add list
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className={styles.cancelButton}
              aria-label="Cancel"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="times"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 352 512"
              >
                <path
                  fill="currentColor"
                  d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleClick}>
        + Add another list
      </button>
    </div>
  );
};

