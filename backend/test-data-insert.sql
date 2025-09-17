-- Test script to manually insert data and verify database connection
USE portfolio_db;

-- Test inserting a simple skill
INSERT INTO skills (name, level, category, icon, color, created_at, updated_at) VALUES
('Test Skill', 75, 'Testing', 'fas fa-test', '#ff0000', '2024-01-01', '2024-01-01');

-- Test inserting a simple project
INSERT INTO projects (title, description, long_description, github_url, live_url, featured, category, date, created_at, updated_at) VALUES
('Test Project', 'A test project', 'This is a test project description', 'https://github.com/test', '', false, 'Test', '2024-01-01', '2024-01-01', '2024-01-01');

-- Test inserting a contact message
INSERT INTO contact_messages (name, email, subject, message, is_read, created_at, updated_at) VALUES
('Test User', 'test@example.com', 'Test Subject', 'This is a test message', false, '2024-01-01 10:00:00', '2024-01-01 10:00:00');

-- Verify the data was inserted
SELECT * FROM skills WHERE name = 'Test Skill';
SELECT * FROM projects WHERE title = 'Test Project';
SELECT * FROM contact_messages WHERE name = 'Test User';
