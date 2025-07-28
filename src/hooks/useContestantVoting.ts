'use client';

import { useState, useCallback } from 'react';
import { VoteStatus } from '@/types';

interface UseContestantVotingProps {
  contestantId: string;
  onVoteSuccess?: (contestantId: string) => void;
  onVoteError?: (contestantId: string, error: Error) => void;
}

interface UseContestantVotingReturn {
  isVoting: boolean;
  voteStatus: VoteStatus;
  error: string | null;
  submitVote: () => Promise<void>;
  resetError: () => void;
}

export function useContestantVoting({
  contestantId,
  onVoteSuccess,
  onVoteError,
}: UseContestantVotingProps): UseContestantVotingReturn {
  const [isVoting, setIsVoting] = useState(false);
  const [voteStatus, setVoteStatus] = useState<VoteStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const submitVote = useCallback(async () => {
    if (isVoting) return;

    try {
      setIsVoting(true);
      setVoteStatus('loading');
      setError(null);

      // Simulate API call with potential failure
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate 10% failure rate for testing error boundaries
          if (Math.random() < 0.1) {
            reject(new Error(`Failed to submit vote for contestant ${contestantId}`));
          } else {
            resolve(null);
          }
        }, 1500);
      });

      setVoteStatus('success');
      onVoteSuccess?.(contestantId);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown voting error');
      setError(error.message);
      setVoteStatus('error');
      onVoteError?.(contestantId, error);
    } finally {
      setIsVoting(false);
    }
  }, [contestantId, isVoting, onVoteSuccess, onVoteError]);

  const resetError = useCallback(() => {
    setError(null);
    setVoteStatus('idle');
  }, []);

  return {
    isVoting,
    voteStatus,
    error,
    submitVote,
    resetError,
  };
}