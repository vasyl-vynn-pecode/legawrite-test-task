export interface Contestant {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  voteCount: number;
  isActive: boolean;
}

export interface Vote {
  contestantId: string;
  timestamp: number;
  userId: string;
}

export interface VotingSession {
  id: string;
  startTime: number;
  endTime: number;
  isActive: boolean;
  maxVotesPerUser: number;
}

export interface VoteState {
  votedContestants: string[];
  remainingVotes: number;
  lastVoteTime: number;
}

export type VoteStatus = 'idle' | 'loading' | 'success' | 'error';

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}