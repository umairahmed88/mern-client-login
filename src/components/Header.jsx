import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const links = [
	{ name: "Home", to: "/" },
	{ name: "Signup", to: "/signup" },
	// { name: "Signin", to: "/signin" },
	// { name: "", to: "" },
];

const Header = () => {
	const { currentUser } = useSelector((state) => state.auth);

	return (
		<div className='flex justify-between bg-zinc-500 text-white p-2 shadow-md'>
			<h1 className=''>
				<Link to={"/"}>UA</Link>
			</h1>
			<div className=' flex gap-3'>
				{links.map((link) => (
					<Link to={link.to} key={link.to}>
						{link.name}
					</Link>
				))}
				{currentUser ? (
					<Link to={"/profile"}>
						<img
							src={currentUser.sanitizedUser.avatar}
							alt=''
							className=' h-7 w-7 object-contain rounded-full'
						/>
					</Link>
				) : (
					<Link to={"/signin"}>Signin</Link>
				)}
			</div>
		</div>
	);
};

export default Header;
