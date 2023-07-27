import { getStringAsync } from "expo-clipboard";

export function getClipBoardString() {
  return getStringAsync();
}
