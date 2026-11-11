import fs from "fs";
import sharp from "sharp";

const svg = fs.readFileSync("src/app/icon.svg");
await sharp(svg).resize(32, 32).toFile("public/favicon.ico");
console.log("Wrote public/favicon.ico");
