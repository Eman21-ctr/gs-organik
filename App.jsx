
import React from 'react';
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import PublicLayout from './pages/PublicLayout';
import { HomePage, ProductsPage, AboutPage, ArticlesRouter, ContactPage } from './pages/PublicPages';
import LoginPage from './pages/LoginPage';
import AdminLayout from './pages/AdminLayout';
import { DashboardPage, ManageProductsPage, ManageSalesPage, ManageExpensesPage, ManageColdStoragePage, ManageArticlesPage } from './pages/AdminPages';

const ProtectedRoute: React.FC = () => {
    const { isAuthenticated } = useAppContext();
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <MainRouter />
    </AppProvider>
  );
};

const MainRouter: React.FC = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<PublicLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="produk" element={<ProductsPage />} />
                    <Route path="artikel/*" element={<ArticlesRouter />} />
                    <Route path="tentang" element={<AboutPage />} />
                    <Route path="kontak" element={<ContactPage />} />
                </Route>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin" element={<ProtectedRoute />}>
                    <Route element={<AdminLayout />}>
                        <Route index element={<Navigate to="dashboard" replace />} />
                        <Route path="dashboard" element={<DashboardPage />} />
                        <Route path="produk" element={<ManageProductsPage />} />
                        <Route path="penjualan" element={<ManageSalesPage />} />
                        <Route path="pengeluaran" element={<ManageExpensesPage />} />
                        <Route path="cold-storage" element={<ManageColdStoragePage />} />
                        <Route path="artikel" element={<ManageArticlesPage />} />
                    </Route>
                </Route>
            </Routes>
        </HashRouter>
    );
}

export default App;
