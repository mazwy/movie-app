import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    schema: "drizzle/schema.ts",
    driver: 'pg',
    out: './drizzle/migrations',
    dbCredentials: {
        user: "postgres",
        password: "admin",
        host: "localhost",
        port: 5432,
        database: "postgres",
    },
    verbose: true,
    strict: true,
})

