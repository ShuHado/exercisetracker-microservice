import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

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
