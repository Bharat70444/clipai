"use client";

type AnalyzeButtonProps = {
  onAnalyze: () => void;
  disabled: boolean;
};

export default function AnalyzeButton({
  onAnalyze,
  disabled,
}: AnalyzeButtonProps) {
  return (
    <button
      onClick={onAnalyze}
      disabled={disabled}
      className="mt-8 rounded-xl bg-green-600 px-8 py-3 text-white font-semibold transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
    >
      Analyze Video
    </button>
  );
}