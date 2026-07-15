"use client";

import { useEffect, useState } from "react";

type Props = {
  file: File;
};

type Metadata = {
  duration: string;
  width: number;
  height: number;
};

export default function VideoInfo({ file }: Props) {
  const [metadata, setMetadata] = useState<Metadata | null>(null);

  useEffect(() => {
    const video = document.createElement("video");

    const url = URL.createObjectURL(file);

    video.src = url;

    video.onloadedmetadata = () => {
      const minutes = Math.floor(video.duration / 60);
      const seconds = Math.floor(video.duration % 60);

      setMetadata({
        duration: `${minutes}:${seconds.toString().padStart(2, "0")}`,
        width: video.videoWidth,
        height: video.videoHeight,
      });

      URL.revokeObjectURL(url);
    };
  }, [file]);

  return (
    <div className="mt-8 w-full max-w-3xl rounded-2xl bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-2xl font-bold text-indigo-700">
        📄 Video Information
      </h2>

      <div className="space-y-2 text-gray-700">
        <p>
          <strong>Name:</strong> {file.name}
        </p>

        <p>
          <strong>Size:</strong>{" "}
          {(file.size / 1024 / 1024).toFixed(2)} MB
        </p>

        <p>
          <strong>Type:</strong> {file.type}
        </p>

        {metadata && (
          <>
            <p>
              <strong>Duration:</strong>{" "}
              {metadata.duration}
            </p>

            <p>
              <strong>Resolution:</strong>{" "}
              {metadata.width} × {metadata.height}
            </p>
          </>
        )}
      </div>
    </div>
  );
}