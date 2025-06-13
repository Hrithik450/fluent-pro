import * as dotenv from "dotenv";
dotenv.config();

import * as schema from "../drizzle/schema";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

if (!process.env.NEXTDATABASE_URL) {
  throw new Error("DATABASE_URL is not set in environment variables.");
}

const pool = new Pool({
  connectionString: process.env.NEXTDATABASE_URL,
});

export const db = drizzle(pool, { schema });
