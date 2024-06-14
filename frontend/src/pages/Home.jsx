import heroImage from "../assets/images/hero-image.png";

const HomePage = () => {
	return (
		<section id="hero" className="pt-10 pb-16 bg-primary text-white">
			<div className="container">
				<div className="flex items-center flex-col-reverse md:flex-row">
					<div className="w-full mt-8 md:mt-0 px-4 lg:w-1/2">
						<h1 className="font-bold text-[32px] lg:text-[55px] md:max-w-[500px]">
							Manajemen Tugas Kalian dengan Mudah
						</h1>
						<p className="opacity-80 md:max-w-[520px]">
							Buat, edit, dan hapus tugas dengan mudah. Antarmuka yang intuitif
							memudahkan manajemen tugas, sehingga Anda bisa fokus pada hal-hal
							yang lebih penting.
						</p>
					</div>
					<div className="w-full lg:w-1/2 px-4 max-w-lg">
						<img src={heroImage} alt="Image Taskly" />
					</div>
				</div>
			</div>
		</section>
	);
};

export default HomePage;
