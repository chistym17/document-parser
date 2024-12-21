'use client'

import { useState } from 'react';
import axios from 'axios';
import Hero from '@/components/Hero';
import FileUpload from '@/components/FileUpload';
import DocumentActions from '@/components/DocumentActions';
import ExtractedContent from '@/components/ExtractedContent';

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [extractedContent, setExtractedContent] = useState<string | null>(null);

  const handleFileProcessing = async (actionId: string) => {
    if (actionId === 'extract-text') {
      try {
        const formData = new FormData();
        if (!uploadedFile) return;
        
        formData.append('file', uploadedFile);
        
        const response = await axios.post('http://localhost:8000/api/extraction/upload-and-extract', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.data && response.data.status === 'success') {
          setExtractedContent(response.data.text);
        }
      } catch (error: any) {
        console.error('Error during extraction:', error);
        alert(error.response?.data?.detail || 'Error processing file');
      }
    }
  };

  const resetExtractedContent = () => {
    setExtractedContent(null);
  };

  return (
    <main className="min-h-screen">
      <section className="h-screen">
        <Hero />
      </section>
      {!uploadedFile ? (
        <section className="h-screen">
          <FileUpload onSuccess={(fileName) => setUploadedFile(fileName)} />
        </section>
      ) : extractedContent ? (
        <section className="h-screen">
          <ExtractedContent 
            content={extractedContent}
            fileName={uploadedFile.name}
            onBack={resetExtractedContent}
          />
        </section>
      ) : (
        <section className="h-screen">
          <DocumentActions 
            fileName={uploadedFile.name} 
            onProcessing={handleFileProcessing}
          />
        </section>
      )}
    </main>
  );
}
