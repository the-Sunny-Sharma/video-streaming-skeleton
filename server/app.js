import express from "express";
import { createReadStream, statSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors()); // Enable CORS

app.get("/", (req, res) => {
  console.log("Request");
  res.send("Hello");
});

app.get("/video", (req, res) => {
  const filePath = `${__dirname}/public/video2.mkv`;

  const stat = statSync(filePath);
  const fileSize = stat.size;

  const range = req.headers.range;

  if (!range) {
    return res.status(400).send("Requires Range header");
  }

  const chunkSize = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + chunkSize - 1, fileSize - 1); // Correct the end value

  const contentLength = end - start + 1;

  const headers = {
    "Content-Range": `bytes ${start}-${end}/${fileSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  res.writeHead(206, headers);

  const fileStream = createReadStream(filePath, { start, end });
  fileStream.pipe(res);
});

export default app;
