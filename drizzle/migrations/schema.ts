import { pgTable, integer, text, date, numeric } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"
import {genres} from "../schema";



export const genre = pgTable("genre", {
	id: integer("id").primaryKey().notNull(),
	name: text("name"),
});

export const movie = pgTable("movie", {
	id: integer("id").primaryKey().notNull(),
	title: text("title"),
	year: date("year"),
	rated: numeric("rated"),
	released: date("released"),
	genreId: integer("genre_id").references(() => genres.id)
});

export const user = pgTable("user", {
	id: integer("id").primaryKey().notNull(),
	password: text("password"),
	email: text("email").notNull(),
});