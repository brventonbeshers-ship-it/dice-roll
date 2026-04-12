export interface LeaderEntry {
  who: string;
  rolls: number;
}

export interface WalletState {
  address: string | null;
  connected: boolean;
}

export interface GameStats {
  totalRolls: number;
  userRolls: number;
  lastResult: number;
  leaderboard: LeaderEntry[];
}

// jsdoc: 1775828352205

// types: 1775828525473

// types: 1775871374500

// jsdoc: 1775871460186

// jsdoc: 1775920240804

// types: 1775920401482

// types: 1775966607449
