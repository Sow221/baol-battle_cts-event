import { useState } from 'react';
import { ThemeToggle } from '../ThemeToggle';

const Navbar = () => {
    const [state, setState] = useState(false);

    const navigation = [
        { title: "Fonctionnalités", path: "#features" },
        { title: "L'équipe", path: "#team" },
        { title: "FAQ", path: "#faq" },
        { title: "Contact", path: "#contact" },
    ];

    return (
        <nav className="bg-background w-full top-0 z-20 sticky border-b border-border">
            <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
                <div className="flex items-center justify-between py-3 md:py-5 md:block">
                    <a href="/">
                        <h1 className="text-2xl font-bold text-text-primary">MoneyWise</h1>
                    </a>
                    <div className="md:hidden flex items-center space-x-2">
                        <ThemeToggle />
                        <button
                            className="text-text-primary outline-none p-2 rounded-md focus:border-gray-400 focus:border"
                            onClick={() => setState(!state)}
                        >
                            {state ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
                <div className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? 'block' : 'hidden'}`}>
                    <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                        {navigation.map((item, idx) => (
                            <li key={idx} className="text-text-secondary hover:text-primary">
                                <a href={item.path} onClick={() => setState(false)}>{item.title}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="hidden md:flex items-center space-x-4">
                    <div className="hidden md:block">
                        <ThemeToggle />
                    </div>
                    <a href="/login" className="py-2 px-4 text-white bg-primary hover:bg-primary-hover rounded-md shadow">
                        Se connecter
                    </a>
                    <a href="/register" className="py-2 px-4 text-text-primary bg-background-surface hover:bg-primary-hover hover:text-white rounded-md shadow">
                        S'inscrire
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;