import Todo from "../models/TodoModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

export const getTodos = async (req, res) => {
	try {
		let todos = await Todo.findAll({
			attributes: ["uuid", "title", "description"],
			where: {
				userId: req.userId,
			},
			include: [
				{
					model: User,
					attributes: ["name", "email"],
				},
			],
		});
		res.status(200).json(todos);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getTodoById = async (req, res) => {
	try {
		const { uuid } = req.params;

		const todo = await Todo.findOne({
			attributes: ["uuid", "title", "description"],
			where: {
				[Op.and]: [{ uuid }, { userId: req.userId }],
			},
			include: [
				{
					model: User,
					attributes: ["name", "email"],
				},
			],
		});

		if (!todo) {
			return res.status(404).json({ message: "Todo tidak ditemukan!" });
		}

		res.status(200).json(todo);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const createTodo = async (req, res) => {
	const { title, description } = req.body;
	try {
		await Todo.create({
			title,
			description,
			userId: req.userId,
		});
		res.status(201).json({ message: "Todo berhasil ditambahkan!!!" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const updateTodo = async (req, res) => {
	try {
		const todo = await Todo.findOne({
			where: {
				uuid: req.params.uuid,
			},
		});

		if (!todo) return res.status(404).json({ message: "Data tidak ditemukan" });

		const { title, description } = req.body;

		if (req.userId !== todo.userId)
			return res.status(403).json({ message: "Akses terlarang!" });

		await Todo.update(
			{ title, description },
			{
				where: {
					[Op.and]: [{ id: todo.id }, { userId: req.userId }],
				},
			}
		);

		res.status(200).json({ message: "Todo berhasil diubah!" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const deleteTodo = async (req, res) => {
	try {
		const { uuid } = req.params;

		const todo = await Todo.findOne({
			where: {
				[Op.and]: [{ uuid }, { userId: req.userId }],
			},
		});

		if (!todo) {
			return res.status(404).json({ message: "Todo tidak ditemukan!" });
		}

		await todo.destroy();
		res.status(200).json({ message: "Todo berhasil dihapus" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
