import { STORAGE_KEYS } from '@/lib/constants';
import { VoteState } from '@/types';

export class StorageManager {
  static getVoteState(): VoteState | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.VOTE_STATE);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Error reading vote state from storage:', error);
      return null;
    }
  }

  static setVoteState(state: VoteState): void {
    try {
      localStorage.setItem(STORAGE_KEYS.VOTE_STATE, JSON.stringify(state));
    } catch (error) {
      console.error('Error saving vote state to storage:', error);
    }
  }

  static getUserId(): string {
    try {
      let userId = localStorage.getItem(STORAGE_KEYS.USER_ID);
      if (!userId) {
        userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem(STORAGE_KEYS.USER_ID, userId);
      }
      return userId;
    } catch (error) {
      console.error('Error managing user ID:', error);
      return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
  }

  static clearVoteState(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.VOTE_STATE);
    } catch (error) {
      console.error('Error clearing vote state:', error);
    }
  }
}