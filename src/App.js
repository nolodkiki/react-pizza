import Header from './components/Header/Header';
import './scss/app.scss';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import { Route, Routes } from 'react-router-dom';
import Cart from './Pages/Cart';

function App() {


  return (
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='*' element={<NotFound />} />
          </Routes>

          </div>
        </div>
      </div>
  );
}

export default App;
