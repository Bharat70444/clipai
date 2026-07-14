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

import { loadFFmpeg } from "@/lib/video";
import { extractAudio } from "@/lib/extractAudio";
export default function Home() {
  // ==========================
  // State Variables
  // ==========================

  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);

  const [status, setStatus] = useState("Ready");

  const [progress, setProgress] = useState(0);

  const [isProcessing, setIsProcessing] = useState(false);

  const [loadingMessage, setLoadingMessage] = useState("");

  // ==========================
  // Analyze Workflow
  // ==========================

  async function handleAnalyze() {
    if (!selectedVideo) return;

    try {
      setIsProcessing(true);

      setProgress(0);

      // Step 1 - Load FFmpeg
      setLoadingMessage("Loading FFmpeg...");
      setStatus("⚙️ Loading FFmpeg...");
      setProgress(10);

      await loadFFmpeg();

      // Step 2 - Extract Audio (Coming Next)
      setLoadingMessage("Extracting Audio...");
      setStatus("🎵 Extracting Audio...");
      setProgress(30);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Step 3 - Whisper
      setLoadingMessage("Running Whisper AI...");
      setStatus("📝 Transcribing Speech...");
      setProgress(55);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Step 4 - Groq
      setLoadingMessage("Analyzing Transcript...");
      setStatus("🤖 Finding Best Clip...");
      setProgress(80);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Step 5 - Final
      setLoadingMessage("Finalizing...");
      setStatus("✂️ Preparing Final Video...");
      setProgress(95);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setLoadingMessage("");
      setStatus("✅ Analysis Complete");
      setProgress(100);
    } catch (error) {
      console.error(error);

      setStatus("❌ Failed to load FFmpeg");
      setLoadingMessage("");
    } finally {
      setIsProcessing(false);
    }
  }

  // ==========================
  // UI
  // ==========================

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="mx-auto flex max-w-5xl flex-col items-center px-6 py-16">

        {/* Hero */}
        <Hero />

        {/* Upload */}
        <UploadBox onVideoSelect={setSelectedVideo} />

        {/* Everything below appears after selecting a video */}
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
          </>
        )}
      </div>
    </main>
  );
}