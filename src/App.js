import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './components/Header';
import ShoppingList from './components/ShoppingList';
import NewProduct from './components/NewProduct';

function App() {
  return (
    <Router>
    <div className="App">
      <Header />
      <Route path="/home" component={ShoppingList} />
      <Route path="/admin" component={NewProduct} />
    </div>
    </Router>
  );
}

export default App;
