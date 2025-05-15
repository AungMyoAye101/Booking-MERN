import React from 'react'

const MyBooking = () => {
    return (
        <section className='h-screen  mt-20 max-w-6xl  mx-auto'>
            <table className='w-full border-collapse border border-neutral-200 shadow-lg  rounded-lg'>
                <thead>
                    <tr className='bg-blue-600  border border-neutral-200 text-lg  font-serif  text-white'>
                        <th className='border border-neutral-200 p-1'>Room</th>
                        <th className='border border-neutral-200 p-1'>check in</th>
                        <th className='border border-neutral-200 p-1'>Check out</th>
                        <th className='border border-neutral-200 p-1'>Payment</th>
                    </tr>

                </thead>
                <tbody>
                    <tr>
                        <td className='border border-neutral-200 text-center p-2'>olololololololololo</td>
                        <td className='border border-neutral-200 text-center p-2'>201012</td>
                        <td className='border border-neutral-200 text-center p-2'>201012</td>
                        <td className='border border-neutral-200 text-center p-2'><button className='bg-green-400 hover:bg-green-600 px-4 py-1.5 text-sm rounded-lg text-white'>pay now</button></td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
}

export default MyBooking