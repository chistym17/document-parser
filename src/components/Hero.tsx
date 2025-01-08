import Image from 'next/image';

export default function Hero() {
  const scrollToUpload = () => {
    const uploadSection = document.querySelector('#upload-section');
    uploadSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHowItWorks = () => {
    const howItWorksSection = document.querySelector('#how-it-works');
    howItWorksSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-6 mt-5">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-purple-600">DocuMind</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl">
            Transform your documents into actionable insights. Upload any file and let our intelligent parser do the heavy lifting for you.
          </p>
          <div className="flex gap-4">
            <button 
              onClick={scrollToUpload}
              className="px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
            >
              Upload Document
            </button>
            <button 
              onClick={scrollToHowItWorks}
              className="px-8 py-4 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-semibold"
            >
              Learn More
            </button>
          </div>
          
          <div className="mt-16 relative w-full max-w-3xl">
            <div className="absolute -top-8 -right-8 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -top-8 -left-8 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            
            <div className="relative">
              <Image
                src="/undraw_my-personal-files_886p.png"
                alt="Document Processing Illustration"
                width={700}
                height={350}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 