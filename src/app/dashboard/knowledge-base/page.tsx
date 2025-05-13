"use client";

import React, { useState } from "react";
import MediaUpload from "~/app/_components/common/mediaUpload";

export default function DashboardKnowledgebase() {
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleMediaUpload = (urls: string[]) => {
    setUploadedUrls(urls);
    console.log("Uploaded media URLs:", urls);
  };

  return (
    <main className="h-full flex-1 overflow-y-scroll p-6">
      <div className="mb-8 h-full rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-8 rounded-lg">
          <MediaUpload
            onMediaUpload={handleMediaUpload}
            label="Medien hochladen"
            setIsUploaded={setIsUploaded}
          />
        </div>
      </div>
    </main>
  );
}
