// File: src/pages/AdminPages.jsx (VERSI FINAL - LAYOUT BARU DENGAN PENCARIAN)

import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext.jsx';
import { ProductCategory, ProductAvailability, ColdStorageStatus } from '../types.js';
import { Button, Card, Input, Modal, Select, Textarea } from '../components/ui.jsx';
import { StatCard } from '../components/AdminComponents.jsx';
import { Pencil, Trash2, Plus, Download, Search } from 'lucide-react';

// (Helper functions tidak berubah)
const formatDateForInput = (date) => { if (!date) return ''; return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0]; };
const downloadCSV = (data, filename) => { if (data.length === 0) { alert("Tidak ada data untuk diunduh."); return; } const headers = Object.keys(data[0]); const csvContent = [ headers.join(','), ...data.map(row => headers.map(header => { let cell = row[header] === null || row[header] === undefined ? '' : String(row[header]); cell = cell.replace(/"/g, '""'); if (/[",\n]/.test(cell)) { cell = `"${cell}"`; } return cell; }).join(',')) ].join('\n'); const blob = new Blob([`\uFEFF${csvContent}`], { type: 'text/csv;charset=utf-8;' }); const link = document.createElement("a"); if (link.download !== undefined) { const url = URL.createObjectURL(blob); link.setAttribute("href", url); link.setAttribute("download", filename); link.style.visibility = 'hidden'; document.body.appendChild(link); link.click(); document.body.removeChild(link); } };

// --- DashboardPage ---
export const DashboardPage = () => {
    const { sales, expenses, products } = useAppContext();
    const thisMonth = new Date().getMonth();
    const totalSalesThisMonth = sales.filter(s => new Date(s.date).getMonth() === thisMonth).reduce((sum, s) => sum + s.totalPrice, 0);
    const totalExpensesThisMonth = expenses.filter(e => new Date(e.date).getMonth() === thisMonth).reduce((sum, e) => sum + e.amount, 0);
    const availableProductsCount = products.filter(p => p.availability === ProductAvailability.Tersedia).length;
    const recentTransactions = [...sales.map(s => ({ type: 'Penjualan', ...s })), ...expenses.map(e => ({ type: 'Pengeluaran', ...e }))].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);
    const handleDownloadAllTransactions = () => { const allTransactions = [ ...sales.map(s => ({ type: 'Penjualan', ...s })), ...expenses.map(e => ({ type: 'Pengeluaran', ...e })) ].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()); if (allTransactions.length === 0) { alert("Tidak ada data transaksi untuk diunduh."); return; } const dataToDownload = allTransactions.map(t => ({ Tanggal: new Date(t.date).toLocaleString('id-ID'), Tipe: t.type, Deskripsi: t.type === 'Penjualan' ? t.items.map((i) => `${i.name} (x${i.quantity})`).join('; ') : t.description, Jumlah: t.type === 'Penjualan' ? t.totalPrice : t.amount, })); downloadCSV(dataToDownload, 'semua_transaksi.xls'); };
    return (
        <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard title="Penjualan Bulan Ini" value={`Rp ${totalSalesThisMonth.toLocaleString('id-ID')}`} description="Total dari semua transaksi penjualan." />
                <StatCard title="Pengeluaran Bulan Ini" value={`Rp ${totalExpensesThisMonth.toLocaleString('id-ID')}`} description="Total dari semua catatan pengeluaran." />
                <StatCard title="Produk Tersedia" value={availableProductsCount} description="Jumlah produk dengan status 'Tersedia'." />
            </div>
            <Card>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 border-b">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2 sm:mb-0">Riwayat Transaksi</h2>
                    <Button onClick={handleDownloadAllTransactions} variant="secondary" className="px-3 py-1.5 text-xs font-semibold w-full sm:w-auto">Download Laporan (Excel)</Button>
                </div>
                <div className="md:hidden p-4 space-y-4 bg-gray-50">
                    {recentTransactions.map(t => ( <div key={t.id} className="bg-white p-4 rounded-lg shadow border"><div className="flex justify-between items-start"><p className="font-semibold text-gray-800 flex-1 pr-2">{t.type === 'Penjualan' ? t.items.map(i => i.name).join(', ') : t.description}</p><span className={`flex-shrink-0 px-2 py-1 text-xs font-semibold rounded-full ${t.type === 'Penjualan' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{t.type}</span></div><div className="flex justify-between items-end mt-2"><p className="text-sm text-gray-500">{new Date(t.date).toLocaleDateString('id-ID')}</p><p className="font-semibold text-gray-900">Rp {(t.type === 'Penjualan' ? t.totalPrice : t.amount).toLocaleString('id-ID')}</p></div></div> ))}
                </div>
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-xs text-gray-600 uppercase"><tr><th scope="col" className="px-6 py-3 font-semibold">Tanggal</th><th scope="col" className="px-6 py-3 font-semibold">Tipe</th><th scope="col" className="px-6 py-3 font-semibold">Deskripsi/Item</th><th scope="col" className="px-6 py-3 font-semibold">Jumlah</th></tr></thead>
                        <tbody className="divide-y divide-gray-200">{recentTransactions.map(t => (<tr key={t.id} className="bg-white"><td className="px-6 py-4 text-gray-700">{new Date(t.date).toLocaleDateString('id-ID')}</td><td className="px-6 py-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${t.type === 'Penjualan' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{t.type}</span></td><td className="px-6 py-4 text-gray-700">{t.type === 'Penjualan' ? t.items.map(i => i.name).join(', ') : t.description}</td><td className="px-6 py-4 font-semibold text-gray-800">Rp {(t.type === 'Penjualan' ? t.totalPrice : t.amount).toLocaleString('id-ID')}</td></tr>))}</tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

// --- ManageProductsPage ---
const ProductForm = ({ product, onSave, onCancel }) => {
    const [formData, setFormData] = useState({ name: product?.name || '', category: product?.category || ProductCategory.Hortikultura, description: product?.description || '', price: product?.price || 0, unit: product?.unit || '', imageUrl: product?.imageUrl || 'https://picsum.photos/400/300', availability: product?.availability || ProductAvailability.Tersedia });
    const handleChange = (e) => { const { name, value } = e.target; setFormData(prev => ({...prev, [name]: value})); };
    const handleSubmit = (e) => { e.preventDefault(); const dataToSave = { ...formData, price: Number(formData.price) }; if (product && product.id) { dataToSave.id = product.id; } onSave(dataToSave); };
    return ( <form onSubmit={handleSubmit} className="space-y-4"><Input label="Nama Produk" name="name" value={formData.name} onChange={handleChange} required /><Select label="Kategori" name="category" value={formData.category} onChange={handleChange} required>{Object.values(ProductCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}</Select><Textarea label="Deskripsi Singkat" name="description" value={formData.description} onChange={handleChange} rows={3} required /><div className="grid grid-cols-2 gap-4"><Input label="Harga" name="price" type="number" value={formData.price} onChange={handleChange} required /><Input label="Satuan (cth: ikat, kg)" name="unit" value={formData.unit} onChange={handleChange} required /></div><Input label="URL Gambar" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required /><Select label="Status Ketersediaan" name="availability" value={formData.availability} onChange={handleChange} required>{Object.values(ProductAvailability).map(avail => <option key={avail} value={avail}>{avail}</option>)}</Select><div className="flex justify-end space-x-3 pt-4"><button type="button" onClick={onCancel} className="bg-slate-500 hover:bg-slate-600 text-white font-bold px-4 py-2 rounded-md transition-colors">Batal</button><button type="submit" className="bg-black hover:bg-gray-800 text-white font-bold px-4 py-2 rounded-md transition-colors">Simpan</button></div></form> );
};
export const ManageProductsPage = () => {
    const { products, addProduct, updateProduct, deleteProduct } = useAppContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(undefined);
    const [searchQuery, setSearchQuery] = useState('');
    const handleOpenModal = (product) => { setEditingProduct(product); setIsModalOpen(true); };
    const handleCloseModal = () => { setEditingProduct(undefined); setIsModalOpen(false); };
    const handleSave = (productData) => { if (productData.id) { updateProduct(productData); } else { addProduct(productData); } handleCloseModal(); };
    const handleDownloadProducts = () => { const dataToDownload = products.map(({ id, name, category, description, price, unit, imageUrl, availability }) => ({ ID: id, Nama: name, Kategori: category, Deskripsi: description, Harga: price, Satuan: unit, URLGambar: imageUrl, Ketersediaan: availability, })); downloadCSV(dataToDownload, 'daftar_produk.xls'); };
    const filteredProducts = useMemo(() => products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())), [products, searchQuery]);
    return (
        <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6">Manajemen Produk</h1>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
                <div className="relative w-full md:max-w-xs">
                    <Input type="text" placeholder="Cari produk..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10"/>
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <button onClick={handleDownloadProducts} className="text-gray-500 hover:text-gray-800 transition-colors" aria-label="Download Laporan"><Download size={24} /></button>
                    <button onClick={() => handleOpenModal()} className="flex items-center justify-center gap-2 bg-green-700 text-white font-bold px-4 py-2 rounded-md hover:bg-green-800 transition-colors w-full md:w-auto"><Plus size={20} /><span>Tambah Produk</span></button>
                </div>
            </div>
            <div className="md:hidden space-y-3">
                {filteredProducts.map(p => (
                    <div key={p.id} className="bg-white p-3 rounded-lg shadow border">
                        <div className="flex justify-between items-start"><h3 className="text-base font-bold text-gray-800 pr-2">{p.name}</h3><span className={`flex-shrink-0 text-xs font-semibold px-2 py-1 rounded-full ${ p.availability === 'Tersedia' ? 'bg-green-100 text-green-800' : p.availability === 'Habis' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800' }`}>{p.availability}</span></div>
                        <div className="flex justify-between items-center text-xs mt-1">
                            <p className="text-gray-500">{p.category}</p>
                            <p className="font-semibold text-gray-600">Rp {p.price.toLocaleString('id-ID')} / {p.unit}</p>
                        </div>
                        <div className="flex justify-end space-x-1 mt-3 border-t pt-2">
                            <button onClick={() => handleOpenModal(p)} className="p-2 text-slate-500 hover:bg-slate-200 rounded-full" aria-label="Edit Produk"><Pencil size={16} /></button>
                            <button onClick={() => deleteProduct(p.id)} className="p-2 text-red-500 hover:bg-red-100 rounded-full" aria-label="Hapus Produk"><Trash2 size={16} /></button>
                        </div>
                    </div>
                ))}
            </div>
            <Card className="hidden md:block">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                        <thead className="bg-gray-50 text-gray-600 uppercase">
                            <tr><th scope="col" className="px-4 py-3 font-semibold">Nama</th><th scope="col" className="px-4 py-3 font-semibold">Kategori</th><th scope="col" className="px-4 py-3 font-semibold">Harga</th><th scope="col" className="px-4 py-3 font-semibold">Status</th><th scope="col" className="px-4 py-3 font-semibold text-right">Aksi</th></tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredProducts.map(p => (
                                <tr key={p.id} className="bg-white">
                                    <td className="px-4 py-3 font-medium text-gray-800">{p.name}</td>
                                    <td className="px-4 py-3 text-gray-600">{p.category}</td>
                                    <td className="px-4 py-3 text-gray-600">Rp {p.price.toLocaleString('id-ID')} / {p.unit}</td>
                                    <td className="px-4 py-3 text-gray-600">{p.availability}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-end space-x-1">
                                            <button onClick={() => handleOpenModal(p)} className="p-2 text-slate-500 hover:bg-slate-200 rounded-full" aria-label="Edit Produk"><Pencil size={16} /></button>
                                            <button onClick={() => deleteProduct(p.id)} className="p-2 text-red-500 hover:bg-red-100 rounded-full" aria-label="Hapus Produk"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}>
                <ProductForm product={editingProduct} onSave={handleSave} onCancel={handleCloseModal} />
            </Modal>
        </div>
    );
};

// --- ManageSalesPage ---
export const ManageSalesPage = () => {
    const { products, sales, addSale } = useAppContext();
    const [cart, setCart] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const availableProducts = products.filter(p => p.availability === ProductAvailability.Tersedia);
    const filteredProducts = availableProducts.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const handleCartItemChange = (productId, field, value) => { if (field === 'price' && value < 0) return; if (field === 'quantity' && value <= 0) { setCart(prevCart => prevCart.filter(item => item.productId !== productId)); return; } setCart(prevCart => prevCart.map(item => item.productId === productId ? { ...item, [field]: value } : item)); };
    const handleAddProduct = (productId) => { const product = products.find(p => p.id === productId); if (!product) { console.error("Produk tidak ditemukan!"); return; } const existingItem = cart.find(item => item.productId === productId); if (existingItem) { handleCartItemChange(productId, 'quantity', existingItem.quantity + 1); } else { setCart(prevCart => [...prevCart, { productId: product.id, name: product.name, quantity: 1, price: product.price }]); } };
    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const handleRecordSale = () => { if (cart.length > 0) { addSale(cart, totalPrice); setCart([]); setSearchQuery(''); } };
    const handleDownloadSales = () => { const dataToDownload = sales.map(s => ({ ID: s.id, Tanggal: new Date(s.date).toLocaleString('id-ID'), Items: s.items.map(i => `${i.name} (x${i.quantity} @ Rp ${i.price.toLocaleString('id-ID')})`).join('; '), TotalHarga: s.totalPrice, })); downloadCSV(dataToDownload, 'riwayat_penjualan.xls'); };
    return (
        <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6">Pencatatan Penjualan</h1>
            <Card className="p-4 sm:p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Buat Transaksi Baru</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-2">Pilih Produk</h3>
                        <div className="mb-4"><Input type="text" placeholder="Ketik untuk mencari produk..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} /></div>
                        <div className="space-y-2 max-h-80 overflow-y-auto border p-2 rounded">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(p => (
                                <div key={p.id} className="flex justify-between items-center p-2 hover:bg-gray-100 rounded">
                                    <div><p className="font-medium text-gray-800">{p.name}</p><p className="text-xs text-gray-600">Rp {p.price.toLocaleString('id-ID')}</p></div>
                                    <button onClick={() => handleAddProduct(p.id)} className="bg-black hover:bg-gray-800 text-white font-bold rounded-md px-3 py-1 leading-none transition-colors">+</button>
                                </div>
                            ))
                        ) : ( <div className="text-center text-gray-500 py-4">Produk tidak ditemukan.</div> )}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-2">Item Terjual</h3>
                         {cart.length === 0 ? ( <div className="text-center text-gray-500 py-10 border rounded-lg">Belum ada produk ditambahkan.</div> ) : (
                            <div className="space-y-3">
                                {cart.map(item => (
                                    <div key={item.productId} className="flex justify-between items-start border-b pb-3">
                                        <div className="flex-grow">
                                            <p className="font-semibold text-gray-800">{item.name}</p>
                                            <div className="flex items-center mt-1"><span className="text-sm text-gray-600 mr-1">Rp</span><input type="number" value={item.price} onChange={(e) => handleCartItemChange(item.productId, 'price', Number(e.target.value))} className="w-24 px-2 py-1 border rounded-md text-sm text-gray-800 focus:ring-brand-green-500 focus:border-brand-green-500"/></div>
                                             <p className="text-sm text-gray-700 mt-2 font-semibold">Subtotal: Rp {(item.price * item.quantity).toLocaleString('id-ID')}</p>
                                        </div>
                                        <div className="flex flex-col items-end ml-2">
                                            <div className="flex items-center space-x-1"><button onClick={() => handleCartItemChange(item.productId, 'quantity', item.quantity - 1)} className="w-6 h-6 border rounded font-bold text-gray-700">-</button><span className="w-8 text-center font-semibold text-gray-800">{item.quantity}</span><button onClick={() => handleCartItemChange(item.productId, 'quantity', item.quantity + 1)} className="w-6 h-6 border rounded font-bold text-gray-700">+</button></div>
                                            <button onClick={() => handleCartItemChange(item.productId, 'quantity', 0)} className="text-red-500 hover:text-red-700 mt-4" aria-label="Hapus item"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                         )}
                        <hr className="my-4" />
                        <div className="flex justify-between font-bold text-lg text-gray-800"><span>Total</span><span>Rp {totalPrice.toLocaleString('id-ID')}</span></div>
                        <button onClick={handleRecordSale} disabled={cart.length === 0} className="w-full mt-4 py-3 bg-green-700 text-white font-bold text-lg rounded-md shadow-md hover:bg-green-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">Catat Penjualan</button>
                    </div>
                </div>
            </Card>
            <div className="mt-12">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
                    <h2 className="text-xl font-semibold text-gray-700">Riwayat Penjualan</h2>
                    <button onClick={handleDownloadSales} className="text-gray-500 hover:text-gray-800 transition-colors" aria-label="Download Laporan"><Download size={24} /></button>
                </div>
                <div className="md:hidden space-y-3">
                    {sales.map(s => (
                        <div key={s.id} className="bg-white p-3 rounded-lg shadow border">
                            <div className="flex justify-between items-start font-mono text-xs text-gray-500"><span>{s.id}</span><span>{new Date(s.date).toLocaleDateString('id-ID')}</span></div>
                            <p className="mt-2 text-sm text-gray-700">{s.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}</p>
                            <p className="mt-1 text-right font-semibold text-base text-gray-900">Rp {s.totalPrice.toLocaleString('id-ID')}</p>
                        </div>
                    ))}
                </div>
                <Card className="hidden md:block">
                    <div className="overflow-x-auto"><table className="w-full text-xs text-left"><thead className="bg-gray-50 text-gray-600 uppercase"><tr><th className="px-4 py-3 font-semibold">ID Transaksi</th><th className="px-4 py-3 font-semibold">Tanggal</th><th className="px-4 py-3 font-semibold">Items</th><th className="px-4 py-3 font-semibold">Total</th></tr></thead><tbody className="divide-y divide-gray-200">{sales.map(s => (<tr key={s.id} className="bg-white"><td className="px-4 py-3 font-mono text-gray-600">{s.id}</td><td className="px-4 py-3 text-gray-600">{new Date(s.date).toLocaleString('id-ID')}</td><td className="px-4 py-3 text-gray-600">{s.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}</td><td className="px-4 py-3 font-semibold text-gray-800">Rp {s.totalPrice.toLocaleString('id-ID')}</td></tr>))}</tbody></table></div>
                </Card>
            </div>
        </div>
    );
};

// --- ManageExpensesPage ---
export const ManageExpensesPage = () => {
    const { expenses, addExpense } = useAppContext();
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Operasional');
    const [amount, setAmount] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const handleSubmit = (e) => { e.preventDefault(); addExpense({ description, category, amount: Number(amount) }); setDescription(''); setCategory('Operasional'); setAmount(''); };
    const handleDownloadExpenses = () => { const dataToDownload = expenses.map(e => ({ ID: e.id, Tanggal: new Date(e.date).toLocaleString('id-ID'), Deskripsi: e.description, Kategori: e.category, Jumlah: e.amount, })); downloadCSV(dataToDownload, 'riwayat_pengeluaran.xls'); };
    const filteredExpenses = useMemo(() => expenses.filter(e => e.description.toLowerCase().includes(searchQuery.toLowerCase())), [expenses, searchQuery]);
    return (
        <div>
             <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6">Pencatatan Pengeluaran</h1>
             <Card className="p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Catat Pengeluaran Baru</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input label="Deskripsi" value={description} onChange={e => setDescription(e.target.value)} required />
                    <Input label="Kategori" value={category} onChange={e => setCategory(e.target.value)} placeholder="cth: Pakan, Operasional" required />
                    <Input label="Jumlah Biaya" type="number" value={amount} onChange={e => setAmount(e.target.value)} required />
                    <button type="submit" className="w-full bg-green-700 text-white font-bold py-2 rounded-md shadow-md hover:bg-green-800 transition-colors disabled:bg-gray-400">Catat</button>
                </form>
             </Card>
             <div className="mt-12">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
                    <div className="relative w-full md:max-w-xs">
                        <Input type="text" placeholder="Cari deskripsi..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10"/>
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                    <button onClick={handleDownloadExpenses} className="text-gray-500 hover:text-gray-800 transition-colors" aria-label="Download Laporan"><Download size={24} /></button>
                </div>
                <div className="md:hidden space-y-3">
                    {filteredExpenses.map(e => (
                        <div key={e.id} className="bg-white p-3 rounded-lg shadow border">
                            <p className="font-semibold text-gray-800">{e.description}</p>
                            <p className="text-xs text-gray-500">{e.category}</p>
                            <div className="flex justify-between items-end mt-1">
                                <p className="text-xs text-gray-500">{new Date(e.date).toLocaleDateString('id-ID')}</p>
                                <p className="font-semibold text-base text-gray-900">Rp {e.amount.toLocaleString('id-ID')}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <Card className="hidden md:block">
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left">
                            <thead className="bg-gray-50 text-gray-600 uppercase">
                                <tr><th className="px-4 py-3 font-semibold">Tanggal</th><th className="px-4 py-3 font-semibold">Deskripsi</th><th className="px-4 py-3 font-semibold">Kategori</th><th className="px-4 py-3 font-semibold">Jumlah</th></tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredExpenses.map(e => (
                                    <tr key={e.id} className="bg-white">
                                        <td className="px-4 py-3 text-gray-600">{new Date(e.date).toLocaleString('id-ID')}</td>
                                        <td className="px-4 py-3 text-gray-800 font-medium">{e.description}</td>
                                        <td className="px-4 py-3 text-gray-600">{e.category}</td>
                                        <td className="px-4 py-3 font-semibold text-gray-800">Rp {e.amount.toLocaleString('id-ID')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                 </Card>
             </div>
        </div>
    );
};

// --- ManageColdStoragePage ---
export const ManageColdStoragePage = () => {
    const { coldStorage, addColdStorageEntry, updateColdStorageEntry } = useAppContext();
    const [formData, setFormData] = useState({ partnerName: '', productName: '', quantity: '', unit: 'kg' });
    const [searchQuery, setSearchQuery] = useState('');
    const handleChange = (e) => { setFormData({...formData, [e.target.name]: e.target.value }); };
    const handleSubmit = (e) => { e.preventDefault(); addColdStorageEntry({ ...formData, quantity: Number(formData.quantity) }); setFormData({ partnerName: '', productName: '', quantity: '', unit: 'kg' }); };
    const handleMarkAsTaken = (entry) => { updateColdStorageEntry({ ...entry, status: ColdStorageStatus.Diambil, exitDate: new Date() }); };
    const handleDownloadColdStorage = () => { const dataToDownload = coldStorage.map(cs => ({ ID: cs.id, NamaPetani: cs.partnerName, NamaProduk: cs.productName, Jumlah: cs.quantity, Satuan: cs.unit, TanggalMasuk: new Date(cs.entryDate).toLocaleDateString('id-ID'), TanggalKeluar: cs.exitDate ? new Date(cs.exitDate).toLocaleDateString('id-ID') : '-', Status: cs.status, })); downloadCSV(dataToDownload, 'riwayat_cold_storage.xls'); };
    const filteredColdStorage = useMemo(() => coldStorage.filter(cs => cs.partnerName.toLowerCase().includes(searchQuery.toLowerCase()) || cs.productName.toLowerCase().includes(searchQuery.toLowerCase())), [coldStorage, searchQuery]);
    return (
        <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6">Manajemen Cold Storage</h1>
            <Card className="p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Catat Penitipan Baru</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                    <div className="lg:col-span-1"><Input label="Nama Petani Mitra" name="partnerName" value={formData.partnerName} onChange={handleChange} required /></div>
                    <div className="lg:col-span-1"><Input label="Nama Produk Titipan" name="productName" value={formData.productName} onChange={handleChange} required /></div>
                    <div className="lg:col-span-1"><Input label="Jumlah" type="number" name="quantity" value={formData.quantity} onChange={handleChange} required /></div>
                    <div className="lg:col-span-1"><Input label="Satuan" name="unit" value={formData.unit} onChange={handleChange} required /></div>
                    <div className="lg:col-span-1"><button type="submit" className="w-full bg-green-700 text-white font-bold py-2 rounded-md shadow-md hover:bg-green-800 transition-colors h-10">Catat</button></div>
                </form>
            </Card>
            <div className="mt-12">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
                    <div className="relative w-full md:max-w-xs">
                        <Input type="text" placeholder="Cari petani/produk..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10"/>
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                    <button onClick={handleDownloadColdStorage} className="text-gray-500 hover:text-gray-800 transition-colors" aria-label="Download Laporan"><Download size={24} /></button>
                </div>
                <div className="md:hidden space-y-3">
                    {filteredColdStorage.map(cs => (
                        <div key={cs.id} className="bg-white p-3 rounded-lg shadow border">
                            <div className="flex justify-between items-start"><p className="text-base font-bold text-gray-800">{cs.partnerName}</p><span className="text-xs font-semibold text-gray-600">{cs.status}</span></div>
                            <p className="text-sm text-gray-500">{cs.productName} - {cs.quantity} {cs.unit}</p>
                            <div className="text-xs text-gray-500 mt-1"><span>Masuk: {new Date(cs.entryDate).toLocaleDateString('id-ID')}</span> | <span>Keluar: {cs.exitDate ? new Date(cs.exitDate).toLocaleDateString('id-ID') : '-'}</span></div>
                            {cs.status === ColdStorageStatus.Disimpan && (<div className="flex justify-end mt-2 border-t pt-2"><Button onClick={() => handleMarkAsTaken(cs)} className="text-xs px-3 py-1.5 font-semibold">Tandai Diambil</Button></div>)}
                        </div>
                    ))}
                </div>
                <Card className="hidden md:block">
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left">
                            <thead className="bg-gray-50 text-gray-600 uppercase">
                                <tr><th className="px-4 py-3 font-semibold">Petani</th><th className="px-4 py-3 font-semibold">Produk</th><th className="px-4 py-3 font-semibold">Jumlah</th><th className="px-4 py-3 font-semibold">Tgl Masuk</th><th className="px-4 py-3 font-semibold">Tgl Keluar</th><th className="px-4 py-3 font-semibold">Status</th><th className="px-4 py-3 font-semibold text-right">Aksi</th></tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredColdStorage.map(cs => (
                                    <tr key={cs.id} className="bg-white">
                                        <td className="px-4 py-3 font-medium text-gray-800">{cs.partnerName}</td>
                                        <td className="px-4 py-3 text-gray-600">{cs.productName}</td>
                                        <td className="px-4 py-3 text-gray-600">{cs.quantity} {cs.unit}</td>
                                        <td className="px-4 py-3 text-gray-600">{new Date(cs.entryDate).toLocaleDateString('id-ID')}</td>
                                        <td className="px-4 py-3 text-gray-600">{cs.exitDate ? new Date(cs.exitDate).toLocaleDateString('id-ID') : '-'}</td>
                                        <td className="px-4 py-3 text-gray-600">{cs.status}</td>
                                        <td className="px-4 py-3 text-right">{cs.status === ColdStorageStatus.Disimpan && <Button onClick={() => handleMarkAsTaken(cs)} className="text-xs px-3 py-1.5 font-semibold">Tandai Diambil</Button>}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                 </Card>
            </div>
        </div>
    );
};

// --- ManageArticlesPage ---
const ArticleForm = ({ article, onSave, onCancel }) => {
    const [formData, setFormData] = useState({ title: article?.title || '', imageUrl: article?.imageUrl || 'https://picsum.photos/800/400', content: article?.content || '' });
    const handleChange = (e) => { setFormData({...formData, [e.target.name]: e.target.value}); };
    const handleSubmit = (e) => { e.preventDefault(); const dataToSave = { ...formData }; if (article && article.id) { dataToSave.id = article.id; } onSave(dataToSave); };
    return ( <form onSubmit={handleSubmit} className="space-y-4"><Input label="Judul Artikel" name="title" value={formData.title} onChange={handleChange} required /><Input label="URL Gambar Utama" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required /><Textarea label="Isi Konten" name="content" value={formData.content} onChange={handleChange} required rows={10} /><div className="flex justify-end space-x-3 pt-4"><button type="button" onClick={onCancel} className="bg-slate-500 hover:bg-slate-600 text-white font-bold px-4 py-2 rounded-md transition-colors">Batal</button><button type="submit" className="bg-black hover:bg-gray-800 text-white font-bold px-4 py-2 rounded-md transition-colors">Simpan Artikel</button></div></form> );
};
export const ManageArticlesPage = () => {
    const { articles, addArticle, updateArticle, deleteArticle } = useAppContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingArticle, setEditingArticle] = useState(undefined);
    const [searchQuery, setSearchQuery] = useState('');
    const handleOpenModal = (article) => { setEditingArticle(article); setIsModalOpen(true); };
    const handleCloseModal = () => { setEditingArticle(undefined); setIsModalOpen(false); };
    const handleSave = (articleData) => { if (articleData.id) { updateArticle(articleData); } else { addArticle(articleData); } handleCloseModal(); };
    const handleDownloadArticles = () => { const dataToDownload = articles.map(a => ({ ID: a.id, Judul: a.title, TanggalPublikasi: new Date(a.publishDate).toLocaleDateString('id-ID'), URLGambar: a.imageUrl, Konten: a.content, })); downloadCSV(dataToDownload, 'daftar_artikel.xls'); };
    const filteredArticles = useMemo(() => articles.filter(a => a.title.toLowerCase().includes(searchQuery.toLowerCase())), [articles, searchQuery]);
    return (
        <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
                <div className="relative w-full md:max-w-xs">
                    <Input type="text" placeholder="Cari judul artikel..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10"/>
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <button onClick={handleDownloadArticles} className="text-gray-500 hover:text-gray-800 transition-colors" aria-label="Download Laporan"><Download size={24} /></button>
                    <button onClick={() => handleOpenModal()} className="flex items-center justify-center gap-2 bg-green-700 text-white font-bold px-4 py-2 rounded-md hover:bg-green-800 transition-colors w-full md:w-auto"><Plus size={20} /><span>Tulis Artikel</span></button>
                </div>
            </div>
            <div className="md:hidden space-y-3">
                {filteredArticles.map(a => (
                    <div key={a.id} className="bg-white p-3 rounded-lg shadow border">
                        <p className="text-base font-bold text-gray-800">{a.title}</p>
                        <p className="text-xs text-gray-500 mt-1">Dipublikasikan pada {new Date(a.publishDate).toLocaleDateString('id-ID')}</p>
                        <div className="flex justify-end space-x-1 mt-2 border-t pt-2">
                            <button onClick={() => handleOpenModal(a)} className="p-2 text-slate-500 hover:bg-slate-200 rounded-full" aria-label="Edit Artikel"><Pencil size={16} /></button>
                            <button onClick={() => deleteArticle(a.id)} className="p-2 text-red-500 hover:bg-red-100 rounded-full" aria-label="Hapus Artikel"><Trash2 size={16} /></button>
                        </div>
                    </div>
                ))}
            </div>
             <Card className="hidden md:block">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                        <thead className="bg-gray-50 text-gray-600 uppercase">
                            <tr><th className="px-4 py-3 font-semibold">Judul</th><th className="px-4 py-3 font-semibold">Tanggal Publikasi</th><th className="px-4 py-3 font-semibold text-right">Aksi</th></tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredArticles.map(a => (
                                <tr key={a.id} className="bg-white">
                                    <td className="px-4 py-3 font-medium text-gray-800">{a.title}</td>
                                    <td className="px-4 py-3 text-gray-600">{new Date(a.publishDate).toLocaleDateString('id-ID')}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-end space-x-1">
                                            <button onClick={() => handleOpenModal(a)} className="p-2 text-slate-500 hover:bg-slate-200 rounded-full" aria-label="Edit Artikel"><Pencil size={16} /></button>
                                            <button onClick={() => deleteArticle(a.id)} className="p-2 text-red-500 hover:bg-red-100 rounded-full" aria-label="Hapus Artikel"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
             </Card>
             <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingArticle ? 'Edit Artikel' : 'Tulis Artikel Baru'}>
                <ArticleForm article={editingArticle} onSave={handleSave} onCancel={handleCloseModal} />
            </Modal>
        </div>
    );
};