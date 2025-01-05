import { Search, Cpu, Lock } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Search className="w-12 h-12 text-blue-600" />,
      title: "Smart Document Analysis",
      description: "Advanced parsing capabilities for various document formats"
    },
    {
      icon: <Cpu className="w-12 h-12 text-blue-600" />,
      title: "AI-Powered Extraction",
      description: "Intelligent content extraction using cutting-edge AI technology"
    },
    {
      icon: <Lock className="w-12 h-12 text-blue-600" />,
      title: "Secure Processing",
      description: "Your documents are processed securely and privately"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Powerful Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex flex-col items-center text-center">
                {feature.icon}
                <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 