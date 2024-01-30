insert into public.user (id, password, email) values (1, 'password', 'email@email.com');

insert into genre (name) values ('Action');
insert into genre (name) values ('Comedy');
insert into genre (name) values ('Drama');
insert into genre (name) values ('Horror');

insert into movie (title, year, rated, released, genre_id)
values ('The Matrix', '1999-03-31', 16, '1999-03-31', 1);
insert into movie (title, year, rated, released, genre_id)
values ('The Matrix Reloaded', '2003-05-07', 16, '2003-05-07', 1);
insert into movie (title, year, rated, released, genre_id)
values ('The Matrix Revolutions', '2003-10-27', 13, '2003-10-27', 1);
insert into movie (title, year, rated, released, genre_id)
values ('The Big Lebowski', '1998-03-06', 18, '1998-03-06', 2);
insert into movie (title, year, rated, released, genre_id)
values ('Fargo', '1996-04-05', 16, '1996-04-05', 2);

insert into favoritemovie (user_id, movie_id)
values (1, 1);
insert into favoritemovie (user_id, movie_id)
values (1, 2);
insert into favoritemovie (user_id, movie_id)
values (2, 3);