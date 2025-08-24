import AppLayout from '../layouts/AppLayout';
import { Plus, Download, Trash2, Edit } from 'lucide-react';

// Données factices pour les catégories
const categories = [
    { id: 1, name: 'Alimentation', color: 'bg-blue-500' },
    { id: 2, name: 'Loyer', color: 'bg-red-500' },
    { id: 3, name: 'Travail', color: 'bg-green-500' },
    { id: 4, name: 'Loisirs', color: 'bg-yellow-500' },
];

const ProfilePage = () => {
    return (
        <AppLayout title="Profil et Paramètres">
            <div className="space-y-8 max-w-4xl mx-auto">
                {/* Section Profil Utilisateur */}
                <div className="bg-background-surface p-6 rounded-lg border border-border">
                    <h2 className="text-xl font-semibold text-text-primary mb-4">Informations Personnelles</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="font-medium text-text-primary">Nom complet</label>
                            <input
                                type="text"
                                defaultValue="Mamadou Bano Barry"
                                className="w-full mt-2 px-3 py-2 text-text-primary bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="font-medium text-text-primary">Adresse Email</label>
                            <input
                                type="email"
                                defaultValue="mamadou@exemple.com"
                                className="w-full mt-2 px-3 py-2 text-text-primary bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"
                            />
                        </div>
                        <div className="pt-2 flex justify-end gap-x-4">
                             <button type="button" className="px-4 py-2 text-text-primary font-medium bg-background-surface border border-border hover:bg-border rounded-lg duration-150">
                                Changer le mot de passe
                            </button>
                            <button type="submit" className="px-4 py-2 text-white font-medium bg-primary hover:bg-primary-hover rounded-lg duration-150">
                                Enregistrer
                            </button>
                        </div>
                    </form>
                </div>

                {/* Section Gestion des Catégories */}
                <div className="bg-background-surface p-6 rounded-lg border border-border">
                    <h2 className="text-xl font-semibold text-text-primary mb-4">Gérer les Catégories</h2>
                    <div className="space-y-4">
                        {categories.map(cat => (
                            <div key={cat.id} className="flex items-center justify-between bg-background p-3 rounded-lg">
                                <div className="flex items-center gap-x-3">
                                    <span className={`w-3 h-3 rounded-full ${cat.color}`}></span>
                                    <span className="text-text-primary">{cat.name}</span>
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <button className="text-text-secondary hover:text-primary"><Edit size={16} /></button>
                                    <button className="text-text-secondary hover:text-negative"><Trash2 size={16} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4">
                        <button className="w-full flex items-center justify-center gap-x-2 border-2 border-dashed border-border hover:border-primary hover:text-primary text-text-secondary p-3 rounded-lg transition-colors">
                            <Plus size={18} />
                            Ajouter une catégorie
                        </button>
                    </div>
                </div>

                {/* Section Export des Données */}
                <div className="bg-background-surface p-6 rounded-lg border border-border">
                    <h2 className="text-xl font-semibold text-text-primary mb-4">Exporter vos Données</h2>
                    <p className="text-text-secondary mb-4">Téléchargez un rapport complet de vos transactions dans le format de votre choix.</p>
                    <div className="flex gap-x-4">
                        <button className="flex items-center justify-center gap-x-2 bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-hover w-full">
                            <Download size={18} />
                            Exporter en PDF
                        </button>
                         <button className="flex items-center justify-center gap-x-2 bg-background-surface border border-border text-text-primary font-semibold px-4 py-2 rounded-lg hover:bg-border w-full">
                            <Download size={18} />
                            Exporter en CSV
                        </button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default ProfilePage;