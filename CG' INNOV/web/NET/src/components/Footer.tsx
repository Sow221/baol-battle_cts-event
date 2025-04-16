import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 text-transparent bg-clip-text">2EF</h3>
              <p className="text-blue-200 mt-2">
                Ensemble pour l'Education du Ferlo
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-blue-200">Navigation</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-blue-200 hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-blue-200 hover:text-white transition-colors">
                  À Propos
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-blue-200 hover:text-white transition-colors">
                  Actualités
                </Link>
              </li>
              <li>
                <Link to="/library" className="text-blue-200 hover:text-white transition-colors">
                  Bibliothèque
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-blue-200">Ressources</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/library/serie-s" className="text-blue-200 hover:text-white transition-colors">
                  Série S
                </Link>
              </li>
              <li>
                <Link to="/library/serie-l" className="text-blue-200 hover:text-white transition-colors">
                  Série L
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-blue-200 hover:text-white transition-colors">
                  Événements
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-6 text-blue-200">Contact</h3>
            <div className="flex items-center space-x-3 text-blue-200">
              <MapPin className="h-5 w-5" />
              <span>Ferlo, Sénégal</span>
            </div>
            <div className="flex items-center space-x-3 text-blue-200">
              <Mail className="h-5 w-5" />
              <a href="mailto:contact@2ef.org" className="hover:text-white transition-colors">
                contact@2ef.org
              </a>
            </div>
            <div className="flex items-center space-x-3 text-blue-200">
              <Phone className="h-5 w-5" />
              <span>+221 XX XXX XX XX</span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-blue-700 text-center text-blue-200">
          <p>&copy; {new Date().getFullYear()} 2EF - Ensemble pour l'Education du Ferlo. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;