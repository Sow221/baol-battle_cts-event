import { Shield, Target, Users, Heart } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              À Propos du Club CTS
            </h2>
            <p className="text-xl text-gray-600">
              Sensibilisation et excellence en cybersécurité
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-2xl p-8 mb-12 border border-blue-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-blue-500 rounded-lg flex-shrink-0">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Notre Mission
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Le Club CTS (Cyber & Technology Security) est une organisation estudiantine dédiée à la promotion de la cybersécurité,
                  l'inclusion numérique et la sensibilisation aux enjeux technologiques contemporains. Nous croyons que la cybersécurité
                  est l'affaire de tous, peu importe la filière ou le domaine d'études.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="p-3 bg-green-100 rounded-lg w-fit mb-4">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">
                Multidisciplinarité
              </h4>
              <p className="text-gray-600 text-sm">
                Nous réunissons des étudiants de toutes les filières pour aborder la cybersécurité sous différents angles : technique, juridique, social et environnemental.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="p-3 bg-blue-100 rounded-lg w-fit mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">
                Inclusion
              </h4>
              <p className="text-gray-600 text-sm">
                Nous favorisons un environnement inclusif où chacun peut apprendre et contribuer, indépendamment de son niveau technique ou de son parcours académique.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="p-3 bg-purple-100 rounded-lg w-fit mb-4">
                <Heart className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">
                Sensibilisation
              </h4>
              <p className="text-gray-600 text-sm">
                Notre objectif est de sensibiliser la communauté universitaire aux risques numériques et aux bonnes pratiques de sécurité informatique au quotidien.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Baol Battle : Notre Vision
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              L'événement Baol Battle incarne notre vision d'une cybersécurité accessible et inclusive. À travers des matchs inter-filières
              et des panels multidisciplinaires, nous démontrons que la sécurité numérique concerne tous les domaines de la société moderne.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Que vous soyez étudiant en informatique, en droit, en gestion, en sciences environnementales ou dans toute autre discipline,
              cet événement est conçu pour vous permettre de comprendre les enjeux de la cybersécurité dans votre domaine et de contribuer
              à construire un écosystème numérique plus sûr pour tous.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
