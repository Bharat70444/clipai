type AudioDownloadProps = {
  audioUrl: string;
};

export default function AudioDownload({
  audioUrl,
}: AudioDownloadProps) {
  return (
    <div className="mt-8 w-full max-w-3xl rounded-2xl bg-white p-6 shadow-lg">
      <h2 className="text-xl font-bold mb-4">
        🎵 Extracted Audio
      </h2>

    {audioUrl && (
  <audio controls className="w-full">
    <source src={audioUrl} type="audio/mpeg" />
    Your browser does not support the audio element.
  </audio>
)}

      <a
        href={audioUrl}
        download="audio.mp3"
        className="mt-4 inline-block rounded-xl bg-indigo-600 px-6 py-3 text-white hover:bg-green-700"
      >
        Download Audio
      </a>
    </div>
  );
}