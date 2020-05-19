import React from 'react';
import './App.css';
import { HashRouter, Route} from 'react-router-dom';
import Header from './components/Header';
import ShoppingList from './components/ShoppingList';
import NewProduct from './components/NewProduct';

function App() {
  return (
    <HashRouter basename='/'>
    <div className="App">
      <Header />
      <Route path="/home" component={ShoppingList} />
      <Route path="/admin" component={NewProduct} />
    </div>
    </HashRouter>
  );
}

export default App;
