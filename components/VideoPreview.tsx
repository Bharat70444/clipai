"use client";

import { useEffect, useState } from "react";

type VideoPreviewProps = {
  file: File;
};

export default function VideoPreview({ file }: VideoPreviewProps) {
  const [videoURL, setVideoURL] = useState("");

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setVideoURL(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  return (
    <div className="mt-8 w-full max-w-3xl rounded-2xl bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-2xl font-semibold">
        Video Preview
      </h2>

      <video
        src={videoURL}
        controls
        className="w-full rounded-xl"
      />

      <div className="mt-4">
        <p className="font-medium">
          {file.name}
        </p>

        <p className="text-gray-500">
          {(file.size / (1024 * 1024)).toFixed(2)} MB
        </p>
      </div>
    </div>
  );
}