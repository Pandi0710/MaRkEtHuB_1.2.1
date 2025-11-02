import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/seller/Layout';
import ProtectedRoute from './routes/ProtectedRoute';

// Seller pages
import Dashboard from './pages/seller/Dashboard';
import StoreManagement from './pages/seller/StoreManagement';
import Products from './pages/seller/Products';
import AddProduct from './pages/seller/AddProduct';
import EditProduct from './pages/seller/EditProduct';
import Orders from './pages/seller/Orders';
import OrderDetails from './pages/seller/OrderDetails';
import Inventory from './pages/seller/Inventory';
import Promotions from './pages/seller/Promotions';
import Analytics from './pages/seller/Analytics';
import Payouts from './pages/seller/Payouts';
import Messages from './pages/seller/Messages';
import Support from './pages/seller/Support';
import ProductDetails from './pages/seller/ProductDetails';

function App() {
  return (
    <BrowserRouter>
      <ProtectedRoute>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/store" element={<StoreManagement />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/products/add" element={<AddProduct />} />
            <Route path="/products/edit/:id" element={<EditProduct />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<OrderDetails />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/promotions" element={<Promotions />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/payouts" element={<Payouts />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/support" element={<Support />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Layout>
      </ProtectedRoute>
    </BrowserRouter>
  );
}

export default App;
