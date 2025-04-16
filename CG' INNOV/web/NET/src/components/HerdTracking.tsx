import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin, Clock, ArrowRight } from 'lucide-react';

const HerdTracking = () => {
  // Example data - in a real app, this would come from GPS tracking
  const herdData = {
    currentPosition: [46.603354, 1.888334],
    distance: "4.2 km",
    lastUpdate: "Il y a 5 minutes",
    movement: "Nord-Est",
    speed: "2 km/h",
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Suivi du Troupeau</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-[600px]">
            <MapContainer
              center={herdData.currentPosition}
              zoom={13}
              className="h-full w-full"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={herdData.currentPosition}>
                <Popup>
                  Position actuelle du troupeau
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="font-bold text-lg mb-4">Informations en Temps Réel</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-red-500 mr-2" />
                  <span>Distance</span>
                </div>
                <span className="font-bold">{herdData.distance}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-blue-500 mr-2" />
                  <span>Dernière mise à jour</span>
                </div>
                <span className="font-bold">{herdData.lastUpdate}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ArrowRight className="w-5 h-5 text-green-500 mr-2" />
                  <span>Direction</span>
                </div>
                <span className="font-bold">{herdData.movement}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ArrowRight className="w-5 h-5 text-purple-500 mr-2" />
                  <span>Vitesse</span>
                </div>
                <span className="font-bold">{herdData.speed}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="font-bold text-lg mb-2">Historique des Déplacements</h3>
            <div className="space-y-2">
              <div className="text-sm text-gray-600">
                <p>• 14:00 - Pâturage Nord</p>
                <p>• 12:30 - Point d'eau Est</p>
                <p>• 10:00 - Prairie Centrale</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HerdTracking;