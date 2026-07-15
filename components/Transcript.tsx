type TranscriptProps = {
  text: string;
};

export default function Transcript({ text }: TranscriptProps) {
  return (
    <div className="mt-8 w-full max-w-4xl rounded-xl bg-slate-50 p-6 shadow">
      <h2 className="mb-4 text-xl font-bold">
        Transcript
      </h2>

      <p className="whitespace-pre-wrap text-slate-800">
        {text}
      </p>
    </div>
  );
}