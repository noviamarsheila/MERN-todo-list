import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/database.js";
import UserRoute from "./routes/AuthRoute.js";
import TodoRoute from "./routes/TodoRoute.js";
import SequelizeStore from "connect-session-sequelize";
// import Todos from "./models/TodoModel.js";

dotenv.config();
const app = express();

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
	db: db,
});

// (async () => {
// 	await Todos.sync({ alter: true });
// })();

// db.sync({ force: false }).then(() => {
// 	console.log("Database & tables created!");
// });

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		store: store,
		cookie: {
			secure: "auto",
		},
	})
);

app.use(
	cors({
		credentials: true,
		origin: "http://localhost:3000",
	})
);

app.use(express.json());

app.use(UserRoute);
app.use(TodoRoute);

app.listen(process.env.APP_PORT, () => {
	console.log("Server up and running..........");
});
