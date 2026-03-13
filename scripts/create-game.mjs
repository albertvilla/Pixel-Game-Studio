import fs from "fs";
import path from "path";

const rawName = process.argv[2];

if (!rawName) {
  console.error("Please provide a game name.");
  console.error("Example: pnpm new-game dungeon-quest");
  process.exit(1);
}

const gameId = rawName
  .trim()
  .toLowerCase()
  .replace(/\s+/g, "-")
  .replace(/[^a-z0-9-]/g, "");

const appName = `game-${gameId}`;
const repoRoot = process.cwd();
const appDir = path.join(repoRoot, "apps", appName);

if (fs.existsSync(appDir)) {
  console.error(`Game already exists: ${appName}`);
  process.exit(1);
}

const title = gameId
  .split("-")
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ");

function writeFile(relativePath, content) {
  const fullPath = path.join(appDir, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, "utf8");
}

writeFile(
  "package.json",
  JSON.stringify(
    {
      name: appName,
      private: true,
      version: "1.0.0",
      type: "module",
      scripts: {
        dev: "vite",
        build: "vite build"
      },
      dependencies: {
        "@studio/game-sdk": "workspace:*",
        "@studio/ui": "workspace:*",
        phaser: "^3.80.1",
        react: "^19.0.0",
        "react-dom": "^19.0.0"
      },
      devDependencies: {
        "@types/react": "^19.0.0",
        "@types/react-dom": "^19.0.0",
        "@vitejs/plugin-react": "^5.0.0",
        typescript: "^5.7.0",
        vite: "^6.0.0"
      }
    },
    null,
    2
  )
);

writeFile(
  "tsconfig.json",
  `{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "baseUrl": "."
  },
  "include": ["src"]
}
`
);

writeFile(
  "vite.config.ts",
  `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()]
});
`
);

writeFile(
  "index.html",
  `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`
);

writeFile(
  "src/main.tsx",
  `import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`
);

writeFile(
  "src/App.tsx",
  `import { useMemo } from "react";
import { Panel, AdPlaceholder, Button } from "@studio/ui";
import { getAdPlaceholderLabel } from "@studio/game-sdk";
import { gameConfig } from "./config/gameConfig";
import { PhaserGame } from "./game/PhaserGame";

export default function App() {
  useMemo(() => {
    PhaserGame();
  }, []);

  return (
    <div className="app-shell">
      <h1>{gameConfig.title}</h1>

      <Panel title="New Game Starter">
        <p>This is the starter app for ${title}.</p>
        <p>Next step: make the first playable version.</p>
        <Button onClick={() => alert("Nice job starting a new game!")}>
          Test Button
        </Button>
        <AdPlaceholder label={getAdPlaceholderLabel("main_menu_bottom")} />
      </Panel>

      <div id="game-root" className="game-root" />
    </div>
  );
}
`
);

writeFile(
  "src/styles.css",
  `body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #d8ecff;
}

.app-shell {
  padding: 20px;
}

.game-root {
  margin-top: 16px;
  width: 800px;
  height: 480px;
  border: 3px solid black;
  background: #000;
}
`
);

writeFile(
  "src/config/gameConfig.ts",
  `export const gameConfig = {
  gameId: "${gameId}",
  title: "${title}"
};
`
);

writeFile(
  "src/game/PhaserGame.ts",
  `import Phaser from "phaser";
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
`
);

writeFile(
  "src/game/scenes/BootScene.ts",
  `import Phaser from "phaser";

export class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  create() {
    this.scene.start("MenuScene");
  }
}
`
);

writeFile(
  "src/game/scenes/MenuScene.ts",
  `import Phaser from "phaser";

export class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  create() {
    this.add.text(260, 180, "${title}", {
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
`
);

writeFile(
  "src/game/scenes/PlayScene.ts",
  `import Phaser from "phaser";

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
`
);

writeFile(
  "README.md",
  `# ${title}

Game ID: \`${gameId}\`

## Goal
Replace this starter with the first playable version.

## Suggested Phase 1
- Move player
- Add collectible items
- Add score
- Add win or timer

## Run
From repo root:

\`\`\`bash
pnpm --filter ${appName} dev
\`\`\`
`
);

console.log(`Created new game: apps/${appName}`);
console.log(`Next steps:`);
console.log(`1. pnpm install`);
console.log(`2. pnpm --filter ${appName} dev`);