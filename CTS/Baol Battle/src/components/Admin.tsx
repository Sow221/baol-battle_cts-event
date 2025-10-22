import { BarChart, Users, Eye, Download } from 'lucide-react';

interface Registration {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  filiere: string;
  created_at: string;
}

export default function Admin() {
  // Données statiques (pas de backend)
  const stats = {
    totalRegistrations: 0,
    totalViews: 0,
    viewsToday: 0
  };

  const mockRegistrations: Registration[] = [];

  const exportToCSV = () => {
    // Export vide (pas de données)
    alert('Aucune donnée à exporter (mode statique).');
  };

  return (
    <section id="admin" className="py-20 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900">
            Panel d'Administration (Mode Statique)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-3xl font-bold text-gray-900">
                {stats.totalRegistrations}
              </span>
            </div>
            <h3 className="text-gray-600 font-medium">Inscriptions Totales</h3>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-3xl font-bold text-gray-900">
                {stats.totalViews}
              </span>
            </div>
            <h3 className="text-gray-600 font-medium">Visites Totales</h3>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <BarChart className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-3xl font-bold text-gray-900">
                {stats.viewsToday}
              </span>
            </div>
            <h3 className="text-gray-600 font-medium">Visites Aujourd'hui</h3>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Liste des Inscrits
            </h3>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Exporter CSV
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Prénom</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Nom</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Filière</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody>
                {mockRegistrations.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-500">
                      Aucune inscription disponible (mode statique)
                    </td>
                  </tr>
                ) : (
                  mockRegistrations.map((reg) => (
                    <tr key={reg.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">{reg.first_name}</td>
                      <td className="py-3 px-4">{reg.last_name}</td>
                      <td className="py-3 px-4">{reg.email}</td>
                      <td className="py-3 px-4">{reg.filiere}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(reg.created_at).toLocaleString('fr-FR')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <p className="text-yellow-800">
            <strong>Note :</strong> Ce panel est en mode statique sans base de données. Les inscriptions sont simulées localement et ne sont pas stockées.
          </p>
        </div>
      </div>
    </section>
  );
}
