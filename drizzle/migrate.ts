import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const sql = postgres("postgres://postgres:admin@localhost:5432/postgres");
const db = drizzle(sql);

await migrate(db, { migrationsFolder: "drizzle" });
await sql.end();
