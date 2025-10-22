import { Mail, Phone, MapPin } from 'lucide-react';
import { Linkedin } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Contact & Informations Pratiques
            </h2>
            <p className="text-xl text-gray-600">
              Besoin d'aide ? Contactez-nous
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                    <a
                      href="mailto:ctsnetwork@gmail.com"
                      className="text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      ctsnetwork@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-100 rounded-lg flex-shrink-0">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Téléphone / WhatsApp</h3>
                    <a
                      href="tel:+221785911129"
                      className="text-green-600 hover:text-green-700 hover:underline"
                    >
                      +221 78 591 11 29
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-100 rounded-lg flex-shrink-0">
                    <MapPin className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Lieu de l'événement</h3>
                    <p className="text-gray-700">
                      Amphithéâtre PGSUP<br />
                      Université Alioune Diop de Bambey<br />
                      Bambey, Sénégal
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-bold text-gray-900 mb-4">Suivez-nous</h3>
                <div className="flex flex-col gap-4">
                  <a
                    href="https://www.linkedin.com/in/cyber-tech-squad-cts-723731351/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
                  >
                    <Linkedin className="w-6 h-6 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">Cyber Tech Squad (CTS)</span>
                  </a>
                  <a
                    href="https://www.tiktok.com/@cyber_tech_squad/video/7562924212306988300"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                    <span className="text-sm font-medium text-gray-700">@cyber_tech_squad</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3869.8237594949586!2d-16.46!3d14.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec173fc6e5e1e5e%3A0x7b1b5f7c6e6f5e5e!2sUniversit%C3%A9%20Alioune%20Diop%20de%20Bambey!5e0!3m2!1sfr!2ssn!4v1234567890123!5m2!1sfr!2ssn"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation de l'événement"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
