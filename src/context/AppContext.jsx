// File: src/context/AppContext.jsx (Versi FINAL Sebenarnya - SEMUA MODUL TERHUBUNG)

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { db, auth } from '../lib/firebase.js';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [articles, setArticles] = useState([]);
    const [sales, setSales] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [coldStorage, setColdStorage] = useState([]);
    const [cart, setCart] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => { setIsAuthenticated(!!user); });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const productsData = await getDocs(collection(db, "products"));
                setProducts(productsData.docs.map(doc => ({ ...doc.data(), id: doc.id })));

                const articlesQuery = query(collection(db, "articles"), orderBy("publishDate", "desc"));
                const articlesData = await getDocs(articlesQuery);
                setArticles(articlesData.docs.map(doc => ({ ...doc.data(), id: doc.id, publishDate: doc.data().publishDate.toDate() })));
                
                const salesQuery = query(collection(db, "sales"), orderBy("date", "desc"));
                const salesData = await getDocs(salesQuery);
                setSales(salesData.docs.map(doc => ({ ...doc.data(), id: doc.id, date: doc.data().date.toDate() })));

                const expensesQuery = query(collection(db, "expenses"), orderBy("date", "desc"));
                const expensesData = await getDocs(expensesQuery);
                setExpenses(expensesData.docs.map(doc => ({ ...doc.data(), id: doc.id, date: doc.data().date.toDate() })));

                const coldStorageQuery = query(collection(db, "coldStorage"), orderBy("entryDate", "desc"));
                const coldStorageData = await getDocs(coldStorageQuery);
                setColdStorage(coldStorageData.docs.map(doc => ({ ...doc.data(), id: doc.id, entryDate: doc.data().entryDate.toDate(), exitDate: doc.data().exitDate ? doc.data().exitDate.toDate() : null })));

            } catch (err) {
                console.error("Error fetching initial data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const addProduct = async (productData) => {
        try {
            const docRef = await addDoc(collection(db, "products"), productData);
            setProducts(prev => [{ ...productData, id: docRef.id }, ...prev]);
        } catch (err) { console.error("Error adding product:", err); }
    };
    const updateProduct = async (updatedProduct) => {
        try {
            const productDocRef = doc(db, "products", updatedProduct.id);
            await updateDoc(productDocRef, updatedProduct);
            setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
        } catch (err) { console.error("Error updating product:", err); }
    };
    const deleteProduct = async (productId) => {
        try {
            const productDocRef = doc(db, "products", productId);
            await deleteDoc(productDocRef);
            setProducts(prev => prev.filter(p => p.id !== productId));
        } catch (err) { console.error("Error deleting product:", err); }
    };

    const addArticle = async (articleData) => {
        try {
            const dataWithTimestamp = { ...articleData, publishDate: serverTimestamp() };
            const docRef = await addDoc(collection(db, "articles"), dataWithTimestamp);
            const newArticle = { ...articleData, id: docRef.id, publishDate: new Date() };
            setArticles(prev => [newArticle, ...prev].sort((a, b) => b.publishDate - a.publishDate));
        } catch (err) { console.error("Error adding article:", err); }
    };
    const updateArticle = async (updatedArticle) => {
        try {
            const articleDocRef = doc(db, "articles", updatedArticle.id);
            const { id, ...dataToUpdate } = updatedArticle;
            await updateDoc(articleDocRef, dataToUpdate);
            setArticles(prev => prev.map(a => a.id === updatedArticle.id ? updatedArticle : a));
        } catch (err) { console.error("Error updating article:", err); }
    };
    const deleteArticle = async (articleId) => {
        try {
            const articleDocRef = doc(db, "articles", articleId);
            await deleteDoc(articleDocRef);
            setArticles(prev => prev.filter(a => a.id !== articleId));
        } catch (err) { console.error("Error deleting article:", err); }
    };
    
    const addSale = async (items, totalPrice) => {
        try {
            const saleData = { items, totalPrice, date: serverTimestamp() };
            const docRef = await addDoc(collection(db, "sales"), saleData);
            const newSale = { ...saleData, id: docRef.id, date: new Date() };
            setSales(prev => [newSale, ...prev]);
        } catch (err) { console.error("Error adding sale:", err); }
    };

    const addExpense = async (expenseData) => {
        try {
            const dataWithTimestamp = { ...expenseData, date: serverTimestamp() };
            const docRef = await addDoc(collection(db, "expenses"), dataWithTimestamp);
            const newExpense = { ...expenseData, id: docRef.id, date: new Date() };
            setExpenses(prev => [newExpense, ...prev]);
        } catch (err) { console.error("Error adding expense:", err); }
    };

    const addColdStorageEntry = async (entryData) => {
        try {
            const dataToSave = { ...entryData, status: 'Disimpan', entryDate: serverTimestamp(), exitDate: null };
            const docRef = await addDoc(collection(db, "coldStorage"), dataToSave);
            const newEntry = { ...dataToSave, id: docRef.id, entryDate: new Date() };
            setColdStorage(prev => [newEntry, ...prev]);
        } catch (err) { console.error("Error adding cold storage entry:", err); }
    };
    const updateColdStorageEntry = async (updatedEntry) => {
        try {
            const entryDocRef = doc(db, "coldStorage", updatedEntry.id);
            const { id, ...dataToUpdate } = updatedEntry;
            await updateDoc(entryDocRef, dataToUpdate);
            setColdStorage(prev => prev.map(cs => cs.id === updatedEntry.id ? updatedEntry : cs));
        } catch (err) { console.error("Error updating cold storage entry:", err); }
    };

    const login = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            return true;
        } catch (error) { console.error("Firebase Login Error:", error.message); return false; }
    };
    const logout = async () => {
        try { await signOut(auth); } catch (error) { console.error("Firebase Logout Error:", error); }
    };

    const addToCart = (product) => { setCart(prevCart => { const existingItem = prevCart.find(item => item.id === product.id); if (existingItem) { return prevCart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item); } return [...prevCart, { ...product, quantity: 1 }]; }); };
    const updateCartQuantity = (productId, quantity) => { setCart(prevCart => { if (quantity <= 0) { return prevCart.filter(item => item.id !== productId); } return prevCart.map(item => item.id === productId ? { ...item, quantity } : item); }); };
    const removeFromCart = (productId) => { setCart(prevCart => prevCart.filter(item => item.id !== productId)); };
    const clearCart = () => setCart([]);
    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    const value = {
        products, sales, expenses, coldStorage, articles,
        addProduct, updateProduct, deleteProduct,
        addArticle, updateArticle, deleteArticle,
        addSale, addExpense, addColdStorageEntry, updateColdStorageEntry,
        isAuthenticated, login, logout,
        cart, addToCart, updateCartQuantity, removeFromCart, clearCart, cartTotal, cartCount,
        loading
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};