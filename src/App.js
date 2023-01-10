import Header from './components/Header/Header';
import './scss/app.scss';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import { Route, Routes } from 'react-router-dom';
import Cart from './Pages/Cart';
import { useState } from 'react';

function App() {
  const [searchValue, setSearchValue] = useState('')
  console.log(searchValue)

  return (
      <div className="wrapper">
        <Header searchValue={searchValue} setSearchValue={setSearchValue} />
        <div className="content">
          
          <Routes>
            <Route path='/' element={<Home searchValue={searchValue} />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='*' element={<NotFound />} />
          </Routes>

        </div>
      </div>
  );
}

export default App;
