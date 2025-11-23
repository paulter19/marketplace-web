import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductManager from './pages/admin/ProductManager';
import OrderManager from './pages/admin/OrderManager';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import OrderSuccess from './pages/OrderSuccess';
import OrderFailed from './pages/OrderFailed';
import Wishlist from './pages/Wishlist';

import ScrollToTop from './components/common/ScrollToTop';

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  return user?.isAdmin ? <>{children}</> : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="orders" element={<Orders />} />
          <Route path="order-success" element={<OrderSuccess />} />
          <Route path="order-failed" element={<OrderFailed />} />
          <Route path="search" element={<ProductList />} />
          <Route path="wishlist" element={<Wishlist />} />

          {/* Admin Routes */}
          <Route path="admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="admin/products" element={<AdminRoute><ProductManager /></AdminRoute>} />
          <Route path="admin/orders" element={<AdminRoute><OrderManager /></AdminRoute>} />
        </Route>

        {/* Auth Routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
