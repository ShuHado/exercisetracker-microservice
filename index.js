import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const usersSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
});

const exercisesSchema = new mongoose.Schema({
	description: {
		type: String,
		required: true,
	},
	duration: {
		type: Number,
		required: true,
	},
	date: Date,
});

const User = mongoose.model("Users", usersSchema);
const Exercise = mongoose.model("Exercises", exercisesSchema);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/users", async (req, res) => {
	const username = req.body.username;
	const user = new User({
		username: username,
	});

	let output = await user.save();

	res.json({
		username: output.username,
		_id: output._id,
	});
});

app.get("/api/users", async (req, res) => {
	const users = await User.find({});

	res.json(users);
});

app.post("/api/users/:_id/exercises", async (req, res) => {
	const _id = req.params._id;
	const description = req.body.description;
	const duration = req.body.duration;
    let date;
	if (req.body.date) {
		date = new Date(req.body.date).toDateString();
	} else {
		date = new Date().toDateString();
	}

	const exercise = new Exercise({
		description: description,
		duration: duration,
		date: date,
	});

	let output = await exercise.save();
	let username = await User.findById(_id);
	res.json({
		username: username.username,
		description: output.description,
		duration: output.duration,
		date: output.date.toDateString(),
		_id: _id,
	});
});

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
