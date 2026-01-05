/**
 * ListHeader Component
 * Displays list title with inline editing and menu button
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { useBoardActions } from '@/hooks';
import { List as ListType } from '@/types';
import { ListActionsMenu } from './ListActionsMenu';
import styles from './ListHeader.module.scss';

interface ListHeaderProps {
  list: ListType;
}

export const ListHeader = ({ list }: ListHeaderProps) => {
  const { updateList, deleteList, deleteAllCards } = useBoardActions();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(list.title);
  const [showMenu, setShowMenu] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setTitle(list.title);
  }, [list.title]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const handleTitleBlur = () => {
    setIsEditing(false);
    if (title.trim() && title !== list.title) {
      updateList(list.id, title.trim());
    } else {
      setTitle(list.title);
    }
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      inputRef.current?.blur();
    } else if (e.key === 'Escape') {
      setTitle(list.title);
      setIsEditing(false);
    }
  };

  const handleDeleteList = () => {
    deleteList(list.id);
  };

  const handleDeleteAllCards = () => {
    deleteAllCards(list.id);
  };

  return (
    <div className={styles.header}>
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleTitleBlur}
          onKeyDown={handleTitleKeyDown}
          className={styles.titleInput}
          maxLength={100}
        />
      ) : (
        <h2
          className={styles.title}
          onClick={handleTitleClick}
          tabIndex={0}
        >
          {list.title}
        </h2>
      )}
      <div className={styles.menu}>
        <button
          ref={menuButtonRef}
          className={styles.menuButton}
          onClick={() => setShowMenu(!showMenu)}
          aria-label="List options"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="ellipsis-h"
            className={styles.menuIcon}
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"
            />
          </svg>
        </button>
        {showMenu && (
          <ListActionsMenu
            onClose={() => setShowMenu(false)}
            onDeleteList={handleDeleteList}
            onDeleteAllCards={handleDeleteAllCards}
          />
        )}
      </div>
    </div>
  );
};

