import { IoNotificationsCircle } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";

function NavBar (){
    return(
        <div className="grid grid-cols-3 items-center w-full py-[1.5%] px-[5%]">
            <div className="flex items-center">
                <p className="text-4xl font-semibold text-secondary">M0vie.NiGht</p>
            </div>

            <div className="flex justify-end px-4 bg-white h-12 rounded-full">
                <button>
                    <FaSearch className="text-xl"/>
                </button>
            </div>

            <div className="flex justify-end gap-7">
                <div className="flex gap-3 items-center">
                    <IoNotificationsCircle className="text-5xl text-[#c9cdcc]"/>
                    <div className="h-16 w-16 bg-white rounded-full"></div>
                </div>
                <div className="text-white">
                    <p className="text-xl">Barsha Poudel</p>
                    <p>Hi, good morning Barsha</p>
                </div>
            </div>
        </div>
    )
}

export default NavBar;
