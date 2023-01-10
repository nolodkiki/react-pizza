import s from './search.module.scss'
import search from '../../img/icons/search.svg'
import close from '../../img/icons/close.svg'
import { useContext } from 'react'
import { SearchContext } from '../../App'

const Search = () => {
    const {searchValue, setSearchValue} = useContext(SearchContext)
    return (
        <div className={s.root}>
            <img className={s.search} src={search} alt="search" />
            <input 
                value={searchValue} 
                onChange={(event) => setSearchValue(event.target.value)}
                type="text" 
                placeholder='Search...' />
            {searchValue && <img onClick={() => setSearchValue('')} className={s.close} src={close} alt="search" />}
        </div>
    )
}

export default Search