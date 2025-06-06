import { FC, useState } from "react"
import { FaBars } from "react-icons/fa6"
import { Link } from "react-router-dom"

interface MenuBarPropsType {
    userId: string,
    handleLogout: () => void
}

const MobileMenubar: FC<MenuBarPropsType> = ({ userId, handleLogout }) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <button onClick={() => setIsOpen(pre => !pre)} className="bg-white p-2 rounded-full">
                <FaBars className="text-lg text-gray-600" />
            </button >
            {
                isOpen && <div className="flex flex-col gap-2 absolute z-20 top-14 right-0 bg-blue-400 p-4 rounded-lg">
                    <Link to={`/mybooking/${userId}`} className="btn bg-white text-blue-800 hover:bg-blue-200">
                        My Booking
                    </Link>
                    <Link to={"/admin"} className="btn bg-white text-blue-800 hover:bg-blue-200">
                        Dashboard
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="btn text-red-400 bg-white  hover:bg-blue-200"
                    >
                        Logout
                    </button>
                </div>
            }
        </>
    )
}

export default MobileMenubar