import { useEffect, useState } from 'react';
import Categories from '../components/Categories/Categories';
import Loader from '../components/PizzaBlock/Loader';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Sort from '../components/Sort/Sort';

const Home = () => {
    const [items, setItems] = useState([])
    const [loader, setLoader] = useState(true)
    const [activeCategory, setActiveCategory] = useState(0)
    const [selectedSort, setSelectedSort] = useState({
        name: 'популярности', 
        sortProperty: 'rating'
    })

    const category = activeCategory > 0 ? `category=${activeCategory}` : ''
    const sortBy = selectedSort.sortProperty.replace('-', '')
    const order = selectedSort.sortProperty.includes('-') ? 'asc' : 'desc'
    console.log(order)

    useEffect(() => {
        fetch(`https://63b808fa4d97e82aa3cd35af.mockapi.io/react-pizzas?${category}&sortBy=${sortBy}&order=${order}`)
            .then(response => response.json())
            .then(arr => {
                setItems(arr)
                setLoader(false)
            })
            window.scrollTo(0, 0)
    }, [activeCategory, selectedSort])



    return (
        <div className="container">
            <div className="content__top">
                <Categories value={activeCategory} onClickCategory={(id) => setActiveCategory(id)} />
                <Sort value={selectedSort} onClickSort={(id) => setSelectedSort(id)} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    loader
                        ? [...new Array(5)].map((_, id) => <Loader key={id} />) // создаем фэйковый массив, чтобы не делать скелеты для всех пицц из базы
                        : items.map(obj => <PizzaBlock key={obj.id} {...obj} />)
                }
            </div>
        </div>
    )
}

export default Home