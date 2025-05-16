import React from 'react'

const HotelLoading = () => {
    return (
        <>

            {
                [1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (<div key={i} className="min-w-60 w-72 bg-white border border-white shadow-md p-2 rounded">
                    <div className="w-full h-52 bg-neutral-200 rounded-md"></div>
                    <div className="flex flex-col mt-1 gap-1">
                        <div className="flex items-center justify-between gap-4">
                            <div className="w-20 h-4 rounded bg-neutral-200"></div>
                            <div className="w-10 h-4 rounded bg-neutral-200"></div>
                        </div>
                        <div className="rounded w-24 h-4 bg-neutral-200"></div>
                        <div className="rounded w-20 h-4 bg-neutral-200"></div>
                        <div className="rounded w-20 h-4 bg-neutral-200 self-end"></div>
                    </div>
                </div>))
            }

        </>
    )
}

export default HotelLoading