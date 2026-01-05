/**
 * Utility for generating unique IDs
 * Simple implementation using timestamp and random number
 */

/**
 * Generates a unique ID string
 * Format: timestamp-randomNumber
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Generates a short unique ID
 * Useful for display purposes
 */
export const generateShortId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

