import { useEffect, useState } from 'react';
import Categories from '../components/Categories/Categories';
import Pagination from '../components/Pagination/Pagination';
import Loader from '../components/PizzaBlock/Loader';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Sort from '../components/Sort/Sort';

const Home = ({searchValue}) => {
    const [items, setItems] = useState([])
    const [loader, setLoader] = useState(true)
    const [activeCategory, setActiveCategory] = useState(0)
    const [selectedSort, setSelectedSort] = useState({
        name: 'популярности', 
        sortProperty: 'rating'
    })
    const [currentPage, setCurrentPage] = useState(1)

    const category = activeCategory > 0 ? `category=${activeCategory}` : ''
    const sortBy = selectedSort.sortProperty.replace('-', '')
    const order = selectedSort.sortProperty.includes('-') ? 'asc' : 'desc'
    const search = searchValue ? `&search=${searchValue}` : ''
    const page = `page=${currentPage}`

    console.log(page)
    useEffect(() => {
        fetch(`https://63b808fa4d97e82aa3cd35af.mockapi.io/react-pizzas?${page}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then(response => response.json())
            .then(arr => {
                setItems(arr)
                setLoader(false)
            })
            window.scrollTo(0, 0)
    }, [activeCategory, selectedSort, searchValue, currentPage])



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
            <Pagination setCurrentPage={(number) => setCurrentPage(number)} />
        </div>
    )
}

export default Home