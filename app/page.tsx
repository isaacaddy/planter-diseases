// app/page.tsx
'use client';

import React, { useState } from 'react';
import Header from './components/Header';
import ImageUpload from './components/ImageUpload';
import PlantDetails from './components/PlantDetails';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';

export default function Home() {
  const [plantDetails, setPlantDetails] = useState<string | null>(null);

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/identify', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to identify plant: ${errorText}`);
      }

      const data = await response.json();
      setPlantDetails(data.result);
    } catch (error) {
      console.error("Detailed error:", error);
      setPlantDetails("Error identifying plant. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">PLANT IDENTIFIER</h1>
          <p className="text-center text-gray-600 mb-8">Upload or take a photo of a plant, and we'll identify it for you!</p>
          <ImageUpload onImageUpload={handleImageUpload} />
          <PlantDetails details={plantDetails} />
        </div>
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}