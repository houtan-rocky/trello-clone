/**
 * List Component
 * Displays a list with cards and supports drag & drop
 */

'use client';

import { Droppable } from '@hello-pangea/dnd';
import { List as ListType } from '@/types';
import { Card } from './Card';
import { AddCardButton } from './AddCardButton';
import { ListHeader } from './ListHeader';
import styles from './List.module.scss';

interface ListProps {
  list: ListType;
  index: number;
}

export const List = ({ list, index }: ListProps) => {
  return (
    <div className={styles.list}>
      <ListHeader list={list} />
      <Droppable droppableId={list.id} type="CARD">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={styles.cardsContainer}
          >
            {list.cards.map((card, cardIndex) => (
              <Card
                key={card.id}
                card={card}
                listId={list.id}
                index={cardIndex}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <AddCardButton listId={list.id} />
    </div>
  );
};
