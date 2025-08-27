// File: src/pages/PublicPages.jsx (Versi Lengkap dan Final)

import React, { useState, useMemo } from 'react';
import { Link, Routes, Route, useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext.jsx';
import { ProductCard } from '../components/PublicComponents.jsx';
import { ProductCategory, ProductAvailability } from '../types.js';
import { Button, Card, Input } from '../components/ui.jsx';
import { COMPANY_NAME, WHATSAPP_NUMBER } from '../constants.js';


// --- HomePage (Versi Landing Page) ---
export const HomePage = () => {
    const { products } = useAppContext();
    const highlightedProducts = products.filter(p => p.availability === ProductAvailability.Tersedia).slice(0, 3);

    return (
        <div>
            {/* Bagian 1: Hero Section */}
            <section className="bg-green-50">
                <div className="container mx-auto px-6 pt-16 pb-20 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-green-800 leading-tight">
                        Segar dari Kebun, <br className="hidden md:block" /> Sehat untuk Anda
                    </h1>
                    <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
                        Nikmati kualitas terbaik dari pertanian organik terintegrasi, langsung ke meja makan Anda.
                    </p>
                    <div className="mt-8">
                        <Link 
    to="/produk" 
    className="bg-white text-green-800 hover:bg-green-800 hover:text-white font-bold text-lg w-full sm:w-auto px-8 py-3 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent"
>
    Lihat Katalog
</Link>
                    </div>
                </div>
            </section>

            {/* Bagian 2: Tiga Pilar Keunggulan */}
            <section className="pt-16 pb-16 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">100% Organik</h3>
                            <p className="text-gray-600">Dibudidayakan alami tanpa pestisida kimia, menjamin kesegaran dan nutrisi terbaik.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 20h5v-5M20 4h-5v5" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Sistem Terintegrasi</h3>
                            <p className="text-gray-600">Model pertanian berkelanjutan yang ramah lingkungan dari hulu hingga hilir.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/></svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Pesan & Kirim</h3>
                            <p className="text-gray-600">Pesan dengan mudah via WhatsApp. Kami siap antar langsung ke lokasi Anda.</p>
                        </div>
                    </div>
                </div>
            </section>

            {highlightedProducts.length > 0 && (
                <section className="pt-16 pb-16 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Produk Pilihan Kami</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {highlightedProducts.map(product => <ProductCard key={product.id} product={product} />)}
                        </div>
                        <div className="text-center mt-12">
                            <Link to="/produk">
                                <Button variant="secondary" className="text-lg px-10 py-3 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                                    Jelajahi Semua Produk &rarr;
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            <section className="bg-green-700">
                <div className="container mx-auto px-6 py-16 text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">Siap Memulai Gaya Hidup Sehat?</h2>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Link 
    to="/produk" 
    className="bg-white text-green-800 hover:bg-gray-200 font-bold text-lg w-full sm:w-auto px-8 py-3 rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
>
    Lihat Katalog
</Link>
                        <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
                            <Button variant="secondary" className="text-lg w-full sm:w-auto px-8 py-3 font-bold bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-700">Hubungi via WhatsApp</Button>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

// --- ProductsPage (Dengan Kategori Wrapping) ---
export const ProductsPage = () => {
    const { products } = useAppContext();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const filteredProducts = useMemo(() => {
        if (selectedCategory === 'all') return products;
        return products.filter(p => p.category === selectedCategory);
    }, [products, selectedCategory]);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-center mb-8">Katalog Produk</h1>
            <div className="flex justify-center mb-12">
                <div className="flex flex-wrap justify-center gap-2 p-2 bg-gray-100 rounded-xl">
                    <button onClick={() => setSelectedCategory('all')} className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200 ${selectedCategory === 'all' ? 'bg-white text-green-700 shadow' : 'text-gray-600 hover:bg-gray-200'}`}>Semua</button>
                    {Object.values(ProductCategory).map(cat => (
                         <button key={cat} onClick={() => setSelectedCategory(cat)} className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200 ${selectedCategory === cat ? 'bg-white text-green-700 shadow' : 'text-gray-600 hover:bg-gray-200'}`}>{cat}</button>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredProducts.map(product => ( <ProductCard key={product.id} product={product} /> ))}
            </div>
        </div>
    );
};

// --- Article Pages (Versi Sempurna) ---
const ArticlesListPage = () => {
    const { articles } = useAppContext();
    const sortedArticles = articles.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800">Artikel & Berita</h1>
        {sortedArticles.length === 0 ? (
            <div className="text-center py-16 text-gray-500"><p>Belum ada artikel yang dipublikasikan.</p></div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedArticles.map(article => (
                    <Link to={`/artikel/${article.id}`} key={article.id} className="group">
                        <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2">
                            <div className="overflow-hidden"><img src={article.imageUrl} alt={article.title} className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"/></div>
                            <div className="p-6 flex flex-col flex-grow">
                                <p className="text-sm text-green-600 font-semibold mb-2">{new Date(article.publishDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-700 transition-colors">{article.title}</h3>
                                <p className="mt-3 text-gray-600 flex-grow text-base">{article.content.substring(0, 120)}...</p>
                                <span className="mt-4 font-bold text-green-600 self-start">Baca Selengkapnya &rarr;</span>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        )}
      </div>
    );
};

const ArticleDetailPage = () => {
    const { id } = useParams();
    const { articles } = useAppContext();
    const article = articles.find(a => a.id === id);

    if (!article) {
        return ( <div className="text-center py-20"><h2 className="text-2xl font-bold mb-4">Artikel tidak ditemukan.</h2><Link to="/artikel" className="text-green-600 hover:underline font-semibold">&larr; Kembali ke semua artikel</Link></div> );
    }

    return (
        <div className="bg-white py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                <div className="mb-8"><Link to="/artikel" className="text-green-600 hover:underline font-semibold">&larr; Kembali ke Semua Artikel</Link></div>
                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">{article.title}</h1>
                <p className="text-gray-500 mb-8 text-lg">Dipublikasikan pada {new Date(article.publishDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <img src={article.imageUrl} alt={article.title} className="w-full aspect-video object-cover rounded-xl mb-10 shadow-lg"/>
                <div className="prose prose-lg lg:prose-xl max-w-none text-gray-800 prose-headings:font-bold prose-headings:text-gray-900 prose-p:leading-relaxed">
    
    {/* [PERBAIKAN] Gunakan div dengan whitespace-pre-wrap */}
    <div className="whitespace-pre-wrap">{article.content}</div>

</div>
            </div>
        </div>
    );
};

// --- ArticlesRouter (SANGAT PENTING ADA DI SINI) ---
export const ArticlesRouter = () => (
    <Routes>
        <Route index element={<ArticlesListPage />} />
        <Route path=":id" element={<ArticleDetailPage />} />
    </Routes>
);

// --- AboutPage ---
export const AboutPage = () => {
    return (
        <div className="bg-white py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <h1 className="text-4xl font-bold text-center mb-8">Tentang {COMPANY_NAME}</h1>
                <img src="https://res.cloudinary.com/dnci7vkv4/image/upload/v1756015488/profil_1_lir68c.jpg" alt="Kebun GS Organik" className="w-full h-auto object-cover rounded-lg mb-8"/>
                <div className="prose lg:prose-lg max-w-none text-gray-700">
                    <p><strong>GS Organik</strong> lahir dari sebuah visi untuk menciptakan sistem pangan yang tidak hanya sehat bagi konsumen, tetapi juga ramah bagi lingkungan. Kami percaya bahwa alam memiliki kebijaksanaannya sendiri, dan tugas kami adalah bekerja selaras dengannya.</p>
                    <p>Konsep inti kami adalah <strong>pertanian terintegrasi</strong>. Ini adalah sebuah sistem loop tertutup di mana setiap elemen saling mendukung. Limbah dari satu area menjadi sumber daya bagi area lain...</p>
                    <h2 className="text-2xl font-bold mt-8">Visi & Misi Kami</h2>
                    <p><strong>Visi:</strong> Menjadi penyedia produk organik terdepan yang mengedukasi masyarakat tentang pentingnya pertanian berkelanjutan.</p>
                    <p><strong>Misi:</strong></p>
                    <ul><li>Menghasilkan produk organik berkualitas tinggi tanpa menggunakan pestisida dan pupuk kimia.</li><li>Mengembangkan dan mempraktikkan model pertanian terintegrasi yang efisien dan ramah lingkungan.</li><li>Bermitra dengan petani lokal untuk meningkatkan kesejahteraan dan menyebarkan praktik pertanian yang baik.</li><li>Menyediakan platform bagi konsumen untuk mendapatkan akses mudah ke pangan sehat dan informasi yang transparan.</li></ul>
                </div>
            </div>
        </div>
    );
};

// --- ContactPage ---
export const ContactPage = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-center mb-12">Hubungi Kami</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Informasi Kontak</h2>
                    <div className="space-y-4 text-gray-700">
                        <p><strong>Alamat:</strong><br />Jl. Nomelaktosi, Matani, Ds. Penfui Timur, Kec. Kupang Tengah, Kab. Kupang NTT</p>
                        <p><strong>Telepon:</strong><br />+62 821-4579-9141</p>
                        <p><strong>Email:</strong><br />info@gsorganik.com</p>
                    </div>
                    <div className="mt-8"><Button onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank')} className="w-full md:w-auto">Hubungi via WhatsApp</Button></div>
                </div>
                <div>
                     <h2 className="text-2xl font-semibold mb-4">Lokasi Kami</h2>
                     <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.909282664035!2d123.69028999999999!3d-10.162348999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2c5683f6acba616b%3A0xf84662a49d37367e!2sGS%20Organik!5e1!3m2!1sid!2sid!4v1756007658145!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy" title="Google Maps Location"></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};