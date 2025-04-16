import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Atelier de Préparation au Bac 2024",
      excerpt: "Rejoignez-nous pour une série d'ateliers intensifs de préparation aux examens du baccalauréat.",
      date: "15 Mars 2024",
      author: "Amadou Diallo",
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80",
      category: "Événements"
    },
    {
      id: 2,
      title: "Conférence sur l'Orientation Professionnelle",
      excerpt: "Une journée dédiée à l'orientation professionnelle avec des intervenants de divers secteurs.",
      date: "20 Mars 2024",
      author: "Fatou Sow",
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80",
      category: "Conférences"
    },
    {
      id: 3,
      title: "Nouvelle Bibliothèque Numérique",
      excerpt: "Découvrez notre nouvelle plateforme de ressources numériques pour les séries S et L.",
      date: "25 Mars 2024",
      author: "Omar Ba",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80",
      category: "Ressources"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Actualités et Événements</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Calendar className="h-4 w-4 mr-1" />
                <span className="mr-4">{post.date}</span>
                <User className="h-4 w-4 mr-1" />
                <span>{post.author}</span>
              </div>
              <button className="inline-flex items-center text-blue-600 hover:text-blue-800">
                Lire plus
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Upcoming Events Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold mb-8">Événements à Venir</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Session de Révision - Mathématiques</h3>
              <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                30 Mars 2024
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Session intensive de révision pour les élèves de Terminale S.
            </p>
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              S'inscrire
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Atelier d'Expression Écrite</h3>
              <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                5 Avril 2024
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Perfectionnement en expression écrite pour les élèves de Terminale L.
            </p>
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              S'inscrire
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;