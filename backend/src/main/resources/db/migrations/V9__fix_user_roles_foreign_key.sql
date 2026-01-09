-- Fix all foreign key references to use users(user_id)

-- Drop existing constraints and recreate with correct references
ALTER TABLE user_roles DROP CONSTRAINT IF EXISTS user_roles_user_id_fkey;
ALTER TABLE user_roles DROP CONSTRAINT IF EXISTS user_roles_role_id_fkey;
ALTER TABLE user_roles ADD CONSTRAINT user_roles_user_id_fkey
FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE;
ALTER TABLE user_roles ADD CONSTRAINT user_roles_role_id_fkey
FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE;

-- Fix likes table foreign key
ALTER TABLE likes DROP CONSTRAINT IF EXISTS fk_user;
ALTER TABLE likes ADD CONSTRAINT fk_user
FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE;

-- Fix comments table foreign key
ALTER TABLE comments DROP CONSTRAINT IF EXISTS fk_comments_user;
ALTER TABLE comments ADD CONSTRAINT fk_comments_user
FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE;

-- Ensure default roles exist
INSERT INTO roles (name) VALUES ('USER') ON CONFLICT (name) DO NOTHING;
INSERT INTO roles (name) VALUES ('ADMIN') ON CONFLICT (name) DO NOTHING;

-- Assign USER role to existing users who don't have any roles
INSERT INTO user_roles (user_id, role_id)
SELECT u.user_id, r.id
FROM users u
JOIN roles r ON r.name = 'USER'
WHERE NOT EXISTS (
    SELECT 1 FROM user_roles ur WHERE ur.user_id = u.user_id
);
