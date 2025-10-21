/*
  # Baol Battle Event Database Schema

  ## Overview
  This migration creates the database structure for the Baol Battle event website,
  including registration management and analytics tracking.

  ## New Tables
  
  ### `registrations`
  Stores participant registration information
  - `id` (uuid, primary key) - Unique identifier
  - `first_name` (text) - Participant's first name
  - `last_name` (text) - Participant's last name
  - `email` (text, unique) - Participant's email address
  - `filiere` (text) - Academic program/department
  - `gdpr_consent` (boolean) - GDPR consent confirmation
  - `created_at` (timestamptz) - Registration timestamp
  
  ### `page_views`
  Tracks website analytics
  - `id` (uuid, primary key) - Unique identifier
  - `page_path` (text) - Page that was viewed
  - `user_agent` (text) - Browser/device information
  - `ip_address` (text) - Visitor IP (anonymized)
  - `created_at` (timestamptz) - View timestamp

  ## Security
  - Enable RLS on all tables
  - Public can insert registrations and page views
  - Public can read basic registration count
  - Admin access requires authentication for full data access
  - No public access to personal data or detailed analytics
*/

-- Create registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE NOT NULL,
  filiere text NOT NULL,
  gdpr_consent boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create page views table for analytics
CREATE TABLE IF NOT EXISTS page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path text NOT NULL DEFAULT '/',
  user_agent text,
  ip_address text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Registrations policies
CREATE POLICY "Anyone can register"
  ON registrations
  FOR INSERT
  TO anon
  WITH CHECK (gdpr_consent = true);

CREATE POLICY "Authenticated users can view all registrations"
  ON registrations
  FOR SELECT
  TO authenticated
  USING (true);

-- Page views policies
CREATE POLICY "Anyone can record page views"
  ON page_views
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view analytics"
  ON page_views
  FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON registrations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_page_path ON page_views(page_path);