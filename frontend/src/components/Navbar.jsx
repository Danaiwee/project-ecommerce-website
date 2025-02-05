import { Link } from "react-router-dom";
import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { useUserStore } from "../store/useUserStore.js";

const Navbar = () => {
  const {user, logout} = useUserStore(); 
  const isAdmin = user?.role === 'admin';

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-800">
      <div className="relative container mx-auto px-4 py-4">
        <div className="flex items-center justify-between flex-wrap">
          <Link to="/" className="text-2xl sm:text-4xl font-bold text-emerald-500">
            E-Commerce
          </Link>

          <div className="flex items-center gap-5">
            <Link
              path="/"
              className="text-gray-300 text-md font-medium hover:text-emerald-500 transition-all duration-300 hidden sm:block"
            >
              Home
            </Link>

            {user && (
              <Link
                to="/cart"
                className="relative flex items-center text-gray-300 hover:text-emerald-500 transition-all duration-300 gap-1 font-medium"
              >
                <ShoppingCart className="size-5" />
                <span className="hidden sm:block text-md">Cart</span>
                <p className="absolute rounded-full text-sm text-red-500 font-bold -top-1.5 -left-1">
                  3
                </p>
              </Link>
            )}

            {isAdmin && (
              <Link
                to="/secret-dashboard"
                className="px-3 py-2 text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg gap-2 flex items-center"
              >
                <Lock className="size-4" />
                <span className="hidden sm:block text-sm">Dashboard</span>
              </Link>
            )}

            {user ? (
              <button 
                className="flex items-center bg-gray-700 hover:bg-gray-600 transition-all duration-300 text-white px-3 py-2 rounded-lg gap-2 cursor-pointer"
                onClick={logout}
              >
                <LogOut className="size-5 " />
                <span className="hidden sm:block text-sm">Logout</span>
              </button>
            ) : (
              <>
                <Link 
                  to='/signup'
                  className="flex items-center bg-gray-700 hover:bg-gray-600 transition-all duration-300 text-white px-3 py-2 rounded-lg gap-2 cursor-pointer"
                >
                  <UserPlus className="size-5 " />
                  <span className="hidden sm:block text-sm">Signup</span>
                </Link>

                <Link 
                  to='/login'
                  className="flex items-center bg-gray-700 hover:bg-gray-600 transition-all duration-300 text-white px-3 py-2 rounded-lg gap-2 cursor-pointer"
                >
                  <LogIn className="size-5 " />
                  <span className="hidden sm:block text-sm">Login</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
