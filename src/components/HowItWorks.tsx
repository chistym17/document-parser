import { Upload, FileText, Download } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: <Upload className="w-10 h-10 text-blue-600" />,
      title: "Upload Document",
      description: "Start by uploading your document in any common format"
    },
    {
      icon: <FileText className="w-10 h-10 text-blue-600" />,
      title: "Process Content",
      description: "Our AI analyzes and extracts the relevant information"
    },
    {
      icon: <Download className="w-10 h-10 text-blue-600" />,
      title: "Get Results",
      description: "Download your processed content in your preferred format"
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center max-w-sm">
              <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="hidden md:block w-24 h-0.5 bg-blue-600 absolute right-[-4rem] top-10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 