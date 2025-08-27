// File: src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext.jsx';
// import { Button, Card, Input } from '../components/ui.jsx'; // Pastikan path ini benar
import { COMPANY_NAME, ADMIN_EMAIL } from '../constants.js';

// Placeholder UI components, sama seperti file lainnya
const Button = (props) => <button {...props} className={`w-full py-2 px-4 rounded ${props.className}`}>{props.children}</button>;
const Card = ({ className, children }) => <div className={`border rounded-lg shadow-md ${className}`}>{children}</div>;
const Input = ({ label, ...props }) => <div><label className="block text-sm font-medium text-gray-700">{label}</label><input {...props} className="mt-1 block w-full border rounded-md shadow-sm p-2" /></div>;


const LoginPage = () => {
    const [email, setEmail] = useState(ADMIN_EMAIL);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAppContext();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const success = await login(email, password); // Kirim email & password
    if (success) {
        navigate('/admin/dashboard');
    } else {
        setError('Email atau Password salah. Silakan coba lagi.');
    }
};

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="max-w-md w-full px-6">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-brand-green-800">{COMPANY_NAME}</h1>
                    <p className="text-gray-600">Admin Dashboard Login</p>
                </div>
                <Card className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            label="Email"
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled
                        />
                        <Input
                            label="Password"
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Hint: password123"
                            required
                        />
                        {error && <p className="text-sm text-red-600">{error}</p>}
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;