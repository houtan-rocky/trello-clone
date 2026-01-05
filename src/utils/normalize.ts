/**
 * Normalization Utilities
 * Converts nested board data structures into flat normalized structures
 * Useful for state management and data transformation
 */

import { normalize, schema } from 'normalizr';
import { Board, List, Card, Comment } from '@/types';

/**
 * Normalized entities structure
 */
export interface NormalizedEntities {
  boards?: Record<string, Omit<Board, 'lists'>>;
  lists?: Record<string, Omit<List, 'cards'>>;
  cards?: Record<string, Omit<Card, 'comments'>>;
  comments?: Record<string, Comment>;
}

/**
 * Normalizes board data from nested structure to flat structure
 * @param boards - Single board or array of boards to normalize
 * @returns Normalized entities object
 */
export const normalizeBoards = (boards: Board | Board[] | null): NormalizedEntities => {
  if (!boards) {
    return {};
  }

  // Define schema for comments
  const commentSchema = new schema.Entity<Comment>('comments', {}, { idAttribute: 'id' });

  // Define schema for cards (with comments)
  const cardSchema = new schema.Entity<Card>(
    'cards',
    { comments: [commentSchema] },
    { idAttribute: 'id' }
  );

  // Define schema for lists (with cards)
  const listSchema = new schema.Entity<List>(
    'lists',
    { cards: [cardSchema] },
    { idAttribute: 'id' }
  );

  // Define schema for board (with lists)
  const boardSchema = new schema.Entity<Board>(
    'boards',
    { lists: [listSchema] },
    { idAttribute: 'id' }
  );

  // Normalize the boards data
  const boardsArray = Array.isArray(boards) ? boards : [boards];
  const { entities } = normalize<Board, NormalizedEntities>(boardsArray, [boardSchema]);

  return entities;
};

/**
 * Normalizes a single board
 * @param board - Board to normalize
 * @returns Normalized entities object
 */
export const normalizeBoard = (board: Board | null): NormalizedEntities => {
  return normalizeBoards(board);
};

