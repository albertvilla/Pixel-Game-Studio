import { useMemo } from "react";
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

      <Panel title="Game Studio Demo">
        <p>This is the first starter game app.</p>
        <p>Next we will add movement, coins, and scoring.</p>
        <Button onClick={() => alert("Great job building your first game shell!")}>
          Test Button
        </Button>
        <AdPlaceholder label={getAdPlaceholderLabel("main_menu_bottom")} />
      </Panel>

      <div id="game-root" className="game-root" />
    </div>
  );
}