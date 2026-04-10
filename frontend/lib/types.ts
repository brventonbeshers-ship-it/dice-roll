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
