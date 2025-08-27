// File: src/pages/PublicLayout.jsx (PASTIKAN KODENYA SEPERTI INI)

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Footer, CartSidebar } from '../components/PublicComponents.jsx';

const PublicLayout = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header onCartClick={() => setIsCartOpen(true)} />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
            <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
    );
};

export default PublicLayout;