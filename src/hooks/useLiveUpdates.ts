'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Contestant } from '@/types';
import { VOTING_CONFIG } from '@/lib/constants';

interface UseLiveUpdatesProps {
  initialContestants: Contestant[];
  isActive?: boolean;
}

interface UseLiveUpdatesReturn {
  contestants: Contestant[];
  isPolling: boolean;
  startPolling: () => void;
  stopPolling: () => void;
  updateContestantVotes: (contestantId: string, increment: number) => void;
}

export function useLiveUpdates({
  initialContestants,
  isActive = true,
}: UseLiveUpdatesProps): UseLiveUpdatesReturn {
  const [contestants, setContestants] = useState<Contestant[]>(initialContestants);
  const [isPolling, setIsPolling] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isActiveRef = useRef(isActive);

  // Update ref when isActive changes
  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  // Update contestants when initialContestants change
  useEffect(() => {
    setContestants(initialContestants);
  }, [initialContestants]);

  const simulateVoteUpdates = useCallback(() => {
    if (!isActiveRef.current) return;

    setContestants(prevContestants =>
      prevContestants.map(contestant => ({
        ...contestant,
        voteCount: contestant.voteCount + Math.floor(Math.random() * 3),
      }))
    );
  }, []);

  const startPolling = useCallback(() => {
    if (intervalRef.current || !isActive) return;

    setIsPolling(true);
    intervalRef.current = setInterval(
      simulateVoteUpdates,
      VOTING_CONFIG.POLL_INTERVAL
    );
  }, [simulateVoteUpdates, isActive]);

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsPolling(false);
    }
  }, []);

  const updateContestantVotes = useCallback((contestantId: string, increment: number) => {
    setContestants(prevContestants =>
      prevContestants.map(contestant =>
        contestant.id === contestantId
          ? { ...contestant, voteCount: contestant.voteCount + increment }
          : contestant
      )
    );
  }, []);

  // Auto-start polling when component mounts if active
  useEffect(() => {
    if (isActive) {
      startPolling();
    } else {
      stopPolling();
    }

    return () => {
      stopPolling();
    };
  }, [isActive, startPolling, stopPolling]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    contestants,
    isPolling,
    startPolling,
    stopPolling,
    updateContestantVotes,
  };
}