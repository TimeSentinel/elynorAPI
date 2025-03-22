-- Themes module tables
-- Load initial theme templates
-- (c) 2025 Lance Stubblefield

--initial password is 'admin'
INSERT INTO accounts.users("userID", "userName", "userPassword", "userEmail", "userPermissions", "userActive")
VALUES ('6b0e6e6c-aa58-4a9e-986d-5f2152fc1bca','admin','$2a$10$wBxqD2B4Z0ZXG0gsrXp5buieXwWjHy5eUfvcWecZSz5DNRfcDmW6O',
        'admin@sol3.one','{"admin","themes","products","gallery","news"}', '1');
