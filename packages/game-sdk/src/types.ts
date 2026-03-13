export type SaveData = {
  level: number;
  coins: number;
  upgrades: Record<string, number>;
};

export type LeaderboardEntry = {
  playerId: string;
  playerName: string;
  score: number;
};

export type GameConfig = {
  gameId: string;
  title: string;
  adsEnabled: boolean;
};