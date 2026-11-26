-- Supabase Migration for Arina Romantic Story

CREATE TABLE IF NOT EXISTS access_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    is_used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS access_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    token TEXT UNIQUE NOT NULL,
    code_id UUID REFERENCES access_codes(id) ON DELETE CASCADE,
    progress INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    last_active_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS verification_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ip TEXT,
    code_attempt TEXT,
    success BOOLEAN,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert default production code (LOVE-7777 or similar)
-- In production, update this code securely via Supabase dashboard.
INSERT INTO access_codes (code, is_used)
VALUES ('LOVE-7777', FALSE)
ON CONFLICT (code) DO NOTHING;

-- RPC Function to verify token securely
CREATE OR REPLACE FUNCTION verify_token(token TEXT)
RETURNS TABLE (valid BOOLEAN, progress INT)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT TRUE, t.progress
    FROM access_tokens t
    WHERE t.token = verify_token.token;

    IF NOT FOUND THEN
        RETURN QUERY SELECT FALSE, 0;
    END IF;
END;
$$;
