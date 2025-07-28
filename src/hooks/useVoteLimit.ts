'use client';

import { useState, useCallback, useEffect } from 'react';
import { StorageManager } from '@/utils/storage';
import { VOTING_CONFIG } from '@/lib/constants';
import { VoteState } from '@/types';

interface UseVoteLimitReturn {
  voteState: VoteState;
  canVote: boolean;
  hasVotedFor: (contestantId: string) => boolean;
  recordVote: (contestantId: string) => void;
  clearVotes: () => void;
  isInitialized: boolean;
}

export function useVoteLimit(): UseVoteLimitReturn {
  const [voteState, setVoteState] = useState<VoteState>({
    votedContestants: [],
    remainingVotes: VOTING_CONFIG.MAX_VOTES_PER_USER,
    lastVoteTime: 0,
  });
  const [isInitialized, setIsInitialized] = useState(false);

  // Load initial vote state from localStorage
  useEffect(() => {
    const savedVoteState = StorageManager.getVoteState();
    if (savedVoteState) {
      setVoteState(savedVoteState);
    }
    setIsInitialized(true);
  }, []);

  // Save vote state to localStorage whenever it changes (but not on initial load)
  useEffect(() => {
    if (isInitialized) {
      StorageManager.setVoteState(voteState);
    }
  }, [voteState, isInitialized]);

  const canVote = voteState.remainingVotes > 0;

  const hasVotedFor = useCallback((contestantId: string) => {
    return voteState.votedContestants.includes(contestantId);
  }, [voteState.votedContestants]);

  const recordVote = useCallback((contestantId: string) => {
    if (hasVotedFor(contestantId) || voteState.remainingVotes <= 0) {
      return;
    }

    setVoteState(prevState => ({
      votedContestants: [...prevState.votedContestants, contestantId],
      remainingVotes: prevState.remainingVotes - 1,
      lastVoteTime: Date.now(),
    }));
  }, [hasVotedFor, voteState.remainingVotes]);

  const clearVotes = useCallback(() => {
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
    canVote,
    hasVotedFor,
    recordVote,
    clearVotes,
    isInitialized,
  };
}