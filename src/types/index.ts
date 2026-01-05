/**
 * Type definitions for Trello Clone
 * Following SOLID principles and TypeScript best practices
 */

/**
 * Comment interface for cards
 * Each card can have multiple comments
 */
export interface Comment {
  id: string;
  text: string;
  createdAt: Date;
  updatedAt?: Date;
}

/**
 * Card interface
 * Cards belong to lists and can have comments
 */
export interface Card {
  id: string;
  title: string;
  listId: string;
  order: number;
  comments: Comment[];
  createdAt: Date;
  updatedAt?: Date;
}

/**
 * List interface
 * Lists belong to boards and contain cards
 */
export interface List {
  id: string;
  title: string;
  boardId: string;
  order: number;
  cards: Card[];
  createdAt: Date;
  updatedAt?: Date;
}

/**
 * Board interface
 * Main container for lists
 */
export interface Board {
  id: string;
  title: string;
  lists: List[];
  createdAt: Date;
  updatedAt?: Date;
}

/**
 * Drag and Drop types
 */
export type DragType = 'LIST' | 'CARD';

export interface DragItem {
  type: DragType;
  id: string;
  listId?: string; // For cards
  index: number;
}

/**
 * Store state interface
 * For state management
 */
export interface BoardState {
  board: Board | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Action types for board operations
 */
export type BoardAction =
  | { type: 'SET_BOARD'; payload: Board }
  | { type: 'UPDATE_BOARD_TITLE'; payload: string }
  | { type: 'ADD_LIST'; payload: List }
  | { type: 'UPDATE_LIST'; payload: { id: string; title: string } }
  | { type: 'DELETE_LIST'; payload: string }
  | { type: 'REORDER_LISTS'; payload: List[] }
  | { type: 'ADD_CARD'; payload: { listId: string; card: Card } }
  | { type: 'UPDATE_CARD'; payload: { id: string; title: string } }
  | { type: 'DELETE_CARD'; payload: { listId: string; cardId: string } }
  | { type: 'MOVE_CARD'; payload: { cardId: string; fromListId: string; toListId: string; newIndex: number } }
  | { type: 'ADD_COMMENT'; payload: { cardId: string; comment: Comment } }
  | { type: 'UPDATE_COMMENT'; payload: { cardId: string; commentId: string; text: string } }
  | { type: 'DELETE_COMMENT'; payload: { cardId: string; commentId: string } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

/**
 * Utility type for creating new entities
 */
export type CreateBoardInput = Omit<Board, 'id' | 'createdAt' | 'updatedAt'>;
export type CreateListInput = Omit<List, 'id' | 'createdAt' | 'updatedAt' | 'cards'>;
export type CreateCardInput = Omit<Card, 'id' | 'createdAt' | 'updatedAt' | 'comments'>;
export type CreateCommentInput = Omit<Comment, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * LocalStorage keys
 */
export const STORAGE_KEYS = {
  BOARD: 'trello-clone-board',
} as const;

