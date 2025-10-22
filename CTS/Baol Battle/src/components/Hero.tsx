import { Calendar, MapPin } from 'lucide-react';
import CyberBackground from './CyberBackground';

export default function Hero() {

  const scrollToProgram = () => {
    document.getElementById('program')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      <CyberBackground />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col items-center justify-center">
          <div className="max-w-4xl text-center">
            <div className="flex items-center justify-center mb-8">
              <img
                src="/WhatsApp Image 2025-10-07 à 16.47.19_eda46fe0.jpg"
                alt="Cyber Tech Squad CTS Logo"
                className="w-32 h-32 rounded-full border-4 border-blue-400/50 shadow-2xl hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* Vidéo de lancement TikTok */}
            <div className="max-w-2xl mx-auto mb-12">
              <iframe
                src="https://www.tiktok.com/embed/v2/7562924212306988300"
                style={{ maxWidth: '100%', height: '400px' }}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Vidéo de lancement Baol Battle"
              ></iframe>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Baol <span className="text-blue-400">Battle</span>
            </h1>

            <p className="text-xl lg:text-2xl text-blue-100 mb-8 font-light">
              Cyber & Multidisciplinarité
            </p>

            <p className="text-xl lg:text-2xl text-blue-200 mb-12 font-medium italic">
              "La sécurité, c'est l'affaire de tous"
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
                <Calendar className="w-5 h-5 text-blue-300" />
                <div className="text-left">
                  <div className="text-xs text-gray-300">Date</div>
                  <div className="font-semibold">25 octobre 2025</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
                <MapPin className="w-5 h-5 text-blue-300" />
                <div className="text-left">
                  <div className="text-xs text-gray-300">Lieu</div>
                  <div className="font-semibold text-sm">Resto Europe</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={scrollToProgram}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-blue-500/50"
              >
                Découvrir le programme
              </button>

              <button
                onClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-lg transition-all border border-white/30"
              >
                S'inscrire maintenant
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
