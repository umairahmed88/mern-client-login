import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdMenu, MdClose } from "react-icons/md";

const links = [
	{ name: "Home", to: "/" },
	{ name: "Signup", to: "/signup" },
];

const Header = () => {
	const { currentUser } = useSelector((state) => state.auth);
	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => setMenuOpen(!menuOpen);

	return (
		<header className='relative flex justify-between bg-zinc-700 text-white p-2 shadow-md'>
			{/* Logo Section */}
			<h1>
				<Link to='/'>UA</Link>
			</h1>

			{/* Menu for Larger Screens */}
			<nav className='hidden md:flex gap-3'>
				{links.map((link) => (
					<Link
						to={link.to}
						key={link.to}
						className='hover:bg-zinc-600 p-1 rounded-lg'
					>
						{link.name}
					</Link>
				))}
				{currentUser ? (
					<Link to='/profile'>
						<img
							src={currentUser.sanitizedUser.avatar}
							alt='Profile'
							className='h-7 w-7 object-contain rounded-full'
						/>
					</Link>
				) : (
					<Link to='/signin' className='hover:bg-zinc-600 p-1 rounded-lg'>
						Signin
					</Link>
				)}
			</nav>

			{/* Menu Toggle for Small Screens */}
			<div className='md:hidden flex items-center'>
				<button onClick={toggleMenu} className='text-white text-2xl'>
					{menuOpen ? <MdClose /> : <MdMenu />}
				</button>
			</div>

			{/* Dropdown Menu */}
			{menuOpen && (
				<div className='absolute top-full left-0 w-[25%] bg-zinc-800 text-white  shadow-md md:hidden rounded-br-lg'>
					<nav className='flex flex-col items-start p-4 gap-2'>
						{links.map((link) => (
							<Link
								to={link.to}
								key={link.to}
								onClick={toggleMenu}
								className='w-full hover:bg-zinc-700 p-2 rounded'
							>
								{link.name}
							</Link>
						))}
						{currentUser ? (
							<Link
								to='/profile'
								onClick={toggleMenu}
								className='w-full hover:bg-zinc-700 p-2 rounded'
							>
								<img
									src={currentUser.sanitizedUser.avatar}
									alt='Profile'
									className='h-7 w-7 object-contain rounded-full'
								/>
							</Link>
						) : (
							<Link
								to='/signin'
								onClick={toggleMenu}
								className='w-full hover:bg-zinc-700 p-2 rounded'
							>
								Signin
							</Link>
						)}
					</nav>
				</div>
			)}
		</header>
	);
};

export default Header;

// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { NavLink } from "react-router-dom";
// import { MdMenu, MdClose } from "react-icons/md";

// const links = [
// 	{ name: "Home", to: "/" },
// 	{ name: "Signup", to: "/signup" },
// ];

// const Header = () => {
// 	const { currentUser } = useSelector((state) => state.auth);
// 	const [menuOpen, setMenuOpen] = useState(false);

// 	const toggleMenu = () => setMenuOpen(!menuOpen);

// 	return (
// 		<header className='flex justify-between bg-zinc-500 text-white p-2 shadow-md'>
// 			<h1 className=''>
// 				<Link to={"/"}>UA</Link>
// 			</h1>
// 			<div className=' flex gap-3'>
// 				{links.map((link) => (
// 					<Link to={link.to} key={link.to}>
// 						{link.name}
// 					</Link>
// 				))}
// 				{currentUser ? (
// 					<Link to={"/profile"}>
// 						<img
// 							src={currentUser.sanitizedUser.avatar}
// 							alt=''
// 							className=' h-7 w-7 object-contain rounded-full'
// 						/>
// 					</Link>
// 				) : (
// 					<Link to={"/signin"}>Signin</Link>
// 				)}
// 			</div>
// 		</header>
// 	);
// };

// export default Header;
