import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchContext } from '../App';
import Categories from '../components/Categories/Categories';
import Pagination from '../components/Pagination/Pagination';
import Loader from '../components/PizzaBlock/Loader';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Sort from '../components/Sort/Sort';
import { setCategoryId } from '../Redux/Slices/filterSlice';

const Home = ({ }) => {
    // const activeCategory = useSelector((state) => state.filter.categoryId)
    // const selectedSort = useSelector((state) => state.filter.sort.sortProperty)
    const { categoryId, sort } = useSelector((state) => state.filter)
    const activeCategory = categoryId
    const selectedSort = sort.sortProperty
    const dispatch = useDispatch()
    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }



    const [items, setItems] = useState([])
    const [loader, setLoader] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)

    const { searchValue } = useContext(SearchContext)


    const category = activeCategory > 0 ? `category=${activeCategory}` : ''
    const sortBy = selectedSort.replace('-', '')
    const order = selectedSort.includes('-') ? 'asc' : 'desc'
    const search = searchValue ? `&search=${searchValue}` : ''
    const page = `page=${currentPage}`

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
                <Categories value={activeCategory} onClickCategory={onChangeCategory} />
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
            <Pagination setCurrentPage={(number) => setCurrentPage(number)} />
        </div>
    )
}

export default Home