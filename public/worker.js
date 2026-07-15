import { pipeline } from "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2";

let transcriber = null;

self.onmessage = async (event) => {
  if (event.data.type === "init") {
    self.postMessage({
      type: "status",
      message: "Loading Whisper model...",
    });

    if (!transcriber) {
      transcriber = await pipeline(
        "automatic-speech-recognition",
        "Xenova/whisper-small"
      );
    }

    self.postMessage({
      type: "ready",
    });
  }
};