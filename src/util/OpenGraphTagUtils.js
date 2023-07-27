import { OpenGraphParser } from "react-native-opengraph-kit";

export async function getOpenGraphData(url) {
  const result = await OpenGraphParser.extractMeta(url);

  return result[0] || null;
}
