import React, { useState, useCallback, ChangeEvent, DragEvent } from "react";
import {
    XMarkIcon,
    DocumentIcon,
    PhotoIcon,
    VideoCameraIcon,
} from "@heroicons/react/24/outline";

interface FileDropzoneProps {
    onChange: (files: File[]) => void;
    value?: File[];
    error?: string;
    multiple?: boolean; // New prop to control single/multiple mode
    maxFiles?: number; // Optional prop to limit number of files in multiple mode
}

const FileDropzone: React.FC<FileDropzoneProps> = ({
    onChange,
    value = [],
    error,
    multiple = true, // Default to multiple files for backward compatibility
    maxFiles,
}) => {
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const handleDrag = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragging(true);
        } else if (e.type === "dragleave" || e.type === "drop") {
            setIsDragging(false);
        }
    }, []);

    const handleFiles = useCallback(
        (newFiles: File[]) => {
            if (!multiple) {
                // In single mode, replace existing file with the new one
                onChange(newFiles.slice(-1));
            } else {
                // In multiple mode, append new files up to maxFiles limit
                const updatedFiles = [...value, ...newFiles];
                if (maxFiles) {
                    onChange(updatedFiles.slice(0, maxFiles));
                } else {
                    onChange(updatedFiles);
                }
            }
        },
        [onChange, value, multiple, maxFiles]
    );

    const handleDrop = useCallback(
        (e: DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);

            const droppedFiles = Array.from(e.dataTransfer.files);
            if (droppedFiles?.length > 0) {
                handleFiles(droppedFiles);
            }
        },
        [handleFiles]
    );

    const handleFileInput = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const selectedFiles = e.target.files
                ? Array.from(e.target.files)
                : [];
            if (selectedFiles.length > 0) {
                handleFiles(selectedFiles);
            }
        },
        [handleFiles]
    );

    const removeFile = useCallback(
        (indexToRemove: number) => {
            onChange(value.filter((_, index) => index !== indexToRemove));
        },
        [onChange, value]
    );

    const getFileIcon = (file: File) => {
        if (file.type.startsWith("image/")) {
            return <PhotoIcon className="text-blue-500 size-6" />;
        } else if (file.type.startsWith("video/")) {
            return <VideoCameraIcon className="text-red-500 size-6" />;
        }
        return <DocumentIcon className="text-gray-500 size-6" />;
    };

    const getFilePreview = (file: File): string | null => {
        if (file.type.startsWith("image/")) {
            return URL.createObjectURL(file);
        }
        return null;
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    return (
        <div className="w-full">
            <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-lg p-6 transition-colors
          ${
              isDragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
          }
          ${error ? "border-red-500" : ""}`}
            >
                <input
                    type="file"
                    multiple={multiple}
                    onChange={handleFileInput}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*,application/pdf,video/*"
                />
                <div className="text-center">
                    <PhotoIcon className="mx-auto text-gray-400 size-12" />
                    <p className="mt-2 text-sm text-gray-600">
                        Drag and drop {multiple ? "files" : "a file"} here, or click to select
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                        Support for images, PDFs, and videos
                        {maxFiles && multiple && ` (Max ${maxFiles} files)`}
                    </p>
                </div>
            </div>

            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

            {value.length > 0 && (
                <ul className="mt-4 space-y-2">
                    {value.map((file, index) => (
                        <li
                            key={index}
                            className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                        >
                            <div className="flex items-center space-x-3">
                                {getFilePreview(file) ? (
                                    <img
                                        src={getFilePreview(file) || undefined}
                                        alt={file.name}
                                        className="object-cover rounded size-10"
                                    />
                                ) : (
                                    getFileIcon(file)
                                )}
                                <div>
                                    <p className="text-sm font-medium text-gray-900">
                                        {file.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {formatFileSize(file.size)}
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <XMarkIcon className="size-5" />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FileDropzone;
