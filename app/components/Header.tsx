// app/components/Header.tsx
import React from 'react';
import Link from 'next/link';
import { Camera, Layers } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Camera className="h-6 w-6 text-gray-700" />
          <span className="text-xl font-semibold text-gray-900">Nature</span>
        </Link>
        <nav className="flex space-x-4">
          <Link href="/identify" className="text-gray-600 hover:text-gray-900">Identify</Link>
          <Link href="/explore" className="text-gray-600 hover:text-gray-900">Explore</Link>
          <Link href="/collection" className="text-gray-600 hover:text-gray-900">My Collection</Link>
          <button className="text-gray-600 hover:text-gray-900">
            <Camera className="h-5 w-5" />
          </button>
          <button className="text-gray-600 hover:text-gray-900">
            <Layers className="h-5 w-5" />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;