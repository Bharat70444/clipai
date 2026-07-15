export async function transcribeAudio(audioBlob: Blob) {
  const formData = new FormData();

  formData.append("file", audioBlob, "audio.mp3");

  const response = await fetch("/api/transcribe", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to transcribe audio");
  }

  return response.json();
}