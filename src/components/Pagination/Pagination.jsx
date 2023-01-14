import ReactPaginate from "react-paginate"
import s from './pagination.module.scss'

const Pagination = ({currentPage, onChangePage}) => {
    return (
        <ReactPaginate className={s.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={event => onChangePage(event.selected + 1)}
        pageRangeDisplayed={3}
        pageCount={3}
        forcePage={currentPage - 1}
        previousLabel="<"
        renderOnZeroPageCount={null}
        />
    )
}
export default Pagination