import { jsonResponse } from "../shared/response";

export async function getSave(gameId: string, playerId: string) {
  return jsonResponse(200, {
    gameId,
    playerId,
    level: 1,
    coins: 0,
    upgrades: {}
  });
}

export async function updateSave(body: any) {
  return jsonResponse(200, {
    success: true,
    saved: body
  });
}