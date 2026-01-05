/**
 * Card Component
 * Displays a card with title and comment button
 */

'use client';

import { Draggable } from '@hello-pangea/dnd';
import { useState } from 'react';
import { Card as CardType } from '@/types';
import { CardModal } from './CardModal';
import styles from './Card.module.scss';

interface CardProps {
  card: CardType;
  listId: string;
  index: number;
}

export const Card = ({ card, listId, index }: CardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const commentCount = card.comments.length;

  return (
    <>
      <Draggable draggableId={card.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={styles.card}
            style={{
              ...provided.draggableProps.style,
              transform: snapshot.isDragging && provided.draggableProps.style?.transform
                ? `${provided.draggableProps.style.transform} rotate(3deg)`
                : provided.draggableProps.style?.transform,
            }}
            onClick={() => setIsModalOpen(true)}
          >
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <div className={styles.cardFooter}>
                <button
                  type="button"
                  className={styles.commentButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(true);
                  }}
                >
                  Comments ({commentCount})
                </button>
              </div>
            </div>
          </div>
        )}
      </Draggable>
      {isModalOpen && (
        <CardModal
          card={card}
          listId={listId}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};
