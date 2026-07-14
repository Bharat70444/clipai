"use client";

import { Upload } from "lucide-react";
import { useRef, useState } from "react";

type UploadBoxProps = {
  onVideoSelect: (file: File) => void;
};

export default function UploadBox({ onVideoSelect }: UploadBoxProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");

  const MAX_SIZE = 500 * 1024 * 1024; // 500 MB

  function validateFile(file: File) {
    if (!file.type.startsWith("video/")) {
      setError("Please upload a valid video file.");
      return;
    }

    if (file.size > MAX_SIZE) {
      setError("Maximum file size is 500 MB.");
      return;
    }

    setError("");
    onVideoSelect(file);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (file) validateFile(file);
  }

  function handleDrop(
    e: React.DragEvent<HTMLDivElement>
  ) {
    e.preventDefault();

    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (file) validateFile(file);
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={`mt-10 w-full max-w-2xl rounded-2xl border-2 border-dashed p-10 text-center shadow-lg transition-all duration-300 ${
        isDragging
          ? "border-blue-600 bg-blue-50"
          : "border-gray-300 bg-white"
      }`}
    >
      <div className="flex justify-center">
        <Upload size={60} className="text-blue-600" />
      </div>

      <h2 className="mt-4 text-2xl font-bold">
        Upload a Video
      </h2>

      <p className="mt-2 text-gray-600">
        Drag & Drop your video here
      </p>

      <p className="text-gray-500">
        or click below to browse
      </p>

      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        className="hidden"
        onChange={handleChange}
      />

      <button
        onClick={() => fileInputRef.current?.click()}
        className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
      >
        Choose Video
      </button>

      <p className="mt-5 text-sm text-gray-400">
        Supported: MP4 • MOV • AVI • MKV
      </p>

      {error && (
        <p className="mt-4 text-red-600 font-medium">
          {error}
        </p>
      )}
    </div>
  );
}