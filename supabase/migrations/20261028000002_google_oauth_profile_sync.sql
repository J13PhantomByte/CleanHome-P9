-- ============================================================================
-- Migration: 20261028000002_google_oauth_profile_sync.sql
-- Description: Add avatar_url column to profiles and update handle_new_user trigger
--              to capture Google OAuth user metadata (full name, avatar, email)
-- Author: CleanHome Senior Database Architect
-- ============================================================================

-- 1. Add avatar_url column to profiles if not present
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'profiles'
          AND column_name = 'avatar_url'
    ) THEN
        ALTER TABLE public.profiles ADD COLUMN avatar_url TEXT;
    END IF;
END $$;

-- 2. Enhanced handle_new_user trigger function supporting Google OAuth metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    raw_name TEXT;
    raw_avatar TEXT;
BEGIN
    -- Extract full name from Google OAuth metadata (full_name, name) or email prefix
    raw_name := coalesce(
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'name',
        split_part(NEW.email, '@', 1),
        'Customer'
    );

    -- Enforce safety length bounds
    raw_name := substr(trim(raw_name), 1, 100);
    IF length(raw_name) < 2 THEN
        raw_name := 'CleanHome Member';
    END IF;

    -- Extract avatar URL from Google OAuth metadata (avatar_url, picture)
    raw_avatar := coalesce(
        NEW.raw_user_meta_data->>'avatar_url',
        NEW.raw_user_meta_data->>'picture',
        NULL
    );

    INSERT INTO public.profiles (
        id,
        full_name,
        phone,
        address,
        avatar_url,
        created_at,
        updated_at
    )
    VALUES (
        NEW.id,
        raw_name,
        NULLIF(trim(NEW.raw_user_meta_data->>'phone'), ''),
        NULLIF(trim(NEW.raw_user_meta_data->>'address'), ''),
        NULLIF(trim(raw_avatar), ''),
        timezone('utc'::text, now()),
        timezone('utc'::text, now())
    )
    ON CONFLICT (id) DO UPDATE SET
        full_name = EXCLUDED.full_name,
        avatar_url = COALESCE(public.profiles.avatar_url, EXCLUDED.avatar_url),
        updated_at = timezone('utc'::text, now());

    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        -- Safely log and do not block auth creation
        RETURN NEW;
END;
$$;
