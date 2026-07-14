"use client";

import { useRef } from "react";

type UploadBoxProps = {
  onVideoSelect: (file: File) => void;
};

export default function UploadBox({ onVideoSelect }: UploadBoxProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    onVideoSelect(file);
  };

  return (
    <div className="mt-10 w-full max-w-2xl rounded-2xl border-2 border-dashed border-gray-300 bg-white p-10 text-center shadow-lg hover:border-blue-500 transition">
      <div className="text-6xl">🎬</div>

      <h2 className="mt-4 text-2xl font-semibold">
        Upload Your Video
      </h2>

      <p className="mt-2 text-gray-600">
        Drag & Drop your video here
      </p>

      <p className="text-gray-500">
        or click the button below
      </p>

      <input
        type="file"
        accept="video/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      <button
        onClick={handleButtonClick}
        className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        Select Video
      </button>

      <p className="mt-6 text-sm text-gray-400">
        Supported: MP4 • MOV • AVI • MKV
      </p>
    </div>
  );
}