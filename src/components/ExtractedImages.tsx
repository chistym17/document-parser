import { useState } from 'react';
import { ArrowLeft, Download, Trash2 } from 'lucide-react';

interface ImageInfo {
  image_id: string;
  page_number: number;
  image_format: string;
  size_bytes: number;
}

interface ExtractedImagesProps {
  images: ImageInfo[];
  fileName: string;
  onBack: () => void;
}

export default function ExtractedImages({ images, fileName, onBack }: ExtractedImagesProps) {
  const [deletingImages, setDeletingImages] = useState<Set<string>>(new Set());

  const handleDownload = async (imageId: string, format: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/extraction/get-image/${imageId}`);
      if (!response.ok) throw new Error('Failed to download image');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `image-${imageId}.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  const handleDelete = async (imageId: string) => {
    try {
      setDeletingImages(prev => new Set(prev).add(imageId));
      const response = await fetch(`http://localhost:8000/api/extraction/delete-image/${imageId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete image');
      
      setDeletingImages(prev => {
        const newSet = new Set(prev);
        newSet.delete(imageId);
        return newSet;
      });
    } catch (error) {
      console.error('Error deleting image:', error);
      setDeletingImages(prev => {
        const newSet = new Set(prev);
        newSet.delete(imageId);
        return newSet;
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <h2 className="text-2xl font-bold">
          Images from {fileName}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <div
            key={image.image_id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <img
              src={`http://localhost:8000/api/extraction/get-image/${image.image_id}`}
              alt={`Image from page ${image.page_number}`}
              className="w-full h-48 object-contain mb-4"
            />
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Page: {image.page_number} | Format: {image.image_format} | 
                Size: {(image.size_bytes / 1024).toFixed(2)} KB
              </p>
              <div className="flex justify-between">
                <button
                  onClick={() => handleDownload(image.image_id, image.image_format)}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button
                  onClick={() => handleDelete(image.image_id)}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700"
                  disabled={deletingImages.has(image.image_id)}
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No images were found in this document.
        </div>
      )}
    </div>
  );
} 