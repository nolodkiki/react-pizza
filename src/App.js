import Categories from './components/Categories/Categories';
import Header from './components/Header/Header';
import PizzaBlock from './components/PizzaBlock/PizzaBlock';
import Sort from './components/Sort/Sort';
import './scss/app.scss';
import { useEffect, useState } from 'react';

function App() {
  const [items, setItems] = useState([])
  useEffect(() => {
    fetch('https://63b808fa4d97e82aa3cd35af.mockapi.io/react-pizzas')
      .then(response => response.json())
      .then(arr => setItems(arr))
  }, [])


  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {
              items.map(obj => <PizzaBlock key={obj.id} {...obj} />)
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
