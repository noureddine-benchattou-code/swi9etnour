import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Produits from './pages/Produits';
import Panier from './pages/Panier';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  const [cart, setCart] = useState([]);

  const handleAdd = (produit) => {
    setCart(prev => {
      const existing = prev.find(i => i.nom === produit.nom);
      if (existing) {
        return prev.map(i => i.nom === produit.nom ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...produit, qty: 1 }];
    });
  };

  const handleIncrease = (nom) => setCart(prev =>
    prev.map(i => i.nom === nom ? { ...i, qty: i.qty + 1 } : i)
  );

  const handleDecrease = (nom) => setCart(prev =>
    prev.map(i => i.nom === nom && i.qty > 1 ? { ...i, qty: i.qty - 1 } : i)
      .filter(i => i.qty > 0)
  );

  const handleRemove = (nom) => setCart(prev => prev.filter(i => i.nom !== nom));

  const handleClear = () => setCart([]);

  const cartCount = cart.reduce((acc, i) => acc + i.qty, 0);
  const cartTotal = cart.reduce((acc, i) => acc + i.prix * i.qty, 0);

  return (
    <BrowserRouter>
      <Navbar cartCount={cartCount} cartTotal={cartTotal} />
      <Routes>
        <Route path="/"         element={<Home onAdd={handleAdd} />} />
        <Route path="/produits" element={<Produits onAdd={handleAdd} />} />
        <Route path="/panier"   element={
          <Panier
            cart={cart}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onRemove={handleRemove}
            onClear={handleClear}
          />
        } />
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}