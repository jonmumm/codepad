"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

export const FileDrop = () => {
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
      setImageURLs(imageUrls);
      // Do something with the files
    },
    [setImageURLs]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <div
        {...getRootProps()}
        className="border-dashed border-2 border-gray-300 p-4 m-4"
      >
        <FilePasteListener onFilePasted={handleFilePaste} />
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-gray-600">Drop the files here ...</p>
        ) : (
          <p className="text-gray-600">
            Drag 'n' drop some files here, or click to select files
          </p>
        )}
      </div>
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
    </div>
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
