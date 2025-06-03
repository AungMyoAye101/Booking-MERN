import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { base_url } from '../lib/helper'
import { HotelType } from '../lib/types'

const TypeResult = () => {
    const { type } = useParams()
    const [searchParam, setSearchParams] = useSearchParams()
    const [hotel, setHotel] = useState<HotelType[]>([])
    const [loading, setloading] = useState(false)
    const [error, setError] = useState(false)
    const page = searchParam.get('page') || 1
    const limit = searchParam.get('limit') || 4

    const fetchType = async () => {
        try {
            setloading(true)
            const res = await fetch(`${base_url}/api/hotel/type/${type}?linmit=${limit}&page=${page}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }

            })
            const { success, message, data } = await res.json()

            if (!res.ok && success === false) {
                setError(true)
                throw new Error(message)
            }
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
    console.log(hotel)

    return (
        <section className='min-h-screen  mt-10'>
            <div>
            </div>
        </section>
    )
}

export default TypeResult