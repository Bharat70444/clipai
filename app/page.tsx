"use client";

import { useState } from "react";

import Hero from "@/components/Hero";
import UploadBox from "@/components/UploadBox";
import VideoPreview from "@/components/VideoPreview";
import VideoInfo from "@/components/VideoInfo";
import AnalyzeButton from "@/components/AnalyzeButton";
import StatusCard from "@/components/StatusCard";
import ProgressBar from "@/components/ProgressBar";
import LoadingSpinner from "@/components/LoadingSpinner";
import AudioDownload from "@/components/AudioDownload";
import Transcript from "@/components/Transcript";

import { loadFFmpeg } from "@/lib/video";
import { extractAudio } from "@/lib/extractAudio";
import { transcribeAudio } from "@/lib/transcribe";
import { analyzeTranscript } from "@/lib/analyze";
import { trimVideo } from "@/lib/trimVideo";
import TrimmedVideo from "@/components/TrimmedVideo";

type Highlight = {
  start: number;
  end: number;
  reason: string;
};

export default function Home() {
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);

  const [status, setStatus] = useState("Ready");

  const [progress, setProgress] = useState(0);

  const [isProcessing, setIsProcessing] = useState(false);

  const [loadingMessage, setLoadingMessage] = useState("");

  const [audioUrl, setAudioUrl] = useState("");

  const [transcript, setTranscript] = useState("");

  const [highlight, setHighlight] = useState<Highlight | null>(null);
  const [trimmedVideoUrl, setTrimmedVideoUrl] = useState("");

  async function handleAnalyze() {
    if (!selectedVideo) return;

    try {
      setIsProcessing(true);

      setAudioUrl("");
      setTranscript("");
      setHighlight(null);

      setProgress(0);

      // Load FFmpeg
      setLoadingMessage("Loading FFmpeg...");
      setStatus("⚙️ Loading FFmpeg...");
      setProgress(10);

      await loadFFmpeg();

      // Extract Audio
      setLoadingMessage("Extracting Audio...");
      setStatus("🎵 Extracting Audio...");
      setProgress(35);

      const audioBlob = await extractAudio(selectedVideo);

      const audioObjectUrl = URL.createObjectURL(audioBlob);

      setAudioUrl(audioObjectUrl);

      // Speech To Text
      setLoadingMessage("Generating Transcript...");
      setStatus("📝 Transcribing Audio...");
      setProgress(60);

      const transcriptionResult = await transcribeAudio(audioBlob);

      console.log("Transcription:", transcriptionResult);

      if (!transcriptionResult.success) {
        throw new Error("Transcription failed");
      }

      setTranscript(transcriptionResult.transcript);

      // AI Analysis
      setLoadingMessage("Finding Best Highlight...");
      setStatus("🤖 AI is analyzing transcript...");
      setProgress(85);

      const analysisResult = await analyzeTranscript(
        transcriptionResult.transcript
      );

      console.log("Highlight:", analysisResult);

      if (analysisResult.success) {
    const highlight = analysisResult.result;

    setHighlight(highlight);

    setLoadingMessage("Trimming Video...");
    setStatus("✂️ Creating Highlight...");
    setProgress(95);

    const trimmedUrl = await trimVideo(
      selectedVideo,
      highlight.start,
      highlight.end
    );

    setTrimmedVideoUrl(trimmedUrl);

    setLoadingMessage("");
    setStatus("🎉 Highlight Ready!");
    setProgress(100);
    }} catch (error) {
  console.error(error);

  setStatus("❌ Error while processing video");
  setLoadingMessage("");
} finally {
  setIsProcessing(false);
}
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 text-indigo-700">
      <div className="mx-auto flex max-w-5xl flex-col items-center px-6 py-16">
        <Hero />

        <UploadBox onVideoSelect={setSelectedVideo} />

        {selectedVideo && (
          <>
            <VideoPreview file={selectedVideo} />

            <VideoInfo file={selectedVideo} />

            <AnalyzeButton
              onAnalyze={handleAnalyze}
              disabled={isProcessing}
            />

            <StatusCard status={status} />

            <ProgressBar progress={progress} />

            {isProcessing && (
              <LoadingSpinner message={loadingMessage} />
            )}

            {audioUrl && (
              <AudioDownload audioUrl={audioUrl} />
            )}

            {transcript && (
              <Transcript text={transcript} />
            )}

            {highlight && (
              <div className="mt-8 w-full max-w-3xl rounded-2xl bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-2xl font-bold">
                  🎯 AI Highlight
                </h2>

                <div className="space-y-3 text-gray-800">
                  <p>
                    <strong >Start:</strong> {highlight.start} sec
                  </p>

                  <p>
                    <strong>End:</strong> {highlight.end} sec
                  </p>

                  <p>
                    <strong>Reason:</strong> {highlight.reason}
                  </p>
                </div>
              </div>
            )}
            {trimmedVideoUrl && (
  <TrimmedVideo videoUrl={trimmedVideoUrl} />
)}
          </>
        )}
      </div>

      
    </main>
  );
  
}