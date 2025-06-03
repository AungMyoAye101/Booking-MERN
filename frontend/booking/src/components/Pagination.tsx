import { GrFormNext, GrFormPrevious } from "react-icons/gr"
import { useSearchParams } from "react-router-dom"

export interface PaginationType {
    page: number,
    hasNextPage: boolean,
    hasPrevPage: boolean
}

const Pagination = ({ page, hasNextPage, hasPrevPage }: PaginationType) => {
    const [searchParams, setSearchParams] = useSearchParams();


    const handlePageChange = (newPage: number) => {
        // Keep all existing params, just update page
        const params = Object.fromEntries(searchParams.entries());
        params.page = newPage.toString();
        setSearchParams(params);
    };

    return (
        <section className="flex justify-center items-center gap-4 p-4 ">
            <button disabled={!hasPrevPage}
                onClick={() => handlePageChange(page - 1)}
                className={` ${hasPrevPage ? 'cursor-pointer' : 'bg-gray-400 cursor-not-allowed'} text-2xl  text-white bg-amber-500 p-2 rounded-full`}><GrFormPrevious /></button>
            <div className="p-2 px-4 text-base text-white bg-blue-400 rounded-md font-roboto font-medium ">{page}</div>
            <button disabled={!hasNextPage}
                onClick={() => handlePageChange(page + 1)}
                className={` ${!hasNextPage ? 'bg-gray-400 cursor-not-allowed' : "cursor-pointer"} text-2xl  text-white bg-amber-500 p-2 rounded-full`} > <GrFormNext /></button >
        </section >
    )
}

export default Pagination