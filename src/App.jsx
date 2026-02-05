import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/navbar/NavBar.jsx';
import ItemListContainer from './components/ItemListContainer/ItemListContainer.jsx';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer.jsx';
import Cart from './components/Cart/Cart.jsx';
import Checkout from './components/Checkout/Checkout.jsx';
import NotFound from './components/NotFound/NotFound.jsx';

function App() {
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const handleCartClick = () => {
    setShowCart(true);
  };

  const handleCartClose = () => {
    setShowCart(false);
  };

  const handleCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
  };

  const handleCheckoutClose = () => {
    setShowCheckout(false);
  };

  return (
    <BrowserRouter>
      <NavBar onCartClick={handleCartClick} />
      
      <Routes>
        <Route path="/" element={<ItemListContainer />} />
        <Route path="/category/:categoryId" element={<ItemListContainer />} />
        <Route path="/item/:id" element={<ItemDetailContainer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {showCart && (
        <Cart 
          onClose={handleCartClose}
          onCheckout={handleCheckout}
        />
      )}

      {showCheckout && (
        <Checkout onClose={handleCheckoutClose} />
      )}
    </BrowserRouter>
  );
}

export default App;
