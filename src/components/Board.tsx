/**
 * Board Component
 * Main container component that displays the board with all lists
 */

'use client';

import { useBoard, useBoardActions } from '@/hooks';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { List } from './List';
import { BoardHeader } from './BoardHeader';
import { AddListButton } from './AddListButton';
import styles from './Board.module.scss';

export const Board = () => {
  const { board } = useBoard();
  const { moveCard } = useBoardActions();

  if (!board) {
    return (
      <div className={styles.loading}>
        <p>Loading board...</p>
      </div>
    );
  }

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    // If dropped outside a droppable area, do nothing
    if (!destination) {
      return;
    }

    // If dropped in the same position, do nothing
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Handle card movement
    if (type === 'CARD') {
      const fromListId = source.droppableId;
      const toListId = destination.droppableId;
      const fromIndex = source.index;
      const toIndex = destination.index;

      moveCard(draggableId, fromListId, toListId, toIndex);
    }
  };

  return (
    <div className={styles.board}>
      <BoardHeader board={board} />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.listsContainer}>
          {board.lists.map((list, index) => (
            <List key={list.id} list={list} index={index} />
          ))}
          <AddListButton />
        </div>
      </DragDropContext>
    </div>
  );
};
