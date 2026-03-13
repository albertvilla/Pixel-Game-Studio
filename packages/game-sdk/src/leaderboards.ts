import { apiRequest } from "./apiClient";
import type { LeaderboardEntry } from "./types";

export async function getTopScores(gameId: string) {
  return apiRequest<LeaderboardEntry[]>(`/leaderboard?gameId=${gameId}`);
}

export async function submitScore(
  gameId: string,
  playerId: string,
  playerName: string,
  score: number
) {
  return apiRequest<{ success: boolean }>(`/leaderboard`, {
    method: "POST",
    body: JSON.stringify({ gameId, playerId, playerName, score })
  });
}