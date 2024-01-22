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

const User = mongoose.model("Users", usersSchema);

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

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
