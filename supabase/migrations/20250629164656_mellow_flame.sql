/*
  # Fix user profile creation trigger

  1. Functions
    - Create or replace the `handle_new_user` function that creates a profile when a user signs up
    - This function will be triggered automatically when a new user is created in auth.users

  2. Triggers  
    - Create trigger on auth.users table to call handle_new_user function
    - This ensures every new user gets a profile entry automatically

  3. Security
    - The function runs with security definer privileges to bypass RLS
    - This allows the trigger to insert into profiles table even with RLS enabled
*/

-- Create or replace the function that handles new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$;

-- Drop the trigger if it exists and recreate it
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create the trigger that fires when a new user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();