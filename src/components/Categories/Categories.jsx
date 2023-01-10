
const Categories = ({value, onClickCategory}) => {
    
    const categories = ['Все', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые', 'Мясные',]
    // const onClickCategory = (index) => {
    //     setActiveIndex(index)
    // }
    return (
        <div className="categories">
            <ul>
                {categories.map((categorie, i) => 
                <li key={i} onClick={() => {onClickCategory(i)}} className={value === i ? 'active' : ''}>{categorie}</li>)}
            </ul>
        </div>
    )
}

export default Categories