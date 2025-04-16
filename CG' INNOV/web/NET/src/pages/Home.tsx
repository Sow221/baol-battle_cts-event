import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Calendar, ArrowRight, ChevronRight, Star } from 'lucide-react';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-90"></div>
          <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Ensemble pour l'Education <br />du Ferlo
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Un collectif d'élèves et d'étudiants engagés pour transformer l'éducation dans notre région
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/about"
                className="inline-flex items-center px-8 py-3 border-2 border-white text-lg font-medium rounded-full text-white hover:bg-white hover:text-blue-600 transition-colors"
              >
                Découvrir 2EF
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/library"
                className="inline-flex items-center px-8 py-3 bg-white text-blue-600 text-lg font-medium rounded-full hover:bg-blue-50 transition-colors"
              >
                Bibliothèque
                <BookOpen className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-lg transform hover:-translate-y-1 transition-transform">
              <BookOpen className="h-12 w-12 text-blue-600 mb-6" />
              <h3 className="text-xl font-bold mb-4">Ressources Éducatives</h3>
              <p className="text-gray-600 mb-6">
                Une bibliothèque numérique complète pour les séries S et L
              </p>
              <Link
                to="/library"
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                Explorer
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg transform hover:-translate-y-1 transition-transform">
              <Users className="h-12 w-12 text-blue-600 mb-6" />
              <h3 className="text-xl font-bold mb-4">Communauté Active</h3>
              <p className="text-gray-600 mb-6">
                Un réseau dynamique d'étudiants et d'enseignants passionnés
              </p>
              <Link
                to="/about"
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                Rejoindre
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg transform hover:-translate-y-1 transition-transform">
              <Calendar className="h-12 w-12 text-blue-600 mb-6" />
              <h3 className="text-xl font-bold mb-4">Événements Réguliers</h3>
              <p className="text-gray-600 mb-6">
                Des ateliers et conférences pour enrichir votre parcours
              </p>
              <Link
                to="/blog"
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                Voir le programme
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Events Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Événements à Venir</h2>
            <p className="text-xl text-gray-600">Rejoignez-nous pour nos prochaines activités</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80"
                alt="Conférence"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    15 Mars 2024
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">Préparation au Bac 2024</h3>
                <p className="text-gray-600 mb-4">
                  Session intensive de révision avec nos meilleurs mentors.
                </p>
                <Link
                  to="/blog"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800"
                >
                  S'inscrire
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80"
                alt="Atelier"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    20 Mars 2024
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">Orientation Professionnelle</h3>
                <p className="text-gray-600 mb-4">
                  Découvrez les opportunités de carrière avec nos experts.
                </p>
                <Link
                  to="/blog"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800"
                >
                  En savoir plus
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80"
                alt="Étude"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    25 Mars 2024
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">Groupe d'Étude Collaboratif</h3>
                <p className="text-gray-600 mb-4">
                  Rejoignez nos sessions d'étude hebdomadaires.
                </p>
                <Link
                  to="/blog"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800"
                >
                  Participer
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-200">Étudiants accompagnés</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-200">Mentors actifs</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-blue-200">Taux de réussite</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;