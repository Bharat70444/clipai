type TrimmedVideoProps = {
  videoUrl: string;
};

export default function TrimmedVideo({
  videoUrl,
}: TrimmedVideoProps) {
  return (
    <div className="mt-8 w-full max-w-3xl rounded-2xl bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-2xl font-bold">
        🎬 Final Highlight
      </h2>

      <video
        controls
        src={videoUrl}
        className="w-full rounded-xl"
      />

      <a
        href={videoUrl}
        download="highlight.mp4"
        className="mt-4 inline-block rounded-xl bg-purple-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        Download Highlight
      </a>
    </div>
  );
}