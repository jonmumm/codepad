"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

export const FileDropCard = () => {
  const [imageURLs, setImageURLs] = useState<string[]>([]);

  const handleFilePaste = useCallback((files: File[]) => {
    console.log(files);
    // Process the pasted files and create image URLs if they are images
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    const imageUrls = imageFiles.map((file) => URL.createObjectURL(file));
    setImageURLs((prevImageURLs) => [...prevImageURLs, ...imageUrls]);
  }, []);

  const removeImage = (index: number) => {
    const newImageURLs = [...imageURLs];
    newImageURLs.splice(index, 1);
    setImageURLs(newImageURLs);
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      console.log({ acceptedFiles });
      const imageFiles = acceptedFiles.filter((file) =>
        file.type.startsWith("image/")
      );
      const imageUrls = imageFiles.map((file) => URL.createObjectURL(file));
      setImageURLs((prevImageURLs) => [...prevImageURLs, ...imageUrls]);
      // Do something with the files
    },
    [setImageURLs]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Card className="flex-1 flex flex-col" {...getRootProps()}>
      <FilePasteListener onFilePasted={handleFilePaste} />
      <CardHeader>
        <CardTitle>Context</CardTitle>
        <CardDescription>
          The AI will have access to images and files here.
        </CardDescription>
      </CardHeader>
      <div className="flex flex-wrap">
        {imageURLs.map((url, index) => (
          <div key={index} className="relative m-4">
            <img
              src={url}
              alt={`Image ${index}`}
              className="max-w-xs max-h-xs"
            />
            <button
              className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-full"
              onClick={() => removeImage(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <CardContent>
        <div
          className={`border-dashed border-2 border-gray-300 p-5 flex min-h-[15vh] items-center justify-center`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-gray-600">Drop the files here ...</p>
          ) : (
            <p className="text-gray-600">
              Drag &apos;n&apos; drop some files here, or click to select files
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

interface FilePasteListenerProps {
  onFilePasted: (pastedFiles: File[]) => void;
}

function FilePasteListener({ onFilePasted }: FilePasteListenerProps) {
  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      const clipboardData =
        event.clipboardData || (window as any).clipboardData; // Handle older browsers

      if (
        clipboardData &&
        clipboardData.files &&
        clipboardData.files.length > 0
      ) {
        // Handle the pasted files here
        const pastedFiles = Array.from(clipboardData.files) as File[];
        onFilePasted(pastedFiles);
      }
    };

    window.addEventListener("paste", handlePaste);

    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, [onFilePasted]);

  return null; // This component doesn't render anything
}
