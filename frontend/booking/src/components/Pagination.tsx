
import { GrFormNext, GrFormPrevious } from "react-icons/gr"

export interface PaginationType {
    page: number,
    hasNextPage: boolean,
    hasPrevPage: boolean
}

const Pagination = ({ page, hasNextPage, hasPrevPage }: PaginationType) => {
    return (
        <section className="flex justify-center items-center gap-4 p-4 ">
            <button disabled={hasPrevPage} className={` ${!hasPrevPage ? 'bg-gray-400 cursor-not-allowed' : ""} text-2xl  text-white bg-amber-500 p-2 rounded-full`}><GrFormPrevious /></button>
            <div className="p-2 px-4 text-base text-white bg-blue-400 rounded-md font-roboto font-medium ">{page}</div>
            <button disabled={hasNextPage} className={` ${!hasNextPage ? 'bg-gray-400 cursor-not-allowed' : ""} text-2xl  text-white bg-amber-500 p-2 rounded-full`} > <GrFormNext /></button >
        </section >
    )
}

export default Pagination