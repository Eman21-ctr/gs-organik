// File: src/pages/AdminLayout.jsx (Dengan Perbaikan Visibilitas Maksimal)

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from '../components/AdminComponents.jsx';
import { COMPANY_NAME } from '../constants.js';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="relative min-h-screen md:flex bg-gray-100">
            {/* [PEROMBAKAN WARNA] Mobile Header dengan ikon hamburger super kontras */}
            <div className="md:hidden flex justify-between items-center bg-green-800 text-white p-4 sticky top-0 z-10 shadow-lg">
                <button 
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-1 rounded-md text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    aria-label="Buka menu"
                >
                    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <h1 className="text-xl font-bold">{COMPANY_NAME}</h1>
                <div className="w-8"></div> {/* Spacer agar judul tetap di tengah */}
            </div>

            <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            
            <main className="flex-grow p-4 sm:p-6 lg:p-8 text-black antialiased">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;