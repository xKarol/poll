import dotenv from "dotenv";
import path from "path";

const isProduction = process.env.NODE_ENV === "production";
const isTest = process.env.NODE_ENV === "test";

if (isProduction) {
  dotenv.config();
} else if (isTest) {
  dotenv.config({ path: path.join(__dirname, "../../.env.test") });
} else {
  dotenv.config({ path: "./.env.dev" });
}
