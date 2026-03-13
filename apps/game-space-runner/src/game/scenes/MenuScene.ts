import Phaser from "phaser";

export class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  create() {
    this.add.text(280, 180, "Space Runner", {
      fontSize: "32px",
      color: "#ffffff"
    });

    const startText = this.add.text(320, 260, "Click to Start", {
      fontSize: "24px",
      color: "#ffff00"
    });

    startText.setInteractive();
    startText.on("pointerdown", () => {
      this.scene.start("PlayScene");
    });
  }
}