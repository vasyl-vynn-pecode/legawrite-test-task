'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Trophy, Users } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Contestant } from '@/types';
import { formatVoteCount, cn } from '@/utils';

interface ContestantCardProps {
  contestant: Contestant;
  onVote: (contestantId: string) => void;
  hasVoted: boolean;
  isVoting: boolean;
  canVote: boolean;
  remainingVotes: number;
}

export function ContestantCard({
  contestant,
  onVote,
  hasVoted,
  isVoting,
  canVote,
  remainingVotes,
}: ContestantCardProps) {
  const handleVote = () => {
    if (canVote && !hasVoted && !isVoting) {
      onVote(contestant.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card
        className={cn(
          'h-full flex flex-col overflow-hidden transition-all duration-300 bg-white',
          'hover:shadow-lg border-2',
          hasVoted
            ? 'border-green-500 bg-green-50'
            : 'border-gray-200 hover:border-blue-300',
          !contestant.isActive && 'opacity-60'
        )}
      >
        <div className="relative">
          <img
            src={contestant.imageUrl}
            alt={contestant.name}
            className="w-full h-48 sm:h-56 md:h-64 object-cover"
            onError={e => {
              const target = e.target as HTMLImageElement;
              target.src = `https://images.unsplash.com/photo-1516575080681-3a21b8c2b1f8?w=400&h=300&fit=crop&crop=face`;
            }}
          />
          {hasVoted && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-3 right-3 bg-green-500 rounded-full p-2"
            >
              <Heart className="w-5 h-5 text-white fill-white" />
            </motion.div>
          )}
          {!contestant.isActive && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                Voting Closed
              </span>
            </div>
          )}
        </div>

        <CardContent className="flex-1 p-4">
          <div className="space-y-3">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {contestant.name}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2">
                {contestant.description}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700">
                  {formatVoteCount(contestant.voteCount)} votes
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-blue-500" />
                <span className="text-xs text-gray-500">Live</span>
              </div>
            </div>

            {hasVoted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-green-100 border border-green-300 rounded-lg p-2"
              >
                <p className="text-green-700 text-sm font-medium flex items-center">
                  <Heart className="w-4 h-4 mr-1 fill-current" />
                  You voted for {contestant.name}!
                </p>
              </motion.div>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            variant="vote"
            size="lg"
            className="w-full"
            onClick={handleVote}
            disabled={!canVote || hasVoted || isVoting || !contestant.isActive}
            loading={isVoting}
          >
            {hasVoted
              ? 'Voted!'
              : !contestant.isActive
                ? 'Voting Closed'
                : !canVote
                  ? `No votes left`
                  : isVoting
                    ? 'Voting...'
                    : `Vote (${remainingVotes} left)`}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
