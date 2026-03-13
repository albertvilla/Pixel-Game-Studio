import Phaser from "phaser";

export class PlayScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Rectangle;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super("PlayScene");
  }

  create() {
    this.player = this.add.rectangle(100, 240, 40, 40, 0x00ff00);
    this.cursors = this.input.keyboard!.createCursorKeys();

    this.add.text(20, 20, "Use arrow keys to move", {
      fontSize: "20px",
      color: "#ffffff"
    });
  }

  update() {
    const speed = 4;

    if (this.cursors.left?.isDown) this.player.x -= speed;
    if (this.cursors.right?.isDown) this.player.x += speed;
    if (this.cursors.up?.isDown) this.player.y -= speed;
    if (this.cursors.down?.isDown) this.player.y += speed;
  }
}