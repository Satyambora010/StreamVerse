import { LogOut, Menu, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../Store/authUser";
import { useContentStore } from "../Store/content";
const Navbar = () => {
    const { logout, user } = useAuthStore();
    const { contentType, setContentType } = useContentStore();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  return (
    <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-10" >
        <div className="flex items-center gap-10 z-50">
            <Link to={"/"} className='flex items-center gap-2'>
				<img src='https://streamverse1.s3.ap-south-1.amazonaws.com/Photos/SV_Logo.png' alt='logo' className='w-10 h-10' />
                <h1 className="text-2xl font-bold text-[#B20000]">StreamVerse</h1>
            </Link>
            <div className='hidden sm:flex gap-6 items-center'>
                <Link to='/' className='hover:underline' onClick={() => setContentType("movie")}>
                    Movies
                </Link>
                <Link to='/' className='hover:underline' onClick={() => setContentType("tv")}>
                    Tv Shows
                </Link>
                <Link to='/original' className='hover:underline'>
                    Original Content
                </Link>
                <Link to='/history' className='hover:underline'>
                    Search History
                </Link>
		    </div>
        </div>

        <div className='flex gap-5 items-center z-50'>
				<Link to={"/search"}>
					<Search className='size-6 cursor-pointer' />
				</Link>
				<img src={user.image} alt='Avatar' className='h-8 rounded cursor-pointer' />
				<LogOut className='size-6 cursor-pointer' onClick={logout} />
				<div className='sm:hidden'>
					<Menu className='size-6 cursor-pointer' onClick={toggleMobileMenu} />
				</div>
			</div>

        {isMobileMenuOpen && (
		    <div className='w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800'>
				<Link to={"/"} className='block hover:underline p-2' onClick={toggleMobileMenu}>
					Movies
				</Link>
				<Link to={"/"} className='block hover:underline p-2' onClick={toggleMobileMenu}>
					Tv Shows
				</Link>
				<Link to={"/original"} className='block hover:underline p-2' onClick={toggleMobileMenu}>
					Original Content
				</Link>
				<Link to={"/history"} className='block hover:underline p-2' onClick={toggleMobileMenu}>
					Search History
				</Link>
				</div>
		)}
    </header>
  );
};

export default Navbar;
