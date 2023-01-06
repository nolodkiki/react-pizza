import { useState } from "react"

const Categories = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    


    const categories = ['Все', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые', 'Мясные',]
    const onClickCategory = (index) => {
        setActiveIndex(index)
    }
    return (
        <div className="categories">
            <ul>
                {categories.map((categorie, i) => 
                <li key={i} onClick={() => {onClickCategory(i)}} className={activeIndex === i ? 'active' : ''}>{categorie}</li>)}
            </ul>
        </div>
    )
}

export default Categories