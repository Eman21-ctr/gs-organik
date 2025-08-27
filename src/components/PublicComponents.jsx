// File: src/components/PublicComponents.jsx (Versi Final dengan Header Baru)

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../context/AppContext.jsx';
import { ProductAvailability } from '../types.js';
import { COMPANY_NAME, WHATSAPP_NUMBER } from '../constants.js';
import { Button, Card } from './ui.jsx';

// --- Header (Versi Baru dengan Latar Hijau & Hamburger Kiri) ---
export const Header = ({ onCartClick }) => {
    const { cartCount } = useAppContext();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Kelas CSS baru untuk teks putih dengan latar hijau
    const linkClass = "text-green-50 hover:bg-green-700 transition-colors px-3 py-2 rounded-md font-medium";
    const activeLinkClass = "bg-green-900"; // Latar lebih gelap saat aktif

    const navLinks = (
        <>
            <NavLink to="/" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? `${linkClass} ${activeLinkClass}` : linkClass}>Beranda</NavLink>
            <NavLink to="/produk" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? `${linkClass} ${activeLinkClass}` : linkClass}>Katalog Produk</NavLink>
            <NavLink to="/artikel" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? `${linkClass} ${activeLinkClass}` : linkClass}>Artikel</NavLink>
            <NavLink to="/tentang" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? `${linkClass} ${activeLinkClass}` : linkClass}>Tentang Kami</NavLink>
            <NavLink to="/kontak" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? `${linkClass} ${activeLinkClass}` : linkClass}>Kontak</NavLink>
        </>
    );

    return (
        <header className="bg-green-800 shadow-lg sticky top-0 z-40">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Grup Kiri: Hamburger (mobile) & Nama Perusahaan */}
                    <div className="flex items-center">
                        <div className="md:hidden mr-4">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md text-green-200 hover:text-white hover:bg-green-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                                </svg>
                            </button>
                        </div>
                        <NavLink to="/" className="flex items-center gap-3">
    <img src="/logo.png" alt="GS Organik Logo" className="h-8 w-auto" />
    <span className="text-2xl font-bold text-white hidden sm:block">{COMPANY_NAME}</span>
</NavLink>
                    </div>

                    {/* Navigasi Desktop (tengah) */}
                    <div className="hidden md:block">
                        <nav className="flex items-baseline space-x-4">
                            {navLinks}
                        </nav>
                    </div>

                    {/* Grup Kanan: Ikon Keranjang */}
                    <div className="flex items-center">
                        <button onClick={onCartClick} className="relative p-2 rounded-full text-green-200 hover:text-white hover:bg-green-700 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            {cartCount > 0 && <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">{cartCount}</span>}
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigasi Mobile (menu dropdown) */}
            {isMenuOpen && (
                <div className="md:hidden pb-4 px-2 sm:px-3">
                    <nav className="flex flex-col space-y-1">
                        {navLinks}
                    </nav>
                </div>
            )}
        </header>
    );
};

// --- Footer ---
export const Footer = () => {
  return (
    <footer className="bg-green-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p>&copy; {new Date().getFullYear()} {COMPANY_NAME}. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// --- ProductCard ---
export const ProductCard = ({ product }) => {
    const { addToCart } = useAppContext();

    const availabilityStyles = {
        [ProductAvailability.Tersedia]: 'bg-green-100 text-green-800',
        [ProductAvailability.Habis]: 'bg-red-100 text-red-800',
        [ProductAvailability.SegeraPanen]: 'bg-yellow-100 text-yellow-800',
    };

    const isAvailable = product.availability === ProductAvailability.Tersedia;

    return (
        <Card className="flex flex-col group overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="relative">
                <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover"/>
                <div className={`absolute top-2 right-2 text-xs font-semibold px-2.5 py-1 rounded-full ${availabilityStyles[product.availability]}`}>
                    {product.availability}
                </div>
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <p className="text-sm text-gray-500">{product.category}</p>
                <h3 className="text-lg font-bold text-gray-800 mt-1">{product.name}</h3>
                <p className="mt-2 text-xl font-bold text-green-700">
                    Rp {product.price.toLocaleString('id-ID')}
                    <span className="text-sm font-normal text-gray-500"> / {product.unit}</span>
                </p>
                <p className="text-gray-600 mt-2 flex-grow text-sm">{product.description.substring(0, 70)}...</p>
                <div className="mt-4">
                    <button 
                        onClick={() => addToCart(product)} 
                        disabled={!isAvailable}
                        className="w-full bg-green-700 text-white font-bold py-2 rounded-md hover:bg-green-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        {isAvailable ? 'Tambah ke Keranjang' : 'Stok Habis'}
                    </button>
                </div>
            </div>
        </Card>
    );
};

// --- CartSidebar ---
const generateWhatsAppMessage = (cart) => {
    let message = `Halo ${COMPANY_NAME}, saya mau pesan:\n`;
    let total = 0;
    cart.forEach(item => {
        message += `- ${item.name} (${item.quantity} ${item.unit || 'pcs'})\n`;
        total += item.price * item.quantity;
    });
    message += `\nTotal perkiraan: Rp ${total.toLocaleString('id-ID')}\n`;
    message += `\nMohon info ketersediaan dan pengiriman. Terima kasih.`;
    return encodeURIComponent(message);
};
export const CartSidebar = ({ isOpen, onClose }) => {
    const { cart, updateCartQuantity, removeFromCart, cartTotal } = useAppContext();
    const handleCheckout = () => {
        const message = generateWhatsAppMessage(cart);
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
    };
    return (
        <>
            <div 
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            ></div>
            <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-lg z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center p-4 border-b">
                        <h2 className="text-xl font-semibold">Keranjang Belanja</h2>
                        <button onClick={onClose} className="p-2 text-gray-500 hover:text-gray-800">&times;</button>
                    </div>
                    {cart.length === 0 ? (
                        <div className="flex-grow flex items-center justify-center"><p className="text-gray-500">Keranjang Anda kosong.</p></div>
                    ) : (
                        <div className="flex-grow overflow-y-auto p-4 space-y-4">
                            {cart.map(item => (
                                <div key={item.id} className="flex items-center space-x-4">
                                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-md object-cover"/>
                                    <div className="flex-grow">
                                        <h3 className="font-semibold">{item.name}</h3>
                                        <p className="text-sm text-gray-500">Rp {item.price.toLocaleString('id-ID')}</p>
                                        <div className="flex items-center mt-2">
                                            <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)} className="px-2 py-1 border rounded-l">-</button>
                                            <span className="px-3 py-1 border-t border-b">{item.quantity}</span>
                                            <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="px-2 py-1 border rounded-r">+</button>
                                        </div>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="p-4 border-t">
                        <div className="flex justify-between font-semibold text-lg mb-4">
                            <span>Total</span>
                            <span>Rp {cartTotal.toLocaleString('id-ID')}</span>
                        </div>
                        <button
    onClick={handleCheckout} 
    disabled={cart.length === 0}
    className="w-full bg-green-700 text-white font-bold py-3 rounded-md hover:bg-green-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
>
    Pesan Sekarang via WhatsApp
</button>
                    </div>
                </div>
            </div>
        </>
    );
};