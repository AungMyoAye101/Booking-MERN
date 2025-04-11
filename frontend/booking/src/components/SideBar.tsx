

const SideBar = () => {
    return (
        <section className='w-60 p-4 rounded-lg bg-white border shadow-md '>
            <div className='flex flex-col gap-1'>
                <div className='flex gap-2 items-center'>
                    <input type="checkbox" />
                    <label htmlFor="" className='font-roboto text-sm'>5 stars</label>
                </div>
                <div>
                    <input type="checkbox" />
                    <label htmlFor="">5 stars</label>
                </div>
                <div>
                    <input type="checkbox" />
                    <label htmlFor="">5 stars</label>
                </div>
                <div>
                    <input type="checkbox" />
                    <label htmlFor="">5 stars</label>
                </div>
                <div>
                    <input type="checkbox" />
                    <label htmlFor="">5 stars</label>
                </div>
            </div>
        </section>
    )
}

export default SideBar