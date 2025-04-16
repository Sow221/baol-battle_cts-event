import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FileText, Book, Video, ChevronRight } from 'lucide-react';

const Library = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const series = {
    'serie-s': {
      name: 'Série S',
      classes: ['Seconde S', 'Première S', 'Terminale S'],
    },
    'serie-l': {
      name: 'Série L',
      classes: ['Seconde L', 'Première L', 'Terminale L'],
    },
  };

  const subjects = {
    's': ['Mathématiques', 'Physique-Chimie', 'SVT', 'Français', 'Anglais', 'Histoire-Géographie'],
    'l': ['Français', 'Anglais', 'Histoire-Géographie', 'Philosophie', 'Mathématiques', 'Économie'],
  };

  const resources = [
    {
      type: 'pdf',
      title: 'Cours de Mathématiques - Fonctions',
      url: '#',
      
      icon: FileText,
    },
    {
      type: 'pdf',
      title: 'Exercices Corrigés',
      url: '#',
      icon: Book,
    },
    {
      type: 'video',
      title: 'Vidéo Explicative',
      url: 'https://youtube.com/watch?v=example',
      icon: Video,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Bibliothèque Numérique</h1>

      <div className="flex flex-wrap gap-4 mb-8">
        {/* Breadcrumb navigation */}
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>Bibliothèque</span>
          {selectedSeries && (
            <>
              <ChevronRight className="h-4 w-4" />
              <span>{series[selectedSeries as keyof typeof series].name}</span>
            </>
          )}
          {selectedClass && (
            <>
              <ChevronRight className="h-4 w-4" />
              <span>{selectedClass}</span>
            </>
          )}
          {selectedSubject && (
            <>
              <ChevronRight className="h-4 w-4" />
              <span>{selectedSubject}</span>
            </>
          )}
        </div>
      </div>

      {!selectedSeries && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(series).map(([key, value]) => (
            <div
              key={key}
              className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => setSelectedSeries(key)}
            >
              <h2 className="text-2xl font-bold mb-4">{value.name}</h2>
              <ul className="space-y-2">
                {value.classes.map((className) => (
                  <li key={className} className="text-gray-600">• {className}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {selectedSeries && !selectedClass && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {series[selectedSeries as keyof typeof series].classes.map((className) => (
            <div
              key={className}
              className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => setSelectedClass(className)}
            >
              <h3 className="text-xl font-bold">{className}</h3>
            </div>
          ))}
        </div>
      )}

      {selectedClass && !selectedSubject && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subjects[selectedSeries.includes('s') ? 's' : 'l'].map((subject) => (
            <div
              key={subject}
              className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => setSelectedSubject(subject)}
            >
              <h3 className="text-xl font-bold">{subject}</h3>
            </div>
          ))}
        </div>
      )}

      {selectedSubject && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Ressources Disponibles</h3>
              <div className="space-y-4">
                {resources.map((resource, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      <resource.icon className="h-6 w-6 text-blue-600 mr-3" />
                      <span className="font-medium">{resource.title}</span>
                    </div>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {resource.type === 'pdf' ? 'Télécharger' : 'Regarder'}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Back button */}
      {(selectedSeries || selectedClass || selectedSubject) && (
        <button
          onClick={() => {
            if (selectedSubject) setSelectedSubject(null);
            else if (selectedClass) setSelectedClass(null);
            else if (selectedSeries) setSelectedSeries(null);
          }}
          className="mt-8 text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Retour
        </button>
      )}
    </div>
  );
};

export default Library;