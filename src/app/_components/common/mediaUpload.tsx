"use client";

import { useState } from "react";
import { useS3Upload } from "~/hooks/useS3Upload";

type MediaUploadProps = {
  onMediaUpload: (urls: string[]) => void;
  label?: string;
  showLabel?: boolean;
  accept?: string;
  setIsUploaded?: (arg0: boolean) => void;
};

const MediaUpload = ({
  onMediaUpload,
  label = "Dateien hochladen",
  showLabel = true,
  accept = "image/*,video/mp4",
  setIsUploaded,
}: MediaUploadProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{
    [key: string]: number;
  }>({});

  const { uploadToS3, isUploading } = useS3Upload({
    onSuccess: (url: string) => {
      setUploadedUrls((prev) => [...prev, url]);
    },
    onError: (error: Error) => {
      console.error("Upload error:", error);
    },
  });

  const handleFiles = (selectedFiles: FileList | File[]) => {
    const fileArray = Array.from(selectedFiles);
    setFiles((prev) => [...prev, ...fileArray]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
    setIsDragging(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    try {
      setUploadedUrls([]);
      if (setIsUploaded) setIsUploaded(false);

      const uploadPromises = files.map(async (file) => {
        try {
          const { url } = await uploadToS3(file);
          return url;
        } catch (error) {
          console.error(`Error uploading ${file.name}:`, error);
          return null;
        }
      });

      const results = await Promise.all(uploadPromises);
      const successfulUrls = results.filter(
        (url): url is string => url !== null,
      );

      onMediaUpload(successfulUrls);

      setFiles([]);

      if (setIsUploaded) setIsUploaded(true);
    } catch (error) {
      console.error("Upload process failed:", error);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      {showLabel && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        className={`flex w-full cursor-pointer items-center justify-center rounded border-2 border-dashed p-6 text-gray-500 transition ${
          isDragging ? "border-gray-400 bg-gray-100" : "border-gray-300"
        }`}
        onClick={() => document.getElementById("media-upload-input")?.click()}
      >
        <input
          id="media-upload-input"
          type="file"
          multiple
          accept={accept}
          className="hidden"
          onChange={handleFileSelect}
        />
        {isUploading
          ? "Wird hochgeladen..."
          : isDragging
            ? "Dateien hier ablegen"
            : "Dateien hierher ziehen oder klicken zum Durchsuchen"}
      </div>

      {files.length > 0 && (
        <div className="flex items-center text-sm text-gray-600">
          <ul className="flex flex-wrap items-center gap-1">
            {files.map((file, idx) => (
              <li key={idx + file.name}>
                {file.name}
                <span className={`${idx === files.length - 1 ? "hidden" : ""}`}>
                  ,
                </span>{" "}
              </li>
            ))}
          </ul>
        </div>
      )}

      {isUploading && Object.keys(uploadProgress).length > 0 && (
        <div className="mt-2 space-y-2">
          {Object.entries(uploadProgress).map(([fileName, progress]) => (
            <div key={fileName} className="flex flex-col">
              <div className="flex justify-between text-xs">
                <span>{fileName}</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1 w-full rounded bg-gray-200">
                <div
                  className="h-1 rounded bg-blue-600"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {files.length > 0 && (
        <button
          className="w-full rounded bg-black px-4 py-2 text-white hover:bg-gray-800 disabled:bg-gray-400"
          onClick={handleUpload}
          disabled={isUploading}
        >
          {isUploading ? "Hochladen..." : "Hochladen"}
        </button>
      )}

      {uploadedUrls.length > 0 && (
        <div className="mt-2 text-sm text-green-600">
          {uploadedUrls.length}{" "}
          {uploadedUrls.length === 1 ? "Datei" : "Dateien"} erfolgreich
          hochgeladen
        </div>
      )}
    </div>
  );
};

export default MediaUpload;
