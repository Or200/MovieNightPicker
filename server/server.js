import express from "express";
import cors from "cors";
import * as fs from "fs/promises";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/loaddata", async (req, res) => {
  try {
    const data = await fs.readFile("data.json", "utf8");
    const jsonData = JSON.parse(data)
    res.status(200).json(jsonData)
  } catch (err) {
    console.error("Error reading file:", err);
    res.status(500).json({"error": err})

  }
});

app.get("/loadseats", async (req, res) => {
  try {
    const data = await fs.readFile("seats.json", "utf8");
    const jsonData = JSON.parse(data)
    res.status(200).json(jsonData)
  } catch (err) {
    console.error("Error reading file:", err);
    res.status(500).json({"error": err})

  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
