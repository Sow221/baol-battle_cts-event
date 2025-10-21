import { useState } from 'react';
import { CheckCircle, AlertCircle, UserPlus } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Registration() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    filiere: '',
    gdprConsent: false
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    if (!formData.gdprConsent) {
      setStatus('error');
      setErrorMessage('Vous devez accepter la politique de confidentialité pour vous inscrire.');
      return;
    }

    try {
      const { error } = await supabase
        .from('registrations')
        .insert({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          filiere: formData.filiere,
          gdpr_consent: formData.gdprConsent
        });

      if (error) {
        if (error.code === '23505') {
          setErrorMessage('Cette adresse email est déjà enregistrée.');
        } else {
          setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
        }
        setStatus('error');
      } else {
        setStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          filiere: '',
          gdprConsent: false
        });
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <section id="registration" className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <UserPlus className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Inscription
            </h2>
            <p className="text-xl text-gray-600">
              Rejoignez-nous pour cette journée exceptionnelle
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-blue-100 hover:shadow-3xl transition-shadow duration-500">
            {status === 'success' ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Inscription confirmée !
                </h3>
                <p className="text-gray-600 mb-6">
                  Merci pour votre inscription. Vous recevrez bientôt un email de confirmation avec tous les détails de l'événement.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  Nouvelle inscription
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                      placeholder="Votre prénom"
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Nom *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                      placeholder="Votre nom"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    placeholder="votre.email@example.com (optionnel)"
                  />
                </div>

                <div>
                  <label htmlFor="filiere" className="block text-sm font-semibold text-gray-700 mb-2">
                    Département *
                  </label>
                  <select
                    id="filiere"
                    name="filiere"
                    required
                    value={formData.filiere}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white"
                  >
                    <option value="">Sélectionnez votre département</option>
                    <option value="satic">SATIC</option>
                    <option value="ecomij">ECOMIJ</option>
                    <option value="dd">DD</option>
                    <option value="isfar">ISFAR</option>
                    <option value="administration">Administration</option>
                    <option value="agent-universitaire">Agent Universitaire (COUSS)</option>
                  </select>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-5 hover:border-blue-400 transition-colors">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="gdprConsent"
                      checked={formData.gdprConsent}
                      onChange={handleChange}
                      className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-sm text-gray-800 font-medium">
                      J'accepte de participer à cet événement *
                    </span>
                  </label>
                </div>

                {status === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{errorMessage}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold px-6 py-4 rounded-xl transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl"
                >
                  {status === 'loading' ? 'Inscription en cours...' : 'S\'inscrire maintenant'}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  * Champs obligatoires
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
