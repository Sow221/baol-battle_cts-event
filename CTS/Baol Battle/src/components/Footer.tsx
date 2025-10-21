import { Shield } from 'lucide-react';

export default function Footer() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-blue-400" />
              <span className="text-xl font-bold">Baol Battle</span>
            </div>
            <p className="text-gray-400 text-sm mb-3">
              Un événement du Club CTS dédié à la cybersécurité, l'inclusion et la multidisciplinarité.
            </p>
            <p className="text-blue-300 text-sm italic font-medium">
              "La sécurité, c'est l'affaire de tous"
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Accueil
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('program')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Programme
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('registration')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Inscription
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  À Propos
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: ctsnetwork@gmail.com</li>
              <li>Tél: +221 78 591 11 29</li>
              <li>UADB, Bambey</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 Club CTS. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
