-- GET BLOGS
SELECT * FROM blogs

-- CREATING BLOGS
INSERT INTO blogs (authorName, blog)
VALUES ('Tejas Nanoti', 'Today I saw my nigga and now imma do it my way')

-- DELETE BLOG
DELETE FROM blogs
WHERE id = 2

-- UPDATE BLOG
UPDATE blogs
SET authorName = $1, blog = $2
WHERE id = $3
