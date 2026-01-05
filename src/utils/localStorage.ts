/**
 * LocalStorage utilities for data persistence
 * Handles serialization/deserialization and error handling
 */

import { Board } from '@/types';

const STORAGE_KEY = 'trello-clone-board';

/**
 * Saves board data to localStorage
 * @param board - Board object to save
 * @returns true if successful, false otherwise
 */
export const saveBoardToStorage = (board: Board): boolean => {
  try {
    const serialized = JSON.stringify(board);
    localStorage.setItem(STORAGE_KEY, serialized);
    return true;
  } catch (error) {
    console.error('Error saving board to localStorage:', error);
    return false;
  }
};

/**
 * Loads board data from localStorage
 * @returns Board object or null if not found or error
 */
export const loadBoardFromStorage = (): Board | null => {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (!serialized) {
      return null;
    }
    
    const board = JSON.parse(serialized) as Board;
    
    // Convert date strings back to Date objects
    board.createdAt = new Date(board.createdAt);
    if (board.updatedAt) {
      board.updatedAt = new Date(board.updatedAt);
    }
    
    // Convert dates in lists
    board.lists = board.lists.map(list => ({
      ...list,
      createdAt: new Date(list.createdAt),
      updatedAt: list.updatedAt ? new Date(list.updatedAt) : undefined,
      cards: list.cards.map(card => ({
        ...card,
        createdAt: new Date(card.createdAt),
        updatedAt: card.updatedAt ? new Date(card.updatedAt) : undefined,
        comments: card.comments.map(comment => ({
          ...comment,
          createdAt: new Date(comment.createdAt),
          updatedAt: comment.updatedAt ? new Date(comment.updatedAt) : undefined,
        })),
      })),
    }));
    
    return board;
  } catch (error) {
    console.error('Error loading board from localStorage:', error);
    return null;
  }
};

/**
 * Clears board data from localStorage
 */
export const clearBoardFromStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing board from localStorage:', error);
  }
};

/**
 * Checks if localStorage is available
 * @returns true if available, false otherwise
 */
export const isLocalStorageAvailable = (): boolean => {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
};

