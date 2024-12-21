'use client'

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud, FiFile, FiX } from 'react-icons/fi';

export default function FileUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const removeFile = (fileToRemove: File) => {
    setFiles(files.filter(file => file !== fileToRemove));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    }
  });

  const handleUpload = async () => {
    if (files.length === 0) return;

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000)); 
    setLoading(false);
    setFiles([]);
  };

  return (
    <section className="h-full bg-gray-50 flex items-center">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-6">
            Upload Your <span className="text-purple-600">Documents</span>
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Our intelligent parser will analyze your documents in seconds
          </p>
          
          <div
            {...getRootProps()}
            className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors
              ${isDragActive 
                ? 'border-purple-400 bg-purple-50' 
                : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50'
              }`}
          >
            <input {...getInputProps()} />
            <FiUploadCloud className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-gray-600">
              Drag & drop your files here, or click to select files
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Supported formats: PDF, DOC, DOCX, TXT
            </p>
          </div>

          {files.length > 0 && (
            <div className="mt-6 bg-white rounded-lg shadow-sm">
              <ul className="divide-y divide-gray-200">
                {files.map((file, index) => (
                  <li key={index} className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                      <FiFile className="h-6 w-6 text-purple-500" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-sm text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(file)}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <FiX className="h-5 w-5 text-gray-500" />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="p-4 border-t">
                <button
                  onClick={handleUpload}
                  disabled={loading}
                  className={`w-full py-3 px-4 rounded-lg text-white font-medium
                    ${loading 
                      ? 'bg-purple-400 cursor-not-allowed' 
                      : 'bg-purple-600 hover:bg-purple-700'
                    } transition-colors`}
                >
                  {loading ? 'Uploading...' : 'Process Documents'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
} 