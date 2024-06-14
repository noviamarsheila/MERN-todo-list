import TodoItem from "../components/TodoItem";

const Todos = () => {
	return (
		<section className="py-16 flex items-center justify-center">
			<div className="container">
				<h1 className="mb-8 flex items-center justify-center text-white font-semibold text-3xl lg:text-4xl">
					Daftar Tugas Saya
				</h1>
				<div className=" px-4 md:px-16 md:py-8 py-6">
					<form className="flex flex-col md:flex-row md:items-center md:space-x-4">
						<div className="flex flex-col md:flex-grow">
							<label htmlFor="name" className="text-form text-white text-xl ">
								Judul
							</label>
							<input
								type="text"
								id="name"
								name="name"
								className="form-input bg-bglight "
								autoComplete="off"
							/>
						</div>
						<div className="flex mt-2 md:mt-0 flex-col md:flex-grow">
							<label htmlFor="name" className="text-form text-white text-xl ">
								Deskripsi
							</label>
							<input
								type="text"
								id="name"
								name="name"
								className="form-input bg-bglight "
								autoComplete="off"
							/>
						</div>

						<button className="btn-primary mt-5 md:mt-7 bg-bglight text-primary font-bold md:w-auto">
							Tambah
						</button>
					</form>
				</div>
				{/* List Item */}
				<TodoItem
					key="1"
					title="Tugas Satu"
					description="Membuat laporan"
					onEdit=""
					onDelete=""
				/>
			</div>
		</section>
	);
};

export default Todos;
