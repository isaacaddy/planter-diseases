// app/components/PlantDetails.tsx
import React from 'react';
import { Leaf, Info, AlertTriangle, List } from 'lucide-react';

interface PlantDetailsProps {
  details: string | null;
}

const PlantDetails: React.FC<PlantDetailsProps> = ({ details }) => {
  if (!details) return null;

  const lines = details.split('\n');
  const pointsMap = new Map<number, string[]>();
  let plantName = '';
  let confidence = '';
  const otherDetails: string[] = [];

  lines.forEach(line => {
    if (line.startsWith('Plant name:')) {
      plantName = line.split(':')[1].trim();
    } else if (line.startsWith('Confidence:')) {
      confidence = line.split(':')[1].trim();
    } else {
      const match = line.match(/^(\d+)\s*points?\s*:\s*(.+)/i);
      if (match) {
        const points = parseInt(match[1]);
        const detail = match[2].trim();
        if (!pointsMap.has(points)) {
          pointsMap.set(points, []);
        }
        pointsMap.get(points)?.push(detail);
      } else if (line.trim() !== '') {
        otherDetails.push(line.trim());
      }
    }
  });

  const sortedPoints = Array.from(pointsMap.keys()).sort((a, b) => b - a);

  return (
    <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 bg-green-600">
        <h3 className="text-lg leading-6 font-medium text-white flex items-center">
          <Leaf className="mr-2" /> Plant Identification Results
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 flex items-center">
              <Info className="mr-2" /> Identified Plant
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="font-semibold">{plantName}</span>
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {confidence}
              </span>
            </dd>
          </div>
          {sortedPoints.map((points, index) => (
            <div key={points} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <AlertTriangle className="mr-2" /> {points} point{points !== 1 ? 's' : ''}
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <ul className="list-disc list-inside">
                  {pointsMap.get(points)?.map((detail, detailIndex) => (
                    <li key={detailIndex}>{detail}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
          {otherDetails.length > 0 && (
            <div className={`${sortedPoints.length % 2 === 0 ? 'bg-gray-50' : 'bg-white'} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <List className="mr-2" /> Additional Details
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <ul className="list-disc list-inside">
                  {otherDetails.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
};

export default PlantDetails;