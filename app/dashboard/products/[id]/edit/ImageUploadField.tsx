"use client";

import ImageUpload from "@/components/ImageUpload";

export default function ImageUploadField({
  onChange,
}: {
  onChange: (url: string) => void;
}) {
  return <ImageUpload onUpload={(url) => onChange(url)} />;
}
