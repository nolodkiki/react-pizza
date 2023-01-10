import ReactPaginate from "react-paginate"
import s from './pagination.module.scss'

const Pagination = ({setCurrentPage}) => {
    return (
        <ReactPaginate className={s.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={event => setCurrentPage(event.selected + 1)}
        pageRangeDisplayed={3}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={null}
        />
    )
}
export default Pagination