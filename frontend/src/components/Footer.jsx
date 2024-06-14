import { FaRegCopyright } from "react-icons/fa";

const Footer = () => {
	return (
		<footer className="">
			<div className="container ps-8 md:ps-0 pb-4 flex items-center px-4">
				<FaRegCopyright className="text-white text-xl" />
				<p className="text-white opacity-70 ps-2">
					2024 Taskly.io - All rights reserved <br /> Created by Novia Marsheila
					Louisyana
				</p>
			</div>
		</footer>
	);
};

export default Footer;
