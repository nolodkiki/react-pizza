import { useEffect, useState } from 'react';
import Categories from '../components/Categories/Categories';
import Loader from '../components/PizzaBlock/Loader';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Sort from '../components/Sort/Sort';

const Home = () => {
    const [items, setItems] = useState([])
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        fetch('https://63b808fa4d97e82aa3cd35af.mockapi.io/react-pizzas')
            .then(response => response.json())
            .then(arr => {
                setItems(arr)
                setLoader(false)
            })
    }, [])
    return (
        <>
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    loader
                        ? [...new Array(5)].map((_, id) => <Loader key={id} />) // создаем фэйковый массив, чтобы не делать скелеты для всех пицц из базы
                        : items.map(obj => <PizzaBlock key={obj.id} {...obj} />)
                }
            </div>
        </>
    )
}

export default Home