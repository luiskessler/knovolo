"use client"

import { useState } from "react";
import { api } from "~/trpc/react";

interface UseMinioUploadOptions {
  onSuccess?: (url: string, key: string) => void;
  onError?: (error: Error) => void;
}

export const useS3Upload = (options?: UseMinioUploadOptions) => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<Error | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  
  const getPresignedUrlMutation = api.upload.getPresignedUrl.useMutation();
  
  const uploadToS3 = async (file: File) => {
    setIsUploading(true);
    setProgress(0);
    setError(null);
    
    try {
      const { presignedUrl, url, key } = await getPresignedUrlMutation.mutateAsync({
        fileName: file.name,
        fileType: file.type,
      });
      
      const xhr = new XMLHttpRequest();
      
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setProgress(percentComplete);
        }
      };
      
      const uploadPromise = new Promise<void>((resolve, reject) => {
        xhr.onload = function() {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve();
          } else {
            reject(new Error(`Upload failed with status: ${xhr.status}`));
          }
        };
        
        xhr.onerror = function() {
          reject(new Error("Network error occurred during upload"));
        };
      });
      
      xhr.open("PUT", presignedUrl);
      xhr.setRequestHeader("Content-Type", file.type);
      xhr.send(file);
      
      await uploadPromise;
      
      setUploadedUrl(url);
      options?.onSuccess?.(url, key);
      return { url, key };
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown upload error");
      setError(error);
      options?.onError?.(error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };
  
  return {
    uploadToS3,
    isUploading,
    progress,
    error,
    uploadedUrl,
  };
};