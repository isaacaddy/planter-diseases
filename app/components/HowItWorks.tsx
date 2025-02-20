// app/components/HowItWorks.tsx
import React from 'react';
import { Upload, Leaf, Info } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <Upload className="h-8 w-8 text-lime-400" />,
      title: "Upload Image",
      description: "Take a photo or upload an existing image of a plant you want to identify."
    },
    {
      icon: <Leaf className="h-8 w-8 text-lime-400" />,
      title: "AI Analysis",
      description: "Our advanced AI analyzes the image to identify the plant species."
    },
    {
      icon: <Info className="h-8 w-8 text-lime-400" />,
      title: "Get Information",
      description: "Receive detailed information about the plant, including its name, scientific name, and characteristics."
    }
  ];

  return (
    <div className="bg-green-800 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white text-center mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-gray-900 rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-lime-400 rounded-full p-3">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;