import { Clock, Users, Trophy, MessageSquare, MapPin, Calendar } from 'lucide-react';

interface Session {
  time: string;
  title: string;
  type: 'welcome' | 'match' | 'panel' | 'break' | 'results';
  description: string;
  speakers?: Array<{
    name: string;
    role: string;
    domain: string;
  }>;
  teams?: string[];
}

interface Day {
  date: string;
  dayName: string;
  location: string;
  sessions: Session[];
}

const schedule: Day[] = [
  {
    date: '25 octobre 2025',
    dayName: 'Première Journée',
    location: 'Resto Europe',
    sessions: [
      {
        time: '15:30 - 15:45',
        title: 'Accueil des invités et mise en place',
        type: 'welcome',
        description: 'Accueil et préparation pour le début de l\'événement'
      },
      {
        time: '15:45 - 16:00',
        title: 'Présentation des invités et ouverture officielle',
        type: 'welcome',
        description: 'Cérémonie d\'ouverture du Baol Battle'
      },
      {
        time: '16:00 - 16:45',
        title: 'Panel "L\'importance de la cybersécurité et la protection des données numériques"',
        type: 'panel',
        description: 'Panel de sensibilisation sur les enjeux majeurs de la cybersécurité'
      },
      {
        time: '16:45 - 17:00',
        title: 'Pause',
        type: 'break',
        description: 'Pause et échanges entre participants'
      },
      {
        time: '17:00 - 17:30',
        title: 'Match',
        type: 'match',
        description: 'Compétition de génie en herbe entre les équipes étudiantes'
      },
      {
        time: '17:30 - 18:00',
        title: 'Résultats et remise des prix de la journée',
        type: 'results',
        description: 'Annonce des résultats et remise des prix aux gagnants'
      }
    ]
  },
  {
    date: '1er novembre 2025',
    dayName: 'Deuxième Journée',
    location: 'À communiquer',
    sessions: [
      {
        time: '15:30 - 15:45',
        title: 'Accueil des invités et mise en place',
        type: 'welcome',
        description: 'Accueil et préparation pour la deuxième journée'
      },
      {
        time: '15:45 - 16:00',
        title: 'Présentation des invités',
        type: 'welcome',
        description: 'Présentation des intervenants de la journée'
      },
      {
        time: '16:00 - 16:45',
        title: 'Panel',
        type: 'panel',
        description: 'Panel thématique sur la cybersécurité'
      },
      {
        time: '16:45 - 17:00',
        title: 'Pause',
        type: 'break',
        description: 'Pause et échanges entre participants'
      },
      {
        time: '17:00 - 17:30',
        title: 'Match',
        type: 'match',
        description: 'Compétition de génie en herbe entre les équipes étudiantes'
      },
      {
        time: '17:30 - 18:00',
        title: 'Résultats et remise des prix de la journée',
        type: 'results',
        description: 'Annonce des résultats et remise des prix aux gagnants'
      }
    ]
  },
  {
    date: '8 novembre 2025',
    dayName: 'Troisième Journée',
    location: 'À communiquer',
    sessions: [
      {
        time: '15:30 - 15:45',
        title: 'Accueil des invités et mise en place',
        type: 'welcome',
        description: 'Accueil et préparation pour la troisième journée'
      },
      {
        time: '15:45 - 16:00',
        title: 'Présentation des invités',
        type: 'welcome',
        description: 'Présentation des intervenants de la journée'
      },
      {
        time: '16:00 - 16:45',
        title: 'Panel',
        type: 'panel',
        description: 'Panel thématique sur la cybersécurité'
      },
      {
        time: '16:45 - 17:00',
        title: 'Pause',
        type: 'break',
        description: 'Pause et échanges entre participants'
      },
      {
        time: '17:00 - 17:30',
        title: 'Match',
        type: 'match',
        description: 'Compétition de génie en herbe entre les équipes étudiantes'
      },
      {
        time: '17:30 - 18:00',
        title: 'Résultats et remise des prix de la journée',
        type: 'results',
        description: 'Annonce des résultats et remise des prix aux gagnants'
      }
    ]
  },
  {
    date: '15 novembre 2025',
    dayName: 'Quatrième Journée',
    location: 'À communiquer',
    sessions: [
      {
        time: '15:30 - 15:45',
        title: 'Accueil des invités et mise en place',
        type: 'welcome',
        description: 'Accueil et préparation pour la quatrième journée'
      },
      {
        time: '15:45 - 16:00',
        title: 'Présentation des invités',
        type: 'welcome',
        description: 'Présentation des intervenants de la journée'
      },
      {
        time: '16:00 - 16:45',
        title: 'Panel',
        type: 'panel',
        description: 'Panel thématique sur la cybersécurité'
      },
      {
        time: '16:45 - 17:00',
        title: 'Pause',
        type: 'break',
        description: 'Pause et échanges entre participants'
      },
      {
        time: '17:00 - 17:30',
        title: 'Match',
        type: 'match',
        description: 'Compétition de génie en herbe entre les équipes étudiantes'
      },
      {
        time: '17:30 - 18:00',
        title: 'Résultats et remise des prix de la journée',
        type: 'results',
        description: 'Annonce des résultats et remise des prix aux gagnants'
      }
    ]
  }
];

export default function Program() {
  return (
    <section id="program" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Programme de la Journée
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Une journée complète dédiée à la cybersécurité, l'inclusion et la multidisciplinarité
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-8">
          {schedule.map((day, dayIndex) => (
            <div key={dayIndex}>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {day.dayName} - {day.date} ({day.location})
              </h3>
              <div className="space-y-4">
                {day.sessions.map((session, sessionIndex) => (
                  <div
                    key={sessionIndex}
                    className={`bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-xl border-l-4 ${
                      session.type === 'match'
                        ? 'border-blue-500'
                        : 'border-green-500'
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                        <div className="flex-shrink-0">
                          <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-lg ${
                              session.type === 'match'
                                ? 'bg-blue-100 text-blue-600'
                                : 'bg-green-100 text-green-600'
                            }`}>
                              {session.type === 'match' ? (
                                <Trophy className="w-6 h-6" />
                              ) : (
                                <MessageSquare className="w-6 h-6" />
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                                <Clock className="w-4 h-4" />
                                {session.time}
                              </div>
                              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                session.type === 'match'
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-green-100 text-green-700'
                              }`}>
                                {session.type === 'match' ? 'Match' : 'Panel'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {session.title}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {session.description}
                          </p>

                          {session.speakers && session.speakers.length > 0 && (
                            <div className="space-y-3">
                              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                <Users className="w-4 h-4" />
                                Intervenants
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {session.speakers.map((speaker, idx) => (
                                  <div
                                    key={idx}
                                    className="bg-gray-50 rounded-lg p-3 border border-gray-200"
                                  >
                                    <div className="font-semibold text-gray-900">
                                      {speaker.name}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                      {speaker.role}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                      {speaker.domain}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {session.teams && session.teams.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {session.teams.map((team, idx) => (
                                <span
                                  key={idx}
                                  className="bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full font-medium"
                                >
                                  {team}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}