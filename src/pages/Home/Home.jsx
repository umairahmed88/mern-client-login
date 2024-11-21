import { useState, useEffect } from "react";
import { appData } from "../../assets/data/appData";

const Home = () => {
	const [expandedDescriptions, setExpandedDescriptions] = useState({});
	const [revealedWords, setRevealedWords] = useState({});
	const [revealedText, setRevealedText] = useState("");

	const truncateText = (text, maxLength = 50) => {
		if (typeof text !== "string" || !text) return "";
		if (text.length <= maxLength) return text;
		return `${text.slice(0, maxLength).trim()}...`;
	};

	const revealDescription = (key, text) => {
		const words = text.split(" ");
		let index = 0;

		setRevealedWords((prev) => ({ ...prev, [key]: "" }));

		const interval = setInterval(() => {
			setRevealedWords((prev) => ({
				...prev,
				[key]: words.slice(0, index + 1).join(" "),
			}));
			index++;

			if (index === words.length) {
				clearInterval(interval);
			}
		}, 100);
	};

	const toggleDescription = (key, description) => {
		if (!expandedDescriptions[key]) {
			revealDescription(key, description);
		}
		setExpandedDescriptions((prev) => ({
			...prev,
			[key]: !prev[key],
		}));
	};

	const renderDescription = (key, value) => {
		const { description, link } = value;

		const isFullyRevealed =
			expandedDescriptions[key] &&
			revealedWords[key]?.split(" ").length === description.split(" ").length;

		return (
			<div key={key} className='py-2'>
				<h2
					className='text-lg font-semibold text-blue-600 cursor-pointer hover:text-blue-800'
					onClick={() => toggleDescription(key, description)}
				>
					{key}
				</h2>
				<p className='text-gray-700 mt-1'>
					<span>
						{expandedDescriptions[key]
							? revealedWords[key] || ""
							: truncateText(description)}{" "}
					</span>
					{isFullyRevealed && link && (
						<a
							href={link}
							target='_blank'
							rel='noopener noreferrer'
							className='text-blue-500 hover:text-blue-700 underline ml-1'
						>
							View
						</a>
					)}
				</p>
			</div>
		);
	};

	const renderSection = (title, data) => {
		return (
			<div className='mt-8'>
				<h1 className='text-2xl font-semibold text-gray-800 mb-4 text-center'>
					{title}
				</h1>
				<div className='divide-y divide-gray-300'>
					{Object.entries(data).map(([key, value]) =>
						renderDescription(key, value)
					)}
				</div>
			</div>
		);
	};

	useEffect(() => {
		const text =
			"Empowering Users with Seamless Authentication & Dynamic Experiences";
		let index = 0;
		const interval = setInterval(() => {
			setRevealedText((prev) => text.slice(0, index + 1));
			index++;
			if (index === text.length) clearInterval(interval);
		}, 150);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className='bg-gray-100 min-h-screen py-10'>
			{/* Intro Heading */}
			<div className='text-center'>
				<h1 className='text-3xl font-bold text-gray-800 tracking-wide'>
					{revealedText}
				</h1>
			</div>

			{/* Content Sections */}
			<div className='max-w-4xl mx-auto bg-white shadow rounded-lg p-6 mt-10'>
				{renderSection("Client/Frontend", appData.client)}
				{renderSection("API/Backend", appData.api)}
			</div>
		</div>
	);
};

export default Home;

// import { useState, useEffect } from "react";
// import { appData } from "../../assets/data/appData";

// const Home = () => {
// 	const [expandedDescriptions, setExpandedDescriptions] = useState({});
// 	const [revealedWords, setRevealedWords] = useState({});
// 	const [revealedText, setRevealedText] = useState("");

// 	const truncateText = (text, maxLength = 50) => {
// 		if (typeof text !== "string" || !text) return "";
// 		if (text.length <= maxLength) return text;
// 		return `${text.slice(0, maxLength).trim()}...`;
// 	};

// 	const revealDescription = (key, text) => {
// 		const words = text.split(" ");
// 		let index = 0;

// 		setRevealedWords((prev) => ({ ...prev, [key]: "" }));

// 		const interval = setInterval(() => {
// 			setRevealedWords((prev) => ({
// 				...prev,
// 				[key]: words.slice(0, index + 1).join(" "),
// 			}));
// 			index++;

// 			if (index === words.length) {
// 				clearInterval(interval);
// 			}
// 		}, 100);
// 	};

// 	const toggleDescription = (key, description) => {
// 		if (!expandedDescriptions[key]) {
// 			revealDescription(key, description);
// 		}
// 		setExpandedDescriptions((prev) => ({
// 			...prev,
// 			[key]: !prev[key],
// 		}));
// 	};

// 	const renderDescription = (key, value) => {
// 		const { description, link } = value;

// 		const isFullyRevealed =
// 			expandedDescriptions[key] &&
// 			revealedWords[key]?.split(" ").length === description.split(" ").length;

// 		return (
// 			<div key={key}>
// 				<h2
// 					className='font-bold cursor-pointer'
// 					onClick={() => toggleDescription(key, description)}
// 				>
// 					{key}
// 				</h2>
// 				<p className='text-gray-800'>
// 					<span>
// 						{expandedDescriptions[key]
// 							? revealedWords[key] || ""
// 							: truncateText(description)}{" "}
// 					</span>
// 					{isFullyRevealed && (
// 						<a
// 							href={link}
// 							target='_blank'
// 							rel='noopener noreferrer'
// 							className='text-blue-500 underline ml-1 cursor-pointer'
// 						>
// 							View
// 						</a>
// 					)}
// 				</p>
// 			</div>
// 		);
// 	};

// 	const renderSection = (title, data) => {
// 		return (
// 			<div className='mt-4'>
// 				<h1 className='text-center text-lg font-bold'>{title}</h1>
// 				<div>
// 					{Object.entries(data).map(([key, value]) =>
// 						renderDescription(key, value)
// 					)}
// 				</div>
// 			</div>
// 		);
// 	};

// 	useEffect(() => {
// 		const text =
// 			"Empowering Users with Seamless Authentication & Dynamic Experiences";
// 		let index = 0;
// 		const interval = setInterval(() => {
// 			setRevealedText((prev) => text.slice(0, index + 1));
// 			index++;
// 			if (index === text.length) clearInterval(interval);
// 		}, 150);
// 		return () => clearInterval(interval);
// 	}, []);

// 	return (
// 		<div>
// 			<div className='text-center mt-12'>
// 				<div className='text-center mt-12'>
// 					<div className='text-center mt-12'>
// 						<h1
// 							className='text-2xl font-serif font-bold italic text-gray-900 tracking-wide animate-text-appearance'
// 							style={{
// 								fontWeight: 900,
// 								letterSpacing: "0.05em",
// 							}}
// 						>
// 							{revealedText}
// 						</h1>
// 					</div>
// 				</div>
// 			</div>
// 			<div className='max-w-lg mx-auto border border-t-0 shadow-md p-6 mt-12 rounded-lg'>
// 				{renderSection("Client/Frontend", appData.client)}
// 				{renderSection("API/Backend", appData.api)}
// 			</div>
// 		</div>
// 	);
// };

// export default Home;
