import { Link } from "react-router-dom";

const links = [
	{ name: "Home", to: "/" },
	{ name: "Signup", to: "/signup" },
	{ name: "Signin", to: "/signin" },
	{ name: "Profile", to: "/profile" },
	// { name: "", to: "" },
];

const Header = () => {
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
			</div>
		</div>
	);
};

export default Header;
