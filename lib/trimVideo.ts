import { fetchFile } from "@ffmpeg/util";
import { getFFmpeg } from "./ffmpeg";

export async function trimVideo(
  video: File,
  start: number,
  end: number
) {
  const ffmpeg = await getFFmpeg();

  const inputName = "input.mp4";
  const outputName = "highlight.mp4";

  await ffmpeg.writeFile(inputName, await fetchFile(video));

  const duration = end - start;

  await ffmpeg.exec([
  "-ss",
  String(start),
  "-i",
  inputName,
  "-t",
  String(duration),
  "-c:v",
  "libx264",
  "-c:a",
  "aac",
  outputName,
]);

  const data = await ffmpeg.readFile(outputName);

const bytes = new Uint8Array(data as Uint8Array);

const blob = new Blob([bytes.buffer], {
  type: "video/mp4",
});

return URL.createObjectURL(blob);}