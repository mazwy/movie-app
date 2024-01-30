import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { faker } from "@faker-js/faker";
import * as dotenv from "dotenv";
import {genres, movies, users} from "./schema";
dotenv.config({ path: "./.env.development" });

if (!("DATABASE_URL" in process.env))
    throw new Error("DATABASE_URL not found on .env.development");

const main = async () => {
    const client = new Pool({
        connectionString: process.env.DATABASE_URL!,
    });
    const db = drizzle(client);
    let data: (typeof users.$inferInsert)[] = [];

    for (let i = 0; i < 20; i++) {
        data.push({
            id: i,
            email: faker.internet.email(),
            password: faker.internet.password(),
        });
    }

    console.log("Seed start");
    await db.insert(users).values(data);
    console.log("Seed done");

    // genres
    let genresData: (typeof genres.$inferInsert)[] = [];

    for (let i = 0; i < 5; i++) {
        genresData.push({
            id: i,
            name: faker.lorem.words(3)
        });
    }

    await db.insert(genres).values(genresData);

    let fakeMoviesData: (typeof movies.$inferInsert)[] = [];

    for (let i = 0; i < 20; i++) {
        fakeMoviesData.push({
            id: i,
            title: faker.lorem.words(3),
            year: faker.date.past().toString(),
            rated: faker.datatype.number(10).toString(),
            released: faker.date.past().toString(),
            genreId: faker.datatype.number(3)
        });
    }

    await db.insert(movies).values(fakeMoviesData);
}

main();