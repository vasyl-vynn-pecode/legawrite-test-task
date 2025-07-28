export const VOTING_CONFIG = {
  MAX_VOTES_PER_USER: 3,
  POLL_INTERVAL: 3000, // 5 seconds
  VOTE_COOLDOWN: 1000, // 1 second between votes
  SESSION_DURATION: 30 * 60 * 1000, // 30 minutes
} as const;

export const STORAGE_KEYS = {
  VOTE_STATE: 'agt-vote-state',
  USER_ID: 'agt-user-id',
} as const;

export const API_ENDPOINTS = {
  CONTESTANTS: '/api/contestants',
  VOTE: '/api/vote',
  VOTING_SESSION: '/api/voting-session',
} as const;

export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
} as const;
