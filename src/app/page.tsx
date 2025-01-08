'use client'

import { useState } from 'react';
import Hero from '@/components/Hero';
import FileUpload from '@/components/FileUpload';
import DocumentActions from '@/components/DocumentActions';
import ExtractedContent from '@/components/ExtractedContent';
import { handleFileProcessing } from '@/utils/documentProcessing';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';
import ExtractedImages from '@/components/ExtractedImages';
import ExtractedLinks from '@/components/ExtractedLinks';

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [extractedContent, setExtractedContent] = useState<any>(null);
  const [contentType, setContentType] = useState<'text' | 'images' | 'links' | null>(null);

  const resetExtractedContent = () => {
    setExtractedContent(null);
    setContentType(null);
  };

  const handleProcessing = async (actionId: string) => {
    try {
      if (uploadedFile) {
        setContentType(actionId === 'extract-images' ? 'images' : 'text');
        await handleFileProcessing(actionId, uploadedFile, setExtractedContent);
      }
    } catch (error) {
      console.error('Error processing file:', error);
    }
  };

  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <section id="how-it-works">
        <HowItWorks />
      </section>
      {!uploadedFile ? (
        <section id="upload-section" className="py-24 bg-gray-50">
          <FileUpload onSuccess={(file) => setUploadedFile(file)} />
        </section>
      ) : extractedContent ? (
        <section className="min-h-screen">
          {typeof extractedContent === 'object' && 'type' in extractedContent && extractedContent.type === 'links' ? (
            <ExtractedLinks
              extractedText={extractedContent.text}
              onBack={resetExtractedContent}
            />
          ) : (
            <ExtractedContent
              content={extractedContent as string}
              fileName={uploadedFile?.name || ''}
              onBack={resetExtractedContent}
            />
          )}
        </section>
      ) : (
        <section className="min-h-screen">
          <DocumentActions
            fileName={uploadedFile.name}
            onProcessing={handleProcessing}
          />
        </section>
      )}
      <Footer />
    </main>
  );
}
