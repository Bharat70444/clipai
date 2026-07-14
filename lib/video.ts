import { getFFmpeg } from "./ffmpeg";

export async function loadFFmpeg() {
  const ffmpeg = await getFFmpeg();

  return ffmpeg;
}