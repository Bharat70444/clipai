import { fetchFile } from "@ffmpeg/util";
import { getFFmpeg } from "./ffmpeg";

export async function extractAudio(video: File) {
  const ffmpeg = await getFFmpeg();

  // Write uploaded video into FFmpeg's virtual filesystem
  await ffmpeg.writeFile(
    "input.mp4",
    await fetchFile(video)
  );

  // Extract only the audio
  await ffmpeg.exec([
    "-i",
    "input.mp4",
    "-vn",
    "-acodec",
    "mp3",
    "audio.mp3",
  ]);

  // Read the generated audio
  const data = await ffmpeg.readFile("audio.mp3");

  return new Blob([data], {
    type: "audio/mpeg",
  });
}