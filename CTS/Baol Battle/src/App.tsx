import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Hero from './components/Hero';
import Program from './components/Program';
import Registration from './components/Registration';
import About from './components/About';
import Contact from './components/Contact';
import Admin from './components/Admin';
import Footer from './components/Footer';
import { trackPageView } from './lib/analytics';

function App() {
  const [showAdminNav, setShowAdminNav] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    trackPageView('/');
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-md z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              Baol Battle
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => scrollToSection('program')}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Programme
              </button>
              <button
                onClick={() => scrollToSection('registration')}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Inscription
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                À Propos
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Contact
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => scrollToSection('program')}
                  className="text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Programme
                </button>
                <button
                  onClick={() => scrollToSection('registration')}
                  className="text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Inscription
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  À Propos
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Contact
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="pt-16">
        <Hero />
        <Program />
        <Registration />
        <About />
        <Contact />
        {showAdminNav && <Admin />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
