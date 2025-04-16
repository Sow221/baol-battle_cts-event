import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Sun, Cloud, Droplets, Wind } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

const WeatherDashboard = () => {
  // Example data - in a real app, this would come from an API
  const weatherData = {
    temperature: 22,
    humidity: 65,
    rainChance: 30,
    windSpeed: 12,
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Tableau de Bord Météo</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-[400px]">
            <MapContainer
              center={[46.603354, 1.888334]}
              zoom={6}
              className="h-full w-full"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[46.603354, 1.888334]}>
                <Popup>
                  Votre position
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <Sun className="w-8 h-8 text-yellow-500" />
              <span className="text-2xl font-bold">{weatherData.temperature}°C</span>
            </div>
            <p className="mt-2 text-gray-600">Température</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <Droplets className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold">{weatherData.humidity}%</span>
            </div>
            <p className="mt-2 text-gray-600">Humidité</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <Cloud className="w-8 h-8 text-gray-500" />
              <span className="text-2xl font-bold">{weatherData.rainChance}%</span>
            </div>
            <p className="mt-2 text-gray-600">Risque de Pluie</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <Wind className="w-8 h-8 text-teal-500" />
              <span className="text-2xl font-bold">{weatherData.windSpeed} km/h</span>
            </div>
            <p className="mt-2 text-gray-600">Vitesse du Vent</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;