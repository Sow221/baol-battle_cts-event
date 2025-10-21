import { supabase } from './supabase';

export const trackPageView = async (pagePath: string = '/') => {
  try {
    const { error } = await supabase
      .from('page_views')
      .insert({
        page_path: pagePath,
        user_agent: navigator.userAgent,
        ip_address: null
      });

    if (error) {
      console.error('Error tracking page view:', error);
    }
  } catch (err) {
    console.error('Error tracking page view:', err);
  }
};
