/**
 * Constants for the application
 * Demo board data and configuration
 */

import { Board, List, Card } from '@/types';
import { generateId } from './idGenerator';

/**
 * Demo board data - pre-initialized board
 */
export const DEMO_BOARD: Board = {
  id: generateId(),
  title: 'Demo Board',
  createdAt: new Date(),
  lists: [
    {
      id: generateId(),
      title: 'To Do',
      boardId: '',
      order: 0,
      cards: [
        {
          id: generateId(),
          title: 'Setup project structure',
          listId: '',
          order: 0,
          comments: [],
          createdAt: new Date(),
        },
        {
          id: generateId(),
          title: 'Implement drag and drop',
          listId: '',
          order: 1,
          comments: [],
          createdAt: new Date(),
        },
      ],
      createdAt: new Date(),
    },
    {
      id: generateId(),
      title: 'In Progress',
      boardId: '',
      order: 1,
      cards: [
        {
          id: generateId(),
          title: 'Design UI components',
          listId: '',
          order: 0,
          comments: [],
          createdAt: new Date(),
        },
      ],
      createdAt: new Date(),
    },
    {
      id: generateId(),
      title: 'Done',
      boardId: '',
      order: 2,
      cards: [
        {
          id: generateId(),
          title: 'Project initialization',
          listId: '',
          order: 0,
          comments: [],
          createdAt: new Date(),
        },
      ],
      createdAt: new Date(),
    },
  ],
};

// Fix boardId references in lists and listId references in cards
DEMO_BOARD.lists.forEach((list, listIndex) => {
  list.boardId = DEMO_BOARD.id;
  list.cards.forEach((card, cardIndex) => {
    card.listId = list.id;
  });
});

/**
 * Application configuration
 */
export const APP_CONFIG = {
  MAX_LIST_TITLE_LENGTH: 100,
  MAX_CARD_TITLE_LENGTH: 200,
  MAX_COMMENT_LENGTH: 1000,
  DEBOUNCE_DELAY: 300, // ms
} as const;

