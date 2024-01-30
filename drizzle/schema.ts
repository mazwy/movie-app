import {
    pgTable,
    text,
    integer,
    date,
    numeric, timestamp
} from "drizzle-orm/pg-core"
import postgres from "postgres";
import {drizzle} from "drizzle-orm/postgres-js";

export const users = pgTable("user", {
    id: integer("id").primaryKey(),
    password: text("password"),
    email: text("email").notNull()
});

export const genres = pgTable("genre", {
    id: integer("id").primaryKey(),
    name: text("name")
});

export const movies = pgTable("movie", {
    id: integer("id").primaryKey(),
    title: text("title"),
    year: date("year"),
    rated: numeric("rated"),
    released: date("released"),
    genreId: integer("genre_id").references(() => genres.id)
});

export const favoritemovies = pgTable("favoritemovie", {
    id: integer("id").primaryKey(),
    userId: integer("user_id").references(() => users.id),
    movieId: integer("movie_id").references(() => movies.id),
    added_at: timestamp("added_at").defaultNow()
});

const sql = postgres("postgres://postgres:admin@localhost:5432/postgres");
export const db = drizzle(sql);
