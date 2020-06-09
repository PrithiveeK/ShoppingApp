import React from 'react';
import './App.css';
import { HashRouter, Route} from 'react-router-dom';
import LoginSignup from './components/LoginSignup';
import ShoppingList from './components/ShoppingList';
import NewProduct from './components/NewProduct';
import CartList from './components/CartList';
import FavList from './components/FavList';

function App() {
  return (
    <HashRouter basename='/'>
    <div className="App">
      <Route exact path="/" component={LoginSignup} />
      <Route path="/home" component={ShoppingList} />
      <Route path="/fav" component={FavList} />
      <Route path="/cart" component={CartList} />
      <Route path="/admin" component={NewProduct} />
    </div>
    </HashRouter>
  );
}

export default App;
