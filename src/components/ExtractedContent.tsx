interface ExtractedContentProps {
  content: string;
  fileName: string;
  onBack: () => void;
}

export default function ExtractedContent({ content, fileName, onBack }: ExtractedContentProps) {
  return (
    <section className="h-full bg-gray-50 flex items-center">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">
              Extracted Content: <span className="text-purple-600">{fileName}</span>
            </h2>
            <button
              onClick={onBack}
              className="px-4 py-2 text-purple-600 border-2 border-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
            >
              Choose Another Action
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="h-3 w-3 bg-green-500 rounded-full"></span>
                <span className="text-sm text-gray-500">Extraction Complete</span>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(content)}
                className="text-sm text-purple-600 hover:text-purple-700"
              >
                Copy to Clipboard
              </button>
            </div>

            <div className="mt-4 p-4 bg-gray-50 rounded-lg max-h-[60vh] overflow-y-auto">
              <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800">
                {content}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 