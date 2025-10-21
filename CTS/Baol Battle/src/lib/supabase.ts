import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Registration {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  filiere: string;
  gdpr_consent: boolean;
  created_at: string;
}

export interface PageView {
  id: string;
  page_path: string;
  user_agent: string | null;
  ip_address: string | null;
  created_at: string;
}
