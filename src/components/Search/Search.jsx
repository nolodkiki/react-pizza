import s from './search.module.scss'
import search from '../../img/icons/search.svg'
import close from '../../img/icons/close.svg'
import { useCallback, useContext, useRef, useState } from 'react'
import { SearchContext } from '../../App'
import debounce from 'lodash.debounce'

const Search = () => {
    const [value, setValue] = useState()
    const {searchValue, setSearchValue} = useContext(SearchContext)
    const searchRef = useRef()
    const onClear = () => {
        setSearchValue('')
        setValue('')
        searchRef.current.focus()
    }
    // const onChangeInput = (event) => {
    //     setSearchValue(event.target.value)
    //     debounceTest()
    // }
    const debounceSearch = useCallback(
        debounce((event) => {
            setSearchValue(event)
        }, 400), []
    )

    const onChangeInput = (event) => {
        setValue(event)
        debounceSearch(event)
    }

    return (
        <div className={s.root}>
            <img className={s.search} src={search} alt="search" />
            <input 
                ref={searchRef}
                value={value} 
                onChange={(event) => onChangeInput(event.target.value)}
                type="text" 
                placeholder='Search...' />
            {setValue && <img onClick={() => onClear()} className={s.close} src={close} alt="search" />}
        </div>
    )
}

export default Search