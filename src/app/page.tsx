'use client';

import React from 'react';
import { VotingHeader } from '@/components/voting/VotingHeader';
import { ContestantGrid } from '@/components/voting/ContestantGrid';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import DataFetchErrorBoundary from '@/components/layout/DataFetchErrorBoundary';
import VotingErrorBoundary from '@/components/layout/VotingErrorBoundary';
import { mockContestants, mockVotingSession } from '@/lib/mockData';
import { useVoteLimit } from '@/hooks/useVoteLimit';
import { useLiveUpdates } from '@/hooks/useLiveUpdates';
import { VOTING_CONFIG } from '@/lib/constants';

export default function VotingPage() {
  const [votingSession, setVotingSession] = React.useState(mockVotingSession);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [votingStates, setVotingStates] = React.useState<
    Record<string, boolean>
  >({});
  const [votingStopped, setVotingStopped] = React.useState(false);

  // Use custom hooks for isolated state management
  const { voteState, canVote, hasVotedFor, recordVote } = useVoteLimit();
  const isVotingActive =
    !votingStopped &&
    votingSession.isActive &&
    Date.now() < votingSession.endTime;
  const { contestants, updateContestantVotes, stopPolling } = useLiveUpdates({
    initialContestants: mockContestants,
    isActive: isVotingActive,
  });

  // Load initial data (simulated API call) - wrapped in DataFetchErrorBoundary
  React.useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        // Simulate potential data fetch failure for testing error boundaries
        if (Math.random() < 0.05) {
          // 5% chance of failure
          throw new Error('Failed to fetch contestant data from server');
        }

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        setError(null);
      } catch (err) {
        const error =
          err instanceof Error
            ? err.message
            : 'Failed to load voting data. Please try again.';
        setError(error);
        throw err; // Re-throw to trigger error boundary
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleVote = async (contestantId: string) => {
    if (
      !canVote ||
      hasVotedFor(contestantId) ||
      votingStopped ||
      !isVotingActive
    ) {
      return;
    }

    // Set voting state for this contestant
    setVotingStates(prev => ({ ...prev, [contestantId]: true }));

    try {
      // Simulate potential vote submission failure for testing error boundaries
      if (Math.random() < 0.1) {
        // 10% chance of failure
        throw new Error(
          `Failed to submit vote for ${contestants.find(c => c.id === contestantId)?.name}`
        );
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Record the vote using custom hook
      recordVote(contestantId);

      // Update contestant vote count
      updateContestantVotes(contestantId, 1);
    } catch (err) {
      const error =
        err instanceof Error
          ? err.message
          : 'Failed to submit vote. Please try again.';
      setError(error);
      throw err; // Re-throw to trigger voting error boundary
    } finally {
      setVotingStates(prev => ({ ...prev, [contestantId]: false }));
    }
  };

  const handleRetry = () => {
    setError(null);
    window.location.reload();
  };

  const handleStopVoting = () => {
    // Stop all voting activities
    setVotingStopped(true);

    // Stop live updates polling
    stopPolling();

    // Update voting session to be inactive with current time as end time
    setVotingSession(prev => ({
      ...prev,
      isActive: false,
      endTime: Date.now(),
    }));
  };

  const totalVotes = contestants.reduce(
    (sum, contestant) => sum + contestant.voteCount,
    0
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading contestants..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <ErrorMessage
          title="Failed to Load Voting Data"
          message={error}
          onRetry={handleRetry}
          variant="card"
        />
      </div>
    );
  }

  return (
    <DataFetchErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <VotingHeader
          isVotingActive={isVotingActive}
          endTime={votingStopped ? Date.now() : votingSession.endTime}
          totalVotes={totalVotes}
          remainingVotes={voteState.remainingVotes}
          maxVotes={VOTING_CONFIG.MAX_VOTES_PER_USER}
          onStopVoting={handleStopVoting}
        />

        <main>
          <VotingErrorBoundary>
            <ContestantGrid
              contestants={contestants}
              onVote={handleVote}
              votedContestants={voteState.votedContestants}
              votingStates={votingStates}
              remainingVotes={voteState.remainingVotes}
              isVotingActive={isVotingActive}
            />
          </VotingErrorBoundary>
        </main>

        <footer className="bg-white border-t border-gray-200 py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-600">
              © 2025 America&apos;s Got Talent Live Voting System
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Vote responsibly. Each user can vote up to{' '}
              {VOTING_CONFIG.MAX_VOTES_PER_USER} times.
            </p>
          </div>
        </footer>
      </div>
    </DataFetchErrorBoundary>
  );
}
