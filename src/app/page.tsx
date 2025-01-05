'use client'

import { useState } from 'react';
import Hero from '@/components/Hero';
import FileUpload from '@/components/FileUpload';
import DocumentActions from '@/components/DocumentActions';
import ExtractedContent from '@/components/ExtractedContent';
import { handleFileProcessing } from '@/utils/documentProcessing';
import Features from '@/components/Features';
// import HowItWorks from '@/components/HowItWorks';
// import Footer from '@/components/Footer';

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [extractedContent, setExtractedContent] = useState<string | null>(null);

  const resetExtractedContent = () => {
    setExtractedContent(null);
  };

  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      {/* <HowItWorks /> */}
      {!uploadedFile ? (
        <section className="py-24 bg-gray-50">
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
      {/* <Footer /> */}
    </main>
  );
}
