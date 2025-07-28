'use client';

import { useState, useEffect, useCallback } from 'react';
import { StorageManager } from '@/utils/storage';
import { VoteState } from '@/types';
import { VOTING_CONFIG } from '@/lib/constants';

interface UseVoteStateReturn {
  voteState: VoteState;
  isInitialized: boolean;
  updateVoteState: (updates: Partial<VoteState>) => void;
  resetVoteState: () => void;
}

export function useVoteState(): UseVoteStateReturn {
  const [voteState, setVoteState] = useState<VoteState>({
    votedContestants: [],
    remainingVotes: VOTING_CONFIG.MAX_VOTES_PER_USER,
    lastVoteTime: 0,
  });
  const [isInitialized, setIsInitialized] = useState(false);

  // Load initial state from localStorage
  useEffect(() => {
    const savedState = StorageManager.getVoteState();
    if (savedState) {
      setVoteState(savedState);
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage whenever state changes (but not on initial load)
  useEffect(() => {
    if (isInitialized) {
      StorageManager.setVoteState(voteState);
    }
  }, [voteState, isInitialized]);

  const updateVoteState = useCallback((updates: Partial<VoteState>) => {
    setVoteState(prevState => ({
      ...prevState,
      ...updates,
    }));
  }, []);

  const resetVoteState = useCallback(() => {
    const initialState: VoteState = {
      votedContestants: [],
      remainingVotes: VOTING_CONFIG.MAX_VOTES_PER_USER,
      lastVoteTime: 0,
    };
    setVoteState(initialState);
    StorageManager.clearVoteState();
  }, []);

  return {
    voteState,
    isInitialized,
    updateVoteState,
    resetVoteState,
  };
}