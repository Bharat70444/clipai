import { fetchFile } from "@ffmpeg/util";
import { getFFmpeg } from "./ffmpeg";

export async function extractAudio(video: File): Promise<Blob> {
  const ffmpeg = await getFFmpeg();

  await ffmpeg.writeFile(
    "input.mp4",
    await fetchFile(video)
  );

  await ffmpeg.exec([
    "-i",
    "input.mp4",
    "-vn",
    "-acodec",
    "mp3",
    "audio.mp3",
  ]);

  const data = await ffmpeg.readFile("audio.mp3");

  // Convert FFmpeg output into a normal Uint8Array
  const bytes = new Uint8Array(data as Uint8Array);

  return new Blob([bytes.buffer], {
    type: "audio/mpeg",
  });
}