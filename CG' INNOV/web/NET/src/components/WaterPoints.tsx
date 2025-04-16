import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Droplets, Trees as Tree } from 'lucide-react';

const WaterPoints = () => {
  // Example data - in a real app, this would come from an API
  const waterPoints = [
    {
      id: 1,
      position: [46.603354, 1.888334],
      name: "Point d'eau 1",
      distance: "2.5 km",
      vegetation: "Prairie naturelle",
    },
    {
      id: 2,
      position: [46.623354, 1.898334],
      name: "Point d'eau 2",
      distance: "3.8 km",
      vegetation: "Forêt mixte",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Points d'Eau à Proximité</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-[600px]">
            <MapContainer
              center={[46.603354, 1.888334]}
              zoom={13}
              className="h-full w-full"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {waterPoints.map((point) => (
                <Marker key={point.id} position={point.position}>
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-bold">{point.name}</h3>
                      <p>Distance: {point.distance}</p>
                      <p>Végétation: {point.vegetation}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        <div className="space-y-4">
          {waterPoints.map((point) => (
            <div key={point.id} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="font-bold text-lg mb-2">{point.name}</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Droplets className="w-5 h-5 text-blue-500 mr-2" />
                  <span>Distance: {point.distance}</span>
                </div>
                <div className="flex items-center">
                  <Tree className="w-5 h-5 text-green-500 mr-2" />
                  <span>Végétation: {point.vegetation}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WaterPoints;