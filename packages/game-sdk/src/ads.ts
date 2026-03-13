export type AdPlacement =
  | "main_menu_bottom"
  | "level_complete"
  | "unlock_screen";

export function getAdPlaceholderLabel(placement: AdPlacement): string {
  switch (placement) {
    case "main_menu_bottom":
      return "Ad Placeholder: Main Menu Bottom";
    case "level_complete":
      return "Ad Placeholder: Level Complete";
    case "unlock_screen":
      return "Ad Placeholder: Unlock Screen";
  }
}