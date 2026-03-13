import { apiRequest } from "./apiClient";
import type { SaveData } from "./types";

export async function loadSave(gameId: string, playerId: string) {
  return apiRequest<SaveData>(`/save?gameId=${gameId}&playerId=${playerId}`);
}

export async function updateSave(
  gameId: string,
  playerId: string,
  data: SaveData
) {
  return apiRequest<{ success: boolean }>(`/save`, {
    method: "POST",
    body: JSON.stringify({ gameId, playerId, data })
  });
}