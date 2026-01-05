/**
 * Custom hook for board operations
 * Provides convenient access to board store and common operations
 */

import { useBoardStore } from '@/store/boardStore';
import { useEffect } from 'react';

/**
 * Hook to access and manage board state
 * Automatically initializes board on mount if not already loaded
 */
export const useBoard = () => {
  const board = useBoardStore((state) => state.board);
  const isLoading = useBoardStore((state) => state.isLoading);
  const error = useBoardStore((state) => state.error);
  const initializeBoard = useBoardStore((state) => state.initializeBoard);

  // Initialize board on mount if not already loaded
  useEffect(() => {
    if (!board) {
      initializeBoard();
    }
  }, [board, initializeBoard]);

  return {
    board,
    isLoading,
    error,
    initializeBoard,
  };
};

/**
 * Hook to access board actions
 * Separated for better performance (only components that need actions will re-render)
 */
export const useBoardActions = () => {
  return {
    setBoard: useBoardStore((state) => state.setBoard),
    updateBoardTitle: useBoardStore((state) => state.updateBoardTitle),
    addList: useBoardStore((state) => state.addList),
    updateList: useBoardStore((state) => state.updateList),
    deleteList: useBoardStore((state) => state.deleteList),
    deleteAllCards: useBoardStore((state) => state.deleteAllCards),
    reorderLists: useBoardStore((state) => state.reorderLists),
    addCard: useBoardStore((state) => state.addCard),
    updateCard: useBoardStore((state) => state.updateCard),
    deleteCard: useBoardStore((state) => state.deleteCard),
    moveCard: useBoardStore((state) => state.moveCard),
    addComment: useBoardStore((state) => state.addComment),
    updateComment: useBoardStore((state) => state.updateComment),
    deleteComment: useBoardStore((state) => state.deleteComment),
  };
};

