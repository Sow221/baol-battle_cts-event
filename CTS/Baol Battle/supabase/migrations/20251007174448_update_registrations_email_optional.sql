/*
  # Update registrations table - Email optional

  ## Changes
  1. Modifications
    - Make email field optional (nullable) instead of required
    - Remove unique constraint on email to allow multiple null values
    - Users can now register without providing an email address

  ## Notes
    - This change supports flexibility in registration
    - Email remains available for those who wish to provide it
*/

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'registrations' AND column_name = 'email'
  ) THEN
    ALTER TABLE registrations ALTER COLUMN email DROP NOT NULL;
    
    ALTER TABLE registrations DROP CONSTRAINT IF EXISTS registrations_email_key;
  END IF;
END $$;