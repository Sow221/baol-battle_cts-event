import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ForgotPasswordPage = () => {
    return (
        <main className="w-full h-screen flex flex-col items-center justify-center px-4 bg-background relative">
            <Link to="/login" className="absolute top-8 left-8 flex items-center gap-x-2 text-text-secondary hover:text-primary transition-colors">
                <ArrowLeft size={20} />
                Retour à la connexion
            </Link>
            <div className="max-w-sm w-full text-text-primary">
                <div className="text-center">
                    <Link to="/" className="text-3xl font-bold text-text-primary">MoneyWise</Link>
                    <div className="mt-5">
                        <h3 className="text-2xl font-bold sm:text-3xl">Mot de passe oublié ?</h3>
                        <p className="mt-2 text-text-secondary">Pas de panique. Saisissez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.</p>
                    </div>
                </div>
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="mt-8 space-y-5"
                >
                    <div>
                        <label className="font-medium">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full mt-2 px-3 py-2 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"
                        />
                    </div>
                    <button
                        className="w-full px-4 py-2 text-white font-medium bg-primary hover:bg-primary-hover active:bg-primary rounded-lg duration-150"
                    >
                        Envoyer le lien
                    </button>
                </form>
            </div>
        </main>
    )
}

export default ForgotPasswordPage;