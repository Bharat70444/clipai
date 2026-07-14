"use client";
import VideoPreview from "@/components/VideoPreview";
import { useState } from "react";
import Hero from "@/components/Hero";
import UploadBox from "@/components/UploadBox";

export default function Home() {
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="mx-auto flex max-w-5xl flex-col items-center px-6 py-16">
        <Hero />

        <UploadBox onVideoSelect={setSelectedVideo} />

        {selectedVideo && (
           <VideoPreview file={selectedVideo} />
)}
      </div>
    </main>
  );
}