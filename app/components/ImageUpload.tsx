// app/components/ImageUpload.tsx
import React, { useState, useRef } from 'react';
import { Camera, Upload, Video } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mobileCameraInputRef = useRef<HTMLInputElement>(null);
  const webcamRef = useRef<HTMLVideoElement>(null);
  const [isWebcamActive, setIsWebcamActive] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      onImageUpload(file);
    }
  };

  const handleMobileCameraAccess = () => {
    mobileCameraInputRef.current?.click();
  };

  const handleWebcamAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (webcamRef.current) {
        webcamRef.current.srcObject = stream;
        setIsWebcamActive(true);
      }
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
  };

  const captureWebcamImage = () => {
    if (webcamRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = webcamRef.current.videoWidth;
      canvas.height = webcamRef.current.videoHeight;
      canvas.getContext('2d')?.drawImage(webcamRef.current, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'webcam-capture.jpg', { type: 'image/jpeg' });
          setPreviewUrl(URL.createObjectURL(file));
          onImageUpload(file);
        }
      }, 'image/jpeg');
      setIsWebcamActive(false);
    }
  };

  return (
    <div className="mt-8">
      {previewUrl ? (
        <img src={previewUrl} alt="Uploaded plant" className="w-full max-w-md mx-auto rounded-lg shadow-lg" />
      ) : isWebcamActive ? (
        <div className="relative w-full max-w-md mx-auto">
          <video ref={webcamRef} autoPlay className="w-full rounded-lg shadow-lg" />
          <button
            onClick={captureWebcamImage}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Capture
          </button>
        </div>
      ) : (
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <div className="flex justify-center space-x-4">
            <label htmlFor="file-upload" className="cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <Upload className="mr-2 h-5 w-5" />
              Upload a photo
            </label>
            <button
              onClick={handleMobileCameraAccess}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <Camera className="mr-2 h-5 w-5" />
              Take a photo (Mobile)
            </button>
            <button
              onClick={handleWebcamAccess}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Video className="mr-2 h-5 w-5" />
              Use Webcam
            </button>
          </div>
          <input
            ref={fileInputRef}
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <input
            ref={mobileCameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;