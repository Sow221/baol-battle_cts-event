import React from 'react';
import { Target, Heart, BookOpen, Award, Users, Sparkles } from 'lucide-react';

const About = () => {
  const bureau = [
    {
      name: "Papa Mbaye BA",
      role: "Coordonnateur Général",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
      description: "Leadership et coordination des activités de 2EF"
    },
    {
      name: "Moussa Sow",
      role: "Chargé de Communication",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80",
      description: "Gestion de la communication et des relations publiques"
    },
    {
      name: "Aissatou Diallo",
      role: "Responsable Pédagogique",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
      description: "Supervision des programmes éducatifs"
    },
    {
      name: "Mamadou Kane",
      role: "Trésorier",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
      description: "Gestion des ressources financières"
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Notre Mission
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              2EF est un collectif dynamique d'élèves et d'étudiants engagés pour 
              transformer l'éducation dans la région du Ferlo.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* Values Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-white rounded-xl p-8 shadow-lg transform hover:-translate-y-1 transition-transform">
            <Target className="h-12 w-12 text-blue-600 mb-6" />
            <h3 className="text-xl font-bold mb-4">Notre Vision</h3>
            <p className="text-gray-600">
              Créer un environnement éducatif innovant et accessible pour tous les étudiants du Ferlo.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg transform hover:-translate-y-1 transition-transform">
            <Heart className="h-12 w-12 text-red-600 mb-6" />
            <h3 className="text-xl font-bold mb-4">Nos Valeurs</h3>
            <p className="text-gray-600">
              Excellence, solidarité et innovation dans l'apprentissage collaboratif.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg transform hover:-translate-y-1 transition-transform">
            <BookOpen className="h-12 w-12 text-green-600 mb-6" />
            <h3 className="text-xl font-bold mb-4">Notre Approche</h3>
            <p className="text-gray-600">
              Une éducation moderne adaptée aux besoins spécifiques de notre région.
            </p>
          </div>
        </div>
      </section>

      {/* Bureau Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Notre Bureau</h2>
            <p className="text-xl text-gray-600">Une équipe passionnée au service de l'éducation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bureau.map((member, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg transform hover:-translate-y-1 transition-transform">
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Notre Impact</h2>
            <p className="text-xl text-blue-100">Des résultats concrets pour notre communauté</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Award className="h-12 w-12 mx-auto mb-4 text-blue-200" />
              <h3 className="text-2xl font-bold mb-2">500+</h3>
              <p className="text-blue-100">Étudiants accompagnés</p>
            </div>

            <div className="text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-blue-200" />
              <h3 className="text-2xl font-bold mb-2">50+</h3>
              <p className="text-blue-100">Mentors actifs</p>
            </div>

            <div className="text-center">
              <Sparkles className="h-12 w-12 mx-auto mb-4 text-blue-200" />
              <h3 className="text-2xl font-bold mb-2">100%</h3>
              <p className="text-blue-100">Taux de réussite</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;