import * as dotenv from "dotenv";
dotenv.config();

import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

if (!process.env.NEXTDATABASE_URL) {
  throw new Error("Provide database URL!");
}

const migrationClient = postgres(process.env.NEXTDATABASE_URL as string, {
  max: 1,
});

async function main() {
  await migrate(drizzle(migrationClient), {
    migrationsFolder: "./src/lib/drizzle/migrations",
  });

  migrationClient.end();
}

main();
