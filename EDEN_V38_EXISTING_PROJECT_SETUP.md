# KAOSTWINS V38 — Existing Supabase Project Integration

## Connected project
The website's existing public Supabase URL and publishable key are reused in eden-mall/eden-config.js. No new project has been created.
The moderator desk uses a distinct browser auth storageKey to avoid colliding with the KAOSTWINS community session.

## Already applied to existing Supabase database
Migration: eden_mall_resident_registry_v1 (20261117091811)
Tables: public.eden_residents; eden_private.moderators; eden_private.submission_limits
The existing kaos_... tables were NOT modified. The registry has zero submissions and zero moderators.

## Not yet live
- The site's eden-mall configuration is intentionally missing the Cloudflare Turnstile public site key.
- The eden-submit Edge Function has not been deployed or configured. No submission reaches your live database yet.
- An authorised moderator account has not been assigned.
- The updated files have not been deployed to the website.

## Next steps
1. In Cloudflare Turnstile, create a widget restricted to your live domain; put its PUBLIC site key into eden-mall/eden-config.js (not the secret).
2. Create and add a secret key for the Edge Function and configure the Turnstile secret, permitted origins, and rate-hashing secret server-side. NEVER commit secrets to GitHub.
3. Assign an existing non-anonymous Supabase Auth user to eden_private.moderators (Gabe's approver).
4. Add the site's /eden-mall/gabe-desk.html to Supabase Auth redirect allowlist.
5. Deploy the included eden-submit Edge Function (from the separate backend setup archive); use verify_jwt=false because this route requires no visitor login, but validates Turnstile on the server.
6. Test a pending submission, the moderator review, and approved-only publication before deploying the website package.

## Security notice
A Supabase table advisor flagged Eden's private rate-limit table for having RLS disabled. The table is in unexposed eden_private schema with public/anon/authenticated privileges revoked, but extra defense in depth would be to enable RLS without public policies. This has NOT been changed because the security advisor requires explicit user approval for that remediation. SQL, if approved:
ALTER TABLE eden_private.submission_limits ENABLE ROW LEVEL SECURITY;

The existing KAOSTWINS project also has pre-existing security advisor warnings about RLS policies and a PUBLIC security-definer function. Review them separately before a wider website security rollout; we did not change them.
