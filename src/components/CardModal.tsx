/**
 * CardModal Component
 * Modal for viewing and editing card details and comments
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useBoardActions } from '@/hooks';
import { Card as CardType } from '@/types';
import { APP_CONFIG } from '@/utils/constants';
import styles from './CardModal.module.scss';

interface CardModalProps {
  card: CardType;
  listId: string;
  onClose: () => void;
}

const formatCommentDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(date);
};

export const CardModal = ({ card, listId, onClose }: CardModalProps) => {
  const { addComment } = useBoardActions();
  const [newComment, setNewComment] = useState('');
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    // Prevent body scroll when modal is open
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.body.style.overflow = originalStyle;
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      addComment(card.id, {
        text: newComment.trim(),
      });
      setNewComment('');
    }
  };

  if (!mounted) {
    return null;
  }

  const modalContent = (
    <div className={styles.overlay}>
      <div className={styles.modal} ref={modalRef}>
        <div className={styles.modalContent}>
          <div className={styles.header}>
            <h4 className={styles.title}>Comments for &quot;{card.title}&quot;</h4>
            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close"
            >
              ×
            </button>
          </div>

          <ul className={styles.commentsList}>
            {card.comments.length === 0 ? (
              <li className={styles.commentItem}>
                No comments yet. Be the first to comment!
              </li>
            ) : (
              [...card.comments]
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
                .map((comment) => (
                  <li key={comment.id} className={styles.commentItem}>
                    <div className={styles.commentMeta}>
                      You · {formatCommentDate(comment.createdAt)}
                    </div>
                    {comment.text}
                  </li>
                ))
            )}
          </ul>

          <form className={styles.commentForm} onSubmit={handleSubmit}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className={styles.commentTextarea}
              placeholder="Write a comment..."
              spellCheck={false}
              maxLength={APP_CONFIG.MAX_COMMENT_LENGTH}
            />
            <button
              type="submit"
              className={styles.addButton}
              disabled={!newComment.trim()}
            >
              Add Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
