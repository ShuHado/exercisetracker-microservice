import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static("public"));

app.get("/", (req, res) => {
	res.sendFile(process.cwd() + "/views/index.html");
});

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
