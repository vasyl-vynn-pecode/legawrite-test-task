import { Contestant, VotingSession } from '@/types';

export const mockContestants: Contestant[] = [
  {
    id: '1',
    name: 'Sarah Martinez',
    description:
      'Amazing singer with a powerful voice that moves audiences to tears',
    imageUrl:
      'https://images.unsplash.com/photo-1517230878791-4d28214057c2?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    voteCount: 15420,
    isActive: true,
  },
  {
    id: '2',
    name: 'Dancing Thunder',
    description:
      'High-energy dance crew that brings the house down with every performance',
    imageUrl:
      'https://images.unsplash.com/photo-1547153760-18fc86324498?w=400&h=300&fit=crop',
    voteCount: 12890,
    isActive: true,
  },
  {
    id: '3',
    name: 'Magic Mike Chen',
    description:
      'Mind-bending magician who makes the impossible look effortless',
    imageUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face',
    voteCount: 18750,
    isActive: true,
  },
  {
    id: '4',
    name: 'The Harmony Sisters',
    description:
      'Beautiful harmonies that blend perfectly together in stunning performances',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1661284891959-ebbbb7282bd7?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    voteCount: 14220,
    isActive: true,
  },
  {
    id: '5',
    name: 'Alex the Comedian',
    description:
      'Stand-up comedian who keeps audiences laughing with hilarious observations',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop&crop=face',
    voteCount: 9850,
    isActive: true,
  },
  {
    id: '6',
    name: 'Acrobatic Dreams',
    description:
      'Breathtaking acrobatic performances that defy gravity and expectations',
    imageUrl:
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop',
    voteCount: 16500,
    isActive: true,
  },
];

export const mockVotingSession: VotingSession = {
  id: 'session-1',
  startTime: Date.now() - 10 * 60 * 1000, // Started 10 minutes ago
  endTime: Date.now() + 20 * 60 * 1000, // Ends in 20 minutes
  isActive: true,
  maxVotesPerUser: 3,
};
