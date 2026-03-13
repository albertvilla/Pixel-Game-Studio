import Phaser from "phaser";
import { BootScene } from "./scenes/BootScene";
import { MenuScene } from "./scenes/MenuScene";
import { PlayScene } from "./scenes/PlayScene";

let game: Phaser.Game | null = null;

export function PhaserGame() {
  if (game) return game;

  game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 480,
    parent: "game-root",
    backgroundColor: "#1d1d1d",
    scene: [BootScene, MenuScene, PlayScene]
  });

  return game;
}