import { useState } from 'react';
import { 
  FiFileText, 
  FiList, 
  FiImage, 
  FiLink, 
  FiTag,
  FiMessageSquare,
  FiKey,
  FiPieChart
} from 'react-icons/fi';

type Action = {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
};

const actions: Action[] = [

  {
    id: 'extract-text',
    icon: <FiList className="w-6 h-6" />,
    title: 'Extract Text',
    description: 'Extract plain text content from the document'
  },
  {
    id: 'extract-images',
    icon: <FiImage className="w-6 h-6" />,
    title: 'Extract Images',
    description: 'Extract all images from the document'
  },
  {
    id: 'extract-links',
    icon: <FiLink className="w-6 h-6" />,
    title: 'Extract Links',
    description: 'Get all links mentioned in the document'
  },

 
];

interface DocumentActionsProps {
  fileName: string;
  onProcessing: (actionId: string) => Promise<void>;
}

export default function DocumentActions({ fileName, onProcessing }: DocumentActionsProps) {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleActionClick = async (actionId: string) => {
    setSelectedAction(actionId);
    setLoading(true);
    try {
      await onProcessing(actionId);
    } catch (error) {
      console.error('Error processing document:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="h-full bg-gray-50 flex items-center">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-6">
            Choose an <span className="text-purple-600">Action</span>
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Select what you'd like to do with "{fileName}"
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {actions.map((action) => (
              <button
                key={action.id}
                onClick={() => handleActionClick(action.id)}
                disabled={loading}
                className={`p-8 rounded-xl border-2 transition-all duration-200 flex flex-col items-center text-center
                  ${selectedAction === action.id
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-600 hover:bg-purple-50'
                  }
                  ${loading && selectedAction !== action.id ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                <div className={`p-4 rounded-full mb-5 
                  ${selectedAction === action.id
                    ? 'bg-purple-100 text-purple-600'
                    : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {action.icon}
                </div>
                <h3 className="font-semibold text-xl mb-3">{action.title}</h3>
                <p className="text-base text-gray-500">{action.description}</p>
                
                {loading && selectedAction === action.id && (
                  <div className="mt-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 