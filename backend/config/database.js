import { Sequelize } from "sequelize";

const db = new Sequelize("todo_app", "root", "", {
	host: "localhost",
	dialect: "mysql",
});

export default db;
