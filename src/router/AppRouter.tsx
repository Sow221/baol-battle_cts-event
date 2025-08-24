import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import DashboardPage from '../pages/DashboardPage';
import TransactionsPage from '../pages/TransactionsPage';
import ReportsPage from '../pages/ReportsPage';
import AddTransactionPage from '../pages/AddTransactionPage';
import ProfilePage from '../pages/ProfilePage';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Routes Publiques */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Routes Privées (protégées par l'authentification) */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/add-transaction" element={<AddTransactionPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;