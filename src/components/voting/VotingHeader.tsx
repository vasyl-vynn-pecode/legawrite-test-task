'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Trophy, Vote, Users, Square } from 'lucide-react';
import { getTimeRemaining } from '@/utils';
import {
  AnimatedCounter,
  PulsingCounter,
} from '@/components/ui/AnimatedCounter';

interface VotingHeaderProps {
  isVotingActive: boolean;
  endTime: number;
  totalVotes: number;
  remainingVotes: number;
  maxVotes: number;
  onStopVoting?: () => void;
}

export function VotingHeader({
  isVotingActive,
  endTime,
  totalVotes,
  remainingVotes,
  maxVotes,
  onStopVoting,
}: VotingHeaderProps) {
  const [timeRemaining, setTimeRemaining] = React.useState('');

  React.useEffect(() => {
    const updateTimer = () => {
      setTimeRemaining(getTimeRemaining(endTime));
    };

    updateTimer();

    // Only update timer if voting is active
    if (isVotingActive) {
      const interval = setInterval(updateTimer, 1000);
      return () => clearInterval(interval);
    }
  }, [endTime, isVotingActive]);

  return (
    <div className="relative min-h-[400px] overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900">
        {/* Floating orbs for depth */}
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-pink-500/30 to-violet-500/30 rounded-full blur-xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-32 right-16 w-24 h-24 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-20 h-20 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-full blur-xl"
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 4,
          }}
        />
      </div>

      {/* Glass overlay for glassmorphism effect */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />

      {/* Stop Voting Button - Top Right */}
      {isVotingActive && onStopVoting && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute top-4 right-4 z-20"
        >
          <motion.button
            onClick={onStopVoting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative"
          >
            {/* Glowing background */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 to-pink-500/30 rounded-xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Button content */}
            <div className="relative bg-white/15 backdrop-blur-xl border border-red-300/40 rounded-xl px-4 py-2 shadow-2xl hover:shadow-red-500/25 transition-all duration-300">
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <Square className="w-4 h-4 fill-red-400 text-red-400" />
                </motion.div>
                <span className="text-sm font-semibold text-white tracking-wide">
                  STOP VOTING
                </span>
              </div>
            </div>
          </motion.button>
        </motion.div>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center"
        >
          {/* Main Title with enhanced styling */}
          <motion.h1
            className="text-5xl md:text-7xl font-black mb-6 text-white drop-shadow-2xl"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            style={{
              textShadow:
                '0 0 20px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 0, 0, 0.6), 0 4px 8px rgba(0, 0, 0, 0.9)',
            }}
          >
            <span className="relative">
              America&apos;s Got Talent
              {/* Strong background shadow for contrast */}
              <div className="absolute inset-0 text-white blur-sm opacity-50 -z-10">
                America&apos;s Got Talent
              </div>
            </span>
          </motion.h1>

          {/* Subtitle with glass effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-10"
          >
            <div className="inline-block px-8 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl">
              <p className="text-xl md:text-2xl font-medium text-white">
                🗳️ Live Voting - Vote for Your Favorite Contestants!
              </p>
            </div>
          </motion.div>

          {/* Stats Cards with Liquid Glass Effect */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-8">
            {/* Time Left Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 },
              }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-white/15 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-2xl hover:shadow-blue-500/25 transition-all duration-300">
                <div className="flex items-center justify-center mb-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    <Clock className="w-7 h-7 mr-2 text-blue-300" />
                  </motion.div>
                  <span className="text-sm font-semibold text-white tracking-wide">
                    TIME LEFT
                  </span>
                </div>
                <div
                  className={`text-2xl md:text-3xl font-bold text-center ${
                    !isVotingActive ? 'text-red-300' : 'text-white'
                  }`}
                >
                  {isVotingActive ? timeRemaining : 'CLOSED'}
                </div>
              </div>
            </motion.div>

            {/* Your Votes Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              whileHover={{
                scale: 1.05,
                rotateY: -5,
                transition: { duration: 0.3 },
              }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-teal-500/30 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-white/15 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300">
                <div className="flex items-center justify-center mb-3">
                  <Vote className="w-7 h-7 mr-2 text-emerald-300" />
                  <span className="text-sm font-semibold text-white tracking-wide">
                    YOUR VOTES
                  </span>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white text-center">
                  <AnimatedCounter
                    value={remainingVotes}
                    className="inline text-emerald-300"
                    duration={800}
                  />
                  <span className="text-white/80">/{maxVotes}</span>
                </div>
              </div>
            </motion.div>

            {/* Total Votes Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 },
              }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/30 to-orange-500/30 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-white/15 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300">
                <div className="flex items-center justify-center mb-3">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <Trophy className="w-7 h-7 mr-2 text-yellow-300" />
                  </motion.div>
                  <span className="text-sm font-semibold text-white tracking-wide">
                    TOTAL VOTES
                  </span>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white text-center">
                  <PulsingCounter
                    value={totalVotes}
                    className="text-yellow-300"
                    pulseColor="rgb(250, 204, 21)"
                  />
                </div>
              </div>
            </motion.div>

            {/* Status Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              whileHover={{
                scale: 1.05,
                rotateY: -5,
                transition: { duration: 0.3 },
              }}
              className="group relative"
            >
              <div
                className={`absolute inset-0 ${
                  isVotingActive
                    ? 'bg-gradient-to-br from-green-500/30 to-emerald-500/30'
                    : 'bg-gradient-to-br from-red-500/30 to-pink-500/30'
                } rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300`}
              />
              <div className="relative bg-white/15 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-2xl hover:shadow-green-500/25 transition-all duration-300">
                <div className="flex items-center justify-center mb-3">
                  <Users className="w-7 h-7 mr-2 text-white" />
                  <span className="text-sm font-semibold text-white tracking-wide">
                    STATUS
                  </span>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white text-center flex items-center justify-center">
                  <motion.span
                    className={`inline-block w-4 h-4 rounded-full mr-3 ${
                      isVotingActive ? 'bg-green-400' : 'bg-red-400'
                    }`}
                    animate={
                      isVotingActive
                        ? {
                            scale: [1, 1.3, 1],
                            opacity: [1, 0.7, 1],
                            boxShadow: [
                              '0 0 0 0 rgba(34, 197, 94, 0.4)',
                              '0 0 0 10px rgba(34, 197, 94, 0)',
                              '0 0 0 0 rgba(34, 197, 94, 0)',
                            ],
                          }
                        : {}
                    }
                    transition={{
                      duration: 2,
                      repeat: isVotingActive ? Infinity : 0,
                      ease: 'easeInOut',
                    }}
                  />
                  <span
                    className={
                      isVotingActive ? 'text-green-300' : 'text-red-300'
                    }
                  >
                    {isVotingActive ? 'LIVE' : 'ENDED'}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Voting Ended Notice */}
          {!isVotingActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="relative max-w-lg mx-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 to-pink-500/30 rounded-2xl blur-xl" />
              <div className="relative bg-white/15 backdrop-blur-xl border border-red-300/40 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center justify-center mb-3">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🏆
                  </motion.div>
                  <span className="ml-2 text-lg font-semibold text-red-200">
                    VOTING COMPLETE
                  </span>
                </div>
                <p className="text-white font-medium text-center">
                  Results will be announced shortly!
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Decorative bottom wave - Full Width */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-0 left-0 right-0 w-full h-24 overflow-hidden"
      >
        <svg
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{ width: '100vw' }}
        >
          <motion.path
            d="M0,60 C150,100 350,0 600,60 C850,120 1050,20 1200,60 L1200,120 L0,120 Z"
            className="fill-white/10"
            animate={{
              d: [
                'M0,60 C150,100 350,0 600,60 C850,120 1050,20 1200,60 L1200,120 L0,120 Z',
                'M0,80 C150,40 350,120 600,40 C850,0 1050,100 1200,80 L1200,120 L0,120 Z',
                'M0,60 C150,100 350,0 600,60 C850,120 1050,20 1200,60 L1200,120 L0,120 Z',
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
