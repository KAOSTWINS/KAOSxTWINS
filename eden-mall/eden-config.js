/* Public Supabase-only frontend settings. No Cloudflare, no secret keys.
   NEVER add a Supabase secret/service-role key here. */
window.EDEN_CONFIG = {
  supabaseUrl: 'https://wpnsfvfrejykxccmdomi.supabase.co',                // e.g. 'https://YOURPROJECT.supabase.co'
  publishableKey: 'sb_publishable_wyqvXssAiXoPnVhzid_wMQ_D9N9LcZn',             // sb_publishable_... (safe with correct RLS)
  // Edge Function name: eden-submit. Admin desk uses the same project.
};
