import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { base_url, loadingElem } from '../lib/helper'
import { HotelType } from '../lib/types'
import HotelCard from '../components/HotelCard'
import Pagination, { PaginationType } from '../components/Pagination'
import NotFound from './NotFound'


const TypeResult = () => {
    const { type } = useParams()
    const [searchParam] = useSearchParams()
    const [hotel, setHotel] = useState<HotelType[]>([])
    const [pagination, setPagination] = useState<PaginationType>()
    const [loading, setloading] = useState(false)
    const [error, setError] = useState(false)
    const page = searchParam.get('page') || 1
    const limit = searchParam.get('limit') || 4

    const fetchType = async () => {
        try {
            setloading(true)
            const res = await fetch(`${base_url}/api/hotel/type/${type}?limit=${limit}&page=${page}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }

            })
            const { success, message, data, pagination } = await res.json()

            if (!res.ok && success === false) {
                setError(true)
                throw new Error(message)
            }

            setPagination(pagination)
            setHotel(data)
        } catch (error) {
            setError(true)
            if (error instanceof Error) {
                console.log(error.message)
            }
        } finally {
            setloading(false)
        }



    }

    useEffect(() => {
        fetchType()
    }, [type, page, limit])


    return (
        <section className='page_con min-h-screen'>
            <div className='flex flex-col gap-4 '>
                {
                    error ? <div className='h-[calc(100vh-200px)] flex justify-center items-center'><NotFound /></div> :
                        <div className='mt-4'>
                            {

                                loading ? loadingElem : hotel.map((data) => (
                                    <HotelCard item={data} key={data._id} />
                                ))
                            }
                            <Pagination
                                page={Number(pagination?.page)}
                                hasNextPage={pagination?.hasNextPage ?? false}
                                hasPrevPage={pagination?.hasPrevPage ?? false}
                            />
                        </div>
                }
            </div>

        </section>
    )
}

export default TypeResult