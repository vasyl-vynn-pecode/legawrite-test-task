'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Trophy, Vote, Users } from 'lucide-react';
import { getTimeRemaining } from '@/utils';
import { AnimatedCounter, PulsingCounter } from '@/components/ui/AnimatedCounter';

interface VotingHeaderProps {
  isVotingActive: boolean;
  endTime: number;
  totalVotes: number;
  remainingVotes: number;
  maxVotes: number;
}

export function VotingHeader({
  isVotingActive,
  endTime,
  totalVotes,
  remainingVotes,
  maxVotes,
}: VotingHeaderProps) {
  const [timeRemaining, setTimeRemaining] = React.useState('');

  React.useEffect(() => {
    const updateTimer = () => {
      setTimeRemaining(getTimeRemaining(endTime));
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    
    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            America's Got Talent
          </h1>
          <p className="text-xl md:text-2xl mb-6 text-blue-100">
            Live Voting - Vote for Your Favorite Contestants!
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/30 border border-white/40 rounded-lg p-4 backdrop-blur-md shadow-lg"
            >
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-6 h-6 mr-2 text-white" />
                <span className="text-sm font-medium text-white">Time Left</span>
              </div>
              <div className={`text-2xl font-bold ${!isVotingActive ? 'text-red-200' : 'text-white'}`}>
                {isVotingActive ? timeRemaining : 'CLOSED'}
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/30 border border-white/40 rounded-lg p-4 backdrop-blur-md shadow-lg"
            >
              <div className="flex items-center justify-center mb-2">
                <Vote className="w-6 h-6 mr-2 text-white" />
                <span className="text-sm font-medium text-white">Your Votes</span>
              </div>
              <div className="text-2xl font-bold text-white">
                <AnimatedCounter 
                  value={remainingVotes} 
                  className="inline"
                  duration={800}
                />/{maxVotes}
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/30 border border-white/40 rounded-lg p-4 backdrop-blur-md shadow-lg"
            >
              <div className="flex items-center justify-center mb-2">
                <Trophy className="w-6 h-6 mr-2 text-yellow-300" />
                <span className="text-sm font-medium text-white">Total Votes</span>
              </div>
              <div className="text-2xl font-bold text-white">
                <PulsingCounter 
                  value={totalVotes}
                  className="text-2xl font-bold text-white"
                  pulseColor="rgb(250, 204, 21)" // yellow-400
                />
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/30 border border-white/40 rounded-lg p-4 backdrop-blur-md shadow-lg"
            >
              <div className="flex items-center justify-center mb-2">
                <Users className="w-6 h-6 mr-2 text-white" />
                <span className="text-sm font-medium text-white">Status</span>
              </div>
              <div className="text-2xl font-bold text-white">
                <motion.span 
                  className={`inline-block w-3 h-3 rounded-full mr-2 ${
                    isVotingActive ? 'bg-green-400' : 'bg-red-400'
                  }`}
                  animate={isVotingActive ? {
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1]
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: isVotingActive ? Infinity : 0,
                    ease: 'easeInOut'
                  }}
                />
                {isVotingActive ? 'LIVE' : 'ENDED'}
              </div>
            </motion.div>
          </div>

          {!isVotingActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 bg-red-500 bg-opacity-20 border border-red-400 rounded-lg p-4 max-w-md mx-auto"
            >
              <p className="text-red-100 font-medium">
                Voting has ended. Results will be announced shortly!
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}