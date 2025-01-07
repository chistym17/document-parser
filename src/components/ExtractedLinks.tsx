import { ArrowLeft, ExternalLink, AlertCircle } from 'lucide-react';
import { useEffect } from 'react';
import { useState } from 'react';

interface Link {
  url: string;
  is_valid: boolean;
  context: string;
}

interface LinkExtractionResult {
  total_links_found: number;
  valid_links_count: number;
  invalid_links_count: number;
  valid_links: Link[];
  invalid_links: Link[];
}

interface ExtractedLinksProps {
  extractedText: string;
  onBack: () => void;
}

export default function ExtractedLinks({ extractedText, onBack }: ExtractedLinksProps) {
  const [linkResults, setLinkResults] = useState<LinkExtractionResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    extractLinks();
  }, [extractedText]);

  const extractLinks = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/extraction/extract-links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: extractedText }),
      });

      if (!response.ok) throw new Error('Failed to extract links');

      const data = await response.json();
      setLinkResults(data);
    } catch (err) {
      setError('Failed to extract links from text');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

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
          Extracted Links
        </h2>
      </div>

      {error ? (
        <div className="text-red-600 p-4 rounded-lg bg-red-50">
          {error}
        </div>
      ) : linkResults && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-lg font-semibold">Total Links</p>
              <p className="text-3xl font-bold text-blue-600">{linkResults.total_links_found}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-lg font-semibold">Valid Links</p>
              <p className="text-3xl font-bold text-green-600">{linkResults.valid_links_count}</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-lg font-semibold">Invalid Links</p>
              <p className="text-3xl font-bold text-red-600">{linkResults.invalid_links_count}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Valid Links</h3>
            <div className="space-y-4">
              {linkResults.valid_links.map((link, index) => (
                <div key={index} className="border rounded-lg p-4 bg-white">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
                      >
                        {link.url}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <p className="text-sm text-gray-600 mt-2">{link.context}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {linkResults.invalid_links.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Invalid Links</h3>
              <div className="space-y-4">
                {linkResults.invalid_links.map((link, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-red-50">
                    <div className="flex items-start gap-4">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-red-600">{link.url}</p>
                        <p className="text-sm text-gray-600 mt-2">{link.context}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 