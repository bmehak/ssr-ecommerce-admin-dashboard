"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

interface CloudinaryResult {
  info: {
    secure_url: string;
  };
}

export default function ImageUpload({ onUpload }: { onUpload: (url: string) => void }) {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div style={{ marginBottom: "20px" }}>
      <CldUploadWidget 
        uploadPreset="ml_default" 
        onSuccess={(result) => {
          const info = (result as CloudinaryResult).info;
          const url = info.secure_url;
          setImageUrl(url);
          onUpload(url);
        }}
      >
        {({ open }) => (
          <button 
            type="button" 
            onClick={() => open()}
            style={{ 
              padding: "10px 20px", 
              backgroundColor: "#111", 
              color: "white", 
              border: "none", 
              borderRadius: "5px", 
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            {imageUrl ? "Change Image" : "Upload Product Image"}
          </button>
        )}
      </CldUploadWidget>

      {imageUrl && (
        <div style={{ marginTop: "15px" }}>
          <p style={{ fontSize: "12px", color: "#666" }}>Preview:</p>
          <img 
            src={imageUrl} 
            alt="Product Preview" 
            style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "8px", border: "1px solid #ddd" }} 
          />
        </div>
      )}
    </div>
  );
}