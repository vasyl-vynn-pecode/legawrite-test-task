'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ContestantCard } from './ContestantCard';
import { Contestant } from '@/types';

interface ContestantGridProps {
  contestants: Contestant[];
  onVote: (contestantId: string) => void;
  votedContestants: string[];
  votingStates: Record<string, boolean>;
  remainingVotes: number;
  isVotingActive: boolean;
}

export function ContestantGrid({
  contestants,
  onVote,
  votedContestants,
  votingStates,
  remainingVotes,
  isVotingActive,
}: ContestantGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const canVote = remainingVotes > 0 && isVotingActive;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {contestants.map((contestant) => (
          <motion.div
            key={contestant.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <ContestantCard
              contestant={contestant}
              onVote={onVote}
              hasVoted={votedContestants.includes(contestant.id)}
              isVoting={votingStates[contestant.id] || false}
              canVote={canVote}
              remainingVotes={remainingVotes}
            />
          </motion.div>
        ))}
      </motion.div>

      {contestants.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-gray-500 text-lg">
            No contestants available at the moment.
          </div>
          <div className="text-gray-400 text-sm mt-2">
            Please check back later when voting begins.
          </div>
        </motion.div>
      )}
    </div>
  );
}