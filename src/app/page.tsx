'use client'

import { useState } from 'react';
import Hero from '@/components/Hero';
import FileUpload from '@/components/FileUpload';
import DocumentActions from '@/components/DocumentActions';
import ExtractedContent from '@/components/ExtractedContent';
import { handleFileProcessing } from '@/utils/documentProcessing';

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [extractedContent, setExtractedContent] = useState<string | null>(null);

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
          <FileUpload onSuccess={(file) => setUploadedFile(file)} />
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
            onProcessing={(actionId) => handleFileProcessing(actionId, uploadedFile, setExtractedContent)}
          />
        </section>
      )}
    </main>
  );
}
