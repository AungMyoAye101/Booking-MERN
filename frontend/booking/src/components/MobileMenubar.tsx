import { FC, useState } from "react"
import { FaBars, FaX } from "react-icons/fa6"
import { Link } from "react-router-dom"
import { useAuth } from "../context/authContext"

interface MenuBarPropsType {
    userId: string,
    handleLogout: () => void
}

const MobileMenubar: FC<MenuBarPropsType> = ({ userId, handleLogout }) => {
    const { user } = useAuth()
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <button onClick={() => setIsOpen(pre => !pre)} className="bg-white p-2 rounded-full">
                <FaBars className="text-lg text-gray-600" />
            </button >
            <div className={`flex flex-col justify-center gap-2 absolute z-20 top-0 w-[50%] right-0 bg-gray-100 p-4 rounded-lg h-screen  transform transition-all duration-300
          ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}>
                <button onClick={() => setIsOpen(false)} className="absolute top-2 left-2 bg-white shadow-md border w-8 h-8 rounded-full flex justify-center items-center hover:text-red-400 "><FaX /></button>

                {
                    user._id ? <>
                        <Link
                            to={`/mybooking/${userId}`}
                            onClick={() => setIsOpen(false)}
                            className="btn bg-blue-400 text-white hover:bg-blue-200">
                            My Booking
                        </Link>
                        <Link
                            to={"/admin"}
                            onClick={() => setIsOpen(false)}
                            className="btn bg-blue-400 text-white hover:bg-blue-200">
                            Dashboard
                        </Link>

                        <button
                            onClick={() => { handleLogout(); setIsOpen(false) }}
                            className="btn text-red-400  hover:bg-blue-200"
                        >
                            Logout
                        </button>
                    </> : <>
                        <Link
                            to={'/signup'}
                            onClick={() => setIsOpen(false)}
                            className="btn bg-blue-400 text-white hover:bg-blue-200">
                            Signup
                        </Link>
                        <Link
                            to={"/login"}
                            onClick={() => setIsOpen(false)}
                            className="btn bg-blue-400 text-white hover:bg-blue-200">
                            Login
                        </Link>
                    </>
                }


            </div>


        </>
    )
}

export default MobileMenubar