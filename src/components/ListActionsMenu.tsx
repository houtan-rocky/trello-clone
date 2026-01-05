/**
 * ListActionsMenu Component
 * Menu widget for list actions with confirmation screens
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './ListActionsMenu.module.scss';

type MenuScreen = 'main' | 'deleteList' | 'deleteAllCards';

interface ListActionsMenuProps {
  onClose: () => void;
  onDeleteList: () => void;
  onDeleteAllCards: () => void;
}

export const ListActionsMenu = ({
  onClose,
  onDeleteList,
  onDeleteAllCards,
}: ListActionsMenuProps) => {
  const [screen, setScreen] = useState<MenuScreen>('main');
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (screen === 'main') {
          onClose();
        } else {
          setScreen('main');
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose, screen]);

  const handleBack = () => {
    setScreen('main');
  };

  const handleDeleteListConfirm = () => {
    onDeleteList();
    onClose();
  };

  const handleDeleteAllCardsConfirm = () => {
    onDeleteAllCards();
    onClose();
  };

  return (
    <div ref={menuRef} className={styles.menu}>
      <div className={styles.header}>
        {screen !== 'main' && (
          <button
            type="button"
            className={styles.headerButton}
            onClick={handleBack}
            aria-label="Back"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="chevron-left"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path
                fill="currentColor"
                d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"
              />
            </svg>
          </button>
        )}
        {screen === 'main' && (
          <button type="button" className={styles.headerButton} disabled aria-hidden="true">
            <span style={{ width: '16px', height: '16px' }} />
          </button>
        )}
        <h3 className={styles.headerTitle}>
          {screen === 'main' && 'List Actions'}
          {screen === 'deleteList' && 'Delete List'}
          {screen === 'deleteAllCards' && 'Delete All Cards'}
        </h3>
        <button
          type="button"
          className={styles.headerButton}
          onClick={onClose}
          aria-label="Close"
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
      <div className={styles.content}>
        {screen === 'main' && (
          <ul className={styles.menuList}>
            <li className={styles.menuItem}>
              <button
                type="button"
                className={styles.menuLink}
                onClick={() => setScreen('deleteList')}
              >
                Delete List
              </button>
            </li>
            <li className={styles.menuItem}>
              <button
                type="button"
                className={styles.menuLink}
                onClick={() => setScreen('deleteAllCards')}
              >
                Delete All Cards
              </button>
            </li>
          </ul>
        )}
        {screen === 'deleteList' && (
          <div className={styles.confirmation}>
            <p className={styles.confirmationText}>
              All actions will be removed from the activity feed and you won't be able to re-open
              the list. There is no undo.
            </p>
            <button
              type="button"
              className={styles.deleteButton}
              onClick={handleDeleteListConfirm}
            >
              Delete list
            </button>
          </div>
        )}
        {screen === 'deleteAllCards' && (
          <div className={styles.confirmation}>
            <p className={styles.confirmationText}>
              This will remove all the cards in this list from the board.
            </p>
            <button
              type="button"
              className={styles.deleteButton}
              onClick={handleDeleteAllCardsConfirm}
            >
              Delete all
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

