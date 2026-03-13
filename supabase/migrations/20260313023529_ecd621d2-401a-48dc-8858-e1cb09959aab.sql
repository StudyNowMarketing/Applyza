ALTER TABLE courses
ADD CONSTRAINT courses_title_univ_unique
UNIQUE (title, university_name);