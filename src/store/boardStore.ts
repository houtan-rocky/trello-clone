/**
 * Board Store using Zustand
 * Manages board state and all board-related operations
 * Following SOLID principles and clean architecture
 */

import { create } from 'zustand';
import { Board, BoardState, List, Card, Comment } from '@/types';
import { DEMO_BOARD } from '@/utils/constants';
import { saveBoardToStorage, loadBoardFromStorage } from '@/utils/localStorage';
import { generateId } from '@/utils/idGenerator';

interface BoardStore extends BoardState {
  // Actions
  setBoard: (board: Board) => void;
  updateBoardTitle: (title: string) => void;
  addList: (list: Omit<List, 'id' | 'createdAt' | 'updatedAt' | 'cards'>) => void;
  updateList: (id: string, title: string) => void;
  deleteList: (id: string) => void;
  reorderLists: (lists: List[]) => void;
  addCard: (listId: string, card: Omit<Card, 'id' | 'createdAt' | 'updatedAt' | 'comments'>) => void;
  updateCard: (id: string, title: string) => void;
  deleteCard: (listId: string, cardId: string) => void;
  moveCard: (cardId: string, fromListId: string, toListId: string, newIndex: number) => void;
  addComment: (cardId: string, comment: Omit<Comment, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateComment: (cardId: string, commentId: string, text: string) => void;
  deleteComment: (cardId: string, commentId: string) => void;
  initializeBoard: () => void;
}

/**
 * Creates a new board store with Zustand
 * Manual localStorage persistence for better control
 */
export const useBoardStore = create<BoardStore>()(
  (set, get): BoardStore => ({
      // Initial state
      board: null,
      isLoading: false,
      error: null,

      // Initialize board from localStorage or use demo board
      initializeBoard: () => {
        const storedBoard = loadBoardFromStorage();
        if (storedBoard) {
          set({ board: storedBoard });
        } else {
          set({ board: DEMO_BOARD });
          saveBoardToStorage(DEMO_BOARD);
        }
      },

      // Set board
      setBoard: (board: Board) => {
        set({ board });
        saveBoardToStorage(board);
      },

      // Update board title
      updateBoardTitle: (title: string) => {
        const { board } = get();
        if (!board) return;

        const updatedBoard: Board = {
          ...board,
          title,
          updatedAt: new Date(),
        };

        set({ board: updatedBoard });
        saveBoardToStorage(updatedBoard);
      },

      // Add list
      addList: (listData: Omit<List, 'id' | 'createdAt' | 'updatedAt' | 'cards'>) => {
        const { board } = get();
        if (!board) return;

        const newList: List = {
          ...listData,
          id: generateId(),
          cards: [],
          createdAt: new Date(),
        };

        const updatedBoard: Board = {
          ...board,
          lists: [...board.lists, newList],
          updatedAt: new Date(),
        };

        set({ board: updatedBoard });
        saveBoardToStorage(updatedBoard);
      },

      // Update list title
      updateList: (id: string, title: string) => {
        const { board } = get();
        if (!board) return;

        const updatedBoard: Board = {
          ...board,
          lists: board.lists.map((list: List) =>
            list.id === id
              ? { ...list, title, updatedAt: new Date() }
              : list
          ),
          updatedAt: new Date(),
        };

        set({ board: updatedBoard });
        saveBoardToStorage(updatedBoard);
      },

      // Delete list
      deleteList: (id: string) => {
        const { board } = get();
        if (!board) return;

        const updatedBoard: Board = {
          ...board,
          lists: board.lists.filter((list: List) => list.id !== id),
          updatedAt: new Date(),
        };

        set({ board: updatedBoard });
        saveBoardToStorage(updatedBoard);
      },

      // Reorder lists
      reorderLists: (lists: List[]) => {
        const { board } = get();
        if (!board) return;

        const updatedBoard: Board = {
          ...board,
          lists: lists.map((list, index) => ({
            ...list,
            order: index,
          })),
          updatedAt: new Date(),
        };

        set({ board: updatedBoard });
        saveBoardToStorage(updatedBoard);
      },

      // Add card
      addCard: (listId: string, cardData: Omit<Card, 'id' | 'createdAt' | 'updatedAt' | 'comments'>) => {
        const { board } = get();
        if (!board) return;

        const newCard: Card = {
          ...cardData,
          id: generateId(),
          listId,
          comments: [],
          createdAt: new Date(),
        };

        const updatedBoard: Board = {
          ...board,
          lists: board.lists.map((list: List) =>
            list.id === listId
              ? {
                  ...list,
                  cards: [...list.cards, newCard],
                  updatedAt: new Date(),
                }
              : list
          ),
          updatedAt: new Date(),
        };

        set({ board: updatedBoard });
        saveBoardToStorage(updatedBoard);
      },

      // Update card title
      updateCard: (id: string, title: string) => {
        const { board } = get();
        if (!board) return;

        const updatedBoard: Board = {
          ...board,
          lists: board.lists.map((list: List) => ({
            ...list,
            cards: list.cards.map((card: Card) =>
              card.id === id
                ? { ...card, title, updatedAt: new Date() }
                : card
            ),
          })),
          updatedAt: new Date(),
        };

        set({ board: updatedBoard });
        saveBoardToStorage(updatedBoard);
      },

      // Delete card
      deleteCard: (listId: string, cardId: string) => {
        const { board } = get();
        if (!board) return;

        const updatedBoard: Board = {
          ...board,
          lists: board.lists.map((list: List) =>
            list.id === listId
              ? {
                  ...list,
                  cards: list.cards.filter((card: Card) => card.id !== cardId),
                  updatedAt: new Date(),
                }
              : list
          ),
          updatedAt: new Date(),
        };

        set({ board: updatedBoard });
        saveBoardToStorage(updatedBoard);
      },

      // Move card between lists or within same list
      moveCard: (cardId: string, fromListId: string, toListId: string, newIndex: number) => {
        const { board } = get();
        if (!board) return;

        // Find the card to move
        const fromList = board.lists.find((list: List) => list.id === fromListId);
        if (!fromList) return;

        const cardToMove = fromList.cards.find((c: Card) => c.id === cardId);
        if (!cardToMove) return;

        // Remove card from source list
        let updatedLists = board.lists.map((list: List) => {
          if (list.id === fromListId) {
            return {
              ...list,
              cards: list.cards.filter((c: Card) => c.id !== cardId),
              updatedAt: new Date(),
            };
          }
          return list;
        });

        // Update card's listId if moving to different list
        const updatedCard: Card = {
          id: cardToMove.id,
          title: cardToMove.title,
          listId: toListId,
          order: newIndex,
          comments: cardToMove.comments,
          createdAt: cardToMove.createdAt,
          updatedAt: new Date(),
        };

        // Add card to target list
        updatedLists = updatedLists.map((list: List) => {
          if (list.id === toListId) {
            const newCards = [...list.cards];
            newCards.splice(newIndex, 0, updatedCard);
            return {
              ...list,
              cards: newCards.map((card: Card, index: number) => ({
                ...card,
                order: index,
              })),
              updatedAt: new Date(),
            };
          }
          return list;
        });

        const updatedBoard: Board = {
          ...board,
          lists: updatedLists,
          updatedAt: new Date(),
        };

        set({ board: updatedBoard });
        saveBoardToStorage(updatedBoard);
      },

      // Add comment to card
      addComment: (cardId: string, commentData: Omit<Comment, 'id' | 'createdAt' | 'updatedAt'>) => {
        const { board } = get();
        if (!board) return;

        const newComment: Comment = {
          ...commentData,
          id: generateId(),
          createdAt: new Date(),
        };

        const updatedBoard: Board = {
          ...board,
          lists: board.lists.map((list: List) => ({
            ...list,
            cards: list.cards.map((card: Card) =>
              card.id === cardId
                ? {
                    ...card,
                    comments: [...card.comments, newComment],
                    updatedAt: new Date(),
                  }
                : card
            ),
          })),
          updatedAt: new Date(),
        };

        set({ board: updatedBoard });
        saveBoardToStorage(updatedBoard);
      },

      // Update comment
      updateComment: (cardId: string, commentId: string, text: string) => {
        const { board } = get();
        if (!board) return;

        const updatedBoard: Board = {
          ...board,
          lists: board.lists.map((list: List) => ({
            ...list,
            cards: list.cards.map((card: Card) =>
              card.id === cardId
                ? {
                    ...card,
                    comments: card.comments.map((comment: Comment) =>
                      comment.id === commentId
                        ? { ...comment, text, updatedAt: new Date() }
                        : comment
                    ),
                    updatedAt: new Date(),
                  }
                : card
            ),
          })),
          updatedAt: new Date(),
        };

        set({ board: updatedBoard });
        saveBoardToStorage(updatedBoard);
      },

      // Delete comment
      deleteComment: (cardId: string, commentId: string) => {
        const { board } = get();
        if (!board) return;

        const updatedBoard: Board = {
          ...board,
          lists: board.lists.map((list: List) => ({
            ...list,
            cards: list.cards.map((card: Card) =>
              card.id === cardId
                ? {
                    ...card,
                    comments: card.comments.filter((comment: Comment) => comment.id !== commentId),
                    updatedAt: new Date(),
                  }
                : card
            ),
          })),
          updatedAt: new Date(),
        };

        set({ board: updatedBoard });
        saveBoardToStorage(updatedBoard);
      },
    })
);

