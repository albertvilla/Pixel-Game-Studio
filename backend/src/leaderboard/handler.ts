import { jsonResponse } from "../shared/response";

export async function getLeaderboard(gameId: string) {
  return jsonResponse(200, [
    { playerId: "1", playerName: "Aiden", score: 1200 },
    { playerId: "2", playerName: "Sam", score: 900 }
  ]);
}

export async function submitLeaderboardScore(body: any) {
  return jsonResponse(200, {
    success: true,
    submitted: body
  });
}