import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

import Logout from "./Logout";

export default function Header() {
  const { isLoggedIn } = useAppContext();


  return (
    <div className=" bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        {/* tracking-tight */}
        <span className=" text-3xl text-white font-bold tracking-tight">
          <Link to={"/"}>MernHolidays.com</Link>
        </span>
        {/* space-x-2 */}
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                to={"/my-bookings"}
                className="flex items-center text-white  px-3 font-bold hover:opacity-95 cursor-pointer"
              >
                My Bookings
              </Link>
              <Link
                to={"myHotels"}
               className="flex items-center text-white  px-3 font-bold hover:opacity-95 cursor-pointer"
              >
                My Hotels
              </Link>
             <Logout/>
            </>
          ) : (
            <Link
              to={"/sign-in"}
              className="flex items-center text-blue-600 bg-white px-3 font-bold hover:bg-gray-100 hover:cursor-pointer"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
}
