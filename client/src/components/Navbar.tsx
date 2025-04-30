import { ArrowLeftIcon, LucideShoppingCart, Menu, Search, User } from "lucide-react";

import { Link, NavLink } from "react-router-dom";
import icon from '@/assets/logo.png';
import { useState } from "react";

/**
 * The `Navbar` component represents the navigation bar of the application.
 * It includes links to various pages, a search icon, a user menu, a shopping cart, 
 * and a responsive menu for smaller screens.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered Navbar component.
 *
 * @state
 * - `showMenu` (`boolean`): Tracks whether the mobile menu is visible.
 *
 * @events
 * - `handleClick`: Toggles the `showMenu` state to show or hide the mobile menu.
 */
const Navbar = () => {

    const [showMenu, setShowMenu] = useState(false);

    const handleClick = () => {
        setShowMenu(prev => !prev);
    }

    return (
        <>
            <div className="flex betwenn justify-between py-5 font-medium">
                <Link to='/'>
                    <img src={icon} alt='Logo' className="w-36" />
                </Link>
                <nav className="hidden sm:flex gap-5 text-md my-auto">
                    <NavLink to="/">
                            <p>Home</p>
                            <hr className="w-3/4 hidden mx-auto bg-gray-400 h-[1.5]" />
                    </NavLink>
                    <NavLink to="/collection">
                            <p>Collections</p>
                            <hr className="w-3/4 hidden mx-auto bg-gray-400 h-[1.5]" />
                    </NavLink>
                    <NavLink to="/about">
                            <p>About</p>
                            <hr className="w-3/4 hidden mx-auto bg-gray-400 h-[1.5]" />
                    </NavLink>
                    <NavLink to="/contact">
                            <p>Contact</p>
                            <hr className="w-3/4 hidden mx-auto bg-gray-400 h-[1.5]" />
                    </NavLink>
                </nav>
                <div className="my-auto flex gap-4">
                    <Search className="cursor-pointer" />
                    <div className="group relative">
                        <User className="cursor-pointer" />
                        <div className="absolute right-0 hidden group-hover:block dropdown-menu bg-white text-gray-800 rounded-lg shadow-lg w-48">
                            <div className="flex flex-col">
                                <a href="/profile" className="px-2 py-2 text-sm whitespace-nowrap hover:bg-gray-100">My Profile</a>
                                <a href="/cart" className="px-2 py-2 text-sm whitespace-nowrap hover:bg-gray-100">Cart</a>
                                <a href="/logout" className="px-2 py-2 text-sm whitespace-nowrap hover:bg-gray-100">Logout</a>
                            </div>
                        </div>
                    </div>
                    <Link to='/cart' className="relative">
                        <LucideShoppingCart className="cursor-pointer" />
                        <p className="absolute right-[-5px] bottom-[-5px] font-bold text-[8px] bg-black text-white rounded-full p-0.5">10</p>
                    </Link>
                    <Menu 
                        className="cursor-pointer md:hidden"
                        onClick={handleClick} />
                </div>
            </div>
            { showMenu && 
                <div className="absolute top-0 left-0 bg-white z-10 h-dvh w-dvw">
                    <div className="flex gap-2 my-4 pl-2 text-xl" onClick={handleClick}>
                        <ArrowLeftIcon className="w-8" />
                        <p>Back</p>
                    </div>
                    <nav className="z-12 flex flex-col text-xl" onClick={handleClick} id='navbar-mobile-navigation'>
                        <NavLink to="/" className='border-b-1 border-t-1'>
                            <p>Home</p>
                        </NavLink>
                        <NavLink to="/collections" className='border-b-1'>
                            <p>Collections</p>
                        </NavLink>
                        <NavLink to="/about" className='border-b-1'>
                            <p>About</p>
                        </NavLink>
                        <NavLink to="/contact" className='border-b-1'>
                            <p>Contact</p>
                        </NavLink>
                    </nav>
                </div> 
            }
        </>
    )
}

export default Navbar
