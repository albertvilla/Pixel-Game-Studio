import { jsonResponse } from "../shared/response";

export async function getConfig(gameId: string) {
  return jsonResponse(200, {
    gameId,
    title: "Space Runner",
    adsEnabled: false
  });
}