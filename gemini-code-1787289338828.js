import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminRequestsPage from './pages/AdminRequestsPage';

function App() {
    return (
        <AuthProvider>
            <Router>
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/admin/requests" element={<AdminRequestsPage />} />
                    <Route path="/yeu-cau" element={<AdminRequestsPage />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;