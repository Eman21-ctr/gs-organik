// File: src/components/AdminComponents.jsx (Versi Kontras Maksimal)

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext.jsx';
import { COMPANY_NAME } from '../constants.js';

// --- AdminSidebar (Versi Baru dengan Kontras Maksimal) ---
export const AdminSidebar = ({ isOpen, setIsOpen }) => {
    const { logout } = useAppContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleLinkClick = () => {
        if (window.innerWidth < 768) {
            setIsOpen(false);
        }
    }

    // [PEROMBAKAN WARNA] Kelas CSS baru untuk visibilitas maksimal
    // Teks default sekarang semi-transparan (opacity-75), menjadi solid saat hover/aktif
    const linkClass = "flex items-center px-4 py-2 text-white font-semibold rounded-md transition-colors duration-200 opacity-75 hover:opacity-100 hover:bg-green-700";
    const activeLinkClass = "opacity-100 bg-green-700"; // Saat aktif, 100% visible dan punya background

    return (
        <>
            {/* Overlay */}
            <div 
                className={`fixed inset-0 bg-black bg-opacity-60 z-20 md:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsOpen(false)}
            ></div>
            
            {/* Kontainer Sidebar */}
            <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 w-64 bg-green-800 text-white flex flex-col z-30 transition-transform duration-300 ease-in-out`}>
                <div className="flex items-center justify-between p-4 border-b border-green-700">
    <div className="flex items-center gap-3">
        <img src="/logo.png" alt="GS Organik Logo" className="h-8 w-auto" />
        <span className="text-xl font-bold text-white">{COMPANY_NAME}</span>
    </div>
    <button className="md:hidden text-white hover:bg-green-700 rounded-md p-1" onClick={() => setIsOpen(false)}>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    </button>
</div>
                <nav className="flex-grow p-4 space-y-2">
                    <NavLink to="dashboard" onClick={handleLinkClick} className={({isActive}) => isActive ? `${linkClass} ${activeLinkClass}` : linkClass}>Dashboard</NavLink>
                    <NavLink to="produk" onClick={handleLinkClick} className={({isActive}) => isActive ? `${linkClass} ${activeLinkClass}` : linkClass}>Produk</NavLink>
                    <NavLink to="penjualan" onClick={handleLinkClick} className={({isActive}) => isActive ? `${linkClass} ${activeLinkClass}` : linkClass}>Penjualan</NavLink>
                    <NavLink to="pengeluaran" onClick={handleLinkClick} className={({isActive}) => isActive ? `${linkClass} ${activeLinkClass}` : linkClass}>Pengeluaran</NavLink>
                    <NavLink to="cold-storage" onClick={handleLinkClick} className={({isActive}) => isActive ? `${linkClass} ${activeLinkClass}` : linkClass}>Cold Storage</NavLink>
                    <NavLink to="artikel" onClick={handleLinkClick} className={({isActive}) => isActive ? `${linkClass} ${activeLinkClass}` : linkClass}>Artikel</NavLink>
                </nav>
                <div className="p-4 border-t border-green-700">
                    <button onClick={handleLogout} className="w-full text-left flex items-center px-4 py-2 text-white font-semibold hover:bg-green-700 rounded-md opacity-75 hover:opacity-100">
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
};

// --- StatCard ---
// (Tidak ada perubahan di sini)
export const StatCard = ({ title, value, description }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
            <p className="text-sm text-gray-500">{description}</p>
        </div>
    );
};