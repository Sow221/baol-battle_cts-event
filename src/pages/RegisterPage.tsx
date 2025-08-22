import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(''); // Réinitialiser l'erreur

        // Validation simple : les mots de passe doivent correspondre
        if (formData.password !== formData.confirmPassword) {
            setError('Les mots de passe не correspondent pas.');
            return;
        }

        // Simulation d'un appel API réussi
        console.log('Données du formulaire soumises :', {
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password
        });

        alert('Inscription réussie (simulation) ! Vérifiez la console.');
        // Ici, on redirigerait l'utilisateur vers la page de connexion ou le tableau de bord
        // par exemple : navigate('/login');
    };

    return (
        <main className="w-full h-screen flex flex-col items-center justify-center px-4 bg-background relative">
            <Link to="/" className="absolute top-8 left-8 flex items-center gap-x-2 text-text-secondary hover:text-primary transition-colors">
                <ArrowLeft size={20} />
                Retour à l'accueil
            </Link>
            <div className="max-w-sm w-full text-text-primary">
                <div className="text-center">
                    <Link to="/" className="text-3xl font-bold text-text-primary">MoneyWise</Link>
                    <div className="mt-5">
                        <h3 className="text-2xl font-bold sm:text-3xl">Créez votre compte</h3>
                        <p className="mt-2">Vous avez déjà un compte ? <Link to="/login" className="font-medium text-primary hover:text-primary-hover">Connectez-vous</Link></p>
                    </div>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                >
                    {error && <p className="text-center text-negative bg-negative/10 p-2 rounded-lg">{error}</p>}
                    <div>
                        <label className="font-medium">Nom complet</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="w-full mt-2 px-3 py-2 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full mt-2 px-3 py-2 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="font-medium">Mot de passe</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full mt-2 px-3 py-2 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"
                        />
                    </div>
                     <div>
                        <label className="font-medium">Confirmer le mot de passe</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full mt-2 px-3 py-2 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white font-medium bg-primary hover:bg-primary-hover active:bg-primary rounded-lg duration-150"
                    >
                        Créer un compte
                    </button>
                </form>
            </div>
        </main>
    )
}

export default RegisterPage;