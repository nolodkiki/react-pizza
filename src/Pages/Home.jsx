import axios from 'axios';
import qs from 'qs';
import { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../App';
import Categories from '../components/Categories/Categories';
import Pagination from '../components/Pagination/Pagination';
import Loader from '../components/PizzaBlock/Loader';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Sort, { sortList } from '../components/Sort/Sort';
import { setCategoryId, setCurrentPage, setFilters } from '../Redux/Slices/filterSlice';

const Home = ({ }) => {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const { categoryId, sort, currentPage } = useSelector((state) => state.filter)
    const activeCategory = categoryId
    const selectedSort = sort.sortProperty


    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number))
    }



    const [items, setItems] = useState([])
    const [loader, setLoader] = useState(true)

    const { searchValue } = useContext(SearchContext)

    const isSearch = useRef(false)
    const isMounted = useRef(false)




    const fetchPizzas = () => {
        const category = activeCategory > 0 ? `category=${activeCategory}` : ''
        const sortBy = selectedSort.replace('-', '')
        const order = selectedSort.includes('-') ? 'asc' : 'desc'
        const search = searchValue ? `&search=${searchValue}` : ''


        axios
            .get(`https://63b808fa4d97e82aa3cd35af.mockapi.io/react-pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then(arr => {
                setItems(arr.data)
                setLoader(false)
            })
    }


    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify( // получаем данные с redux и прверащаем в URL формат
            {
                categoryId,
                sortProperty: sort.sortProperty,
                currentPage: currentPage
            })
            console.log(queryString)
        navigate(`?${queryString}`)
        }
        
        isMounted.current = true
    }, [activeCategory, sort.sortProperty, currentPage])


    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1)) // парсим URL в объект
            console.log(params)

            const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)
            console.log(sort)


            dispatch(
                setFilters({
                    ...params, sort
                })
            )
        }
        isSearch.current = true
    }, [])


    useEffect(() => {
        window.scrollTo(0, 0)

        if (!isSearch.current) {
            fetchPizzas()
        }
        isSearch.current = false;
    }, [activeCategory, sort.sortProperty, searchValue, currentPage])









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
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    )
}

export default Home