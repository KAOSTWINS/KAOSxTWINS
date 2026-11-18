# KAOSTWINS V39 | Gabe's Filing Cabinet and Gage co-moderation

## What changed
- All approved residents MUST have a 12–420 character in-character comment from Gabriel Thorne (new Supabase `gabe_comment` field).
- Pending review page includes a comment box for each application. You, the authorised site owner, approve or reject.
- Public resident dossier shows the comment as an official signed note; rejected or pending characters remain private.
- This is a COMPLETE replacement package based on V38. It retains all existing KAOSTWINS universes and Eden Mall experiences.

## Daily Gage co-moderation
A recurring ChatGPT task was configured to review the pending queue around 08:00 Africa/Johannesburg and draft a recommended action plus a unique Gabe comment for each pending character. It MUST NOT approve or reject without your explicit confirmation. If the plugin is unavailable during a scheduled check, the task should report this.

## Live backend status
- Existing KAOSTWINS Supabase project: wpnsfvfrejykxccmdomi.
- Added migration: `eden_gabe_public_personnel_note`. Database verification is recommended before public launch.
- The website is not deployed automatically.
- Real submissions still require a working `eden-submit` Edge Function, Cloudflare Turnstile site key and secret, and the rest of the backend configuration.
- No authorised human moderators were seeded in Supabase. For chat-based joint review, the connected Supabase project can be used with explicit user instructions.

## How to deploy
Upload `index.html`, `assets/` and `eden-mall/` together, maintaining folder paths. Old V38 website files are replaced by this complete version.

## Safety
Only approved records are readable publicly through RLS. `gabe_comment` is a public in-character statement and should contain no real-person identifying information. Do not put service role or secret keys in the browser.

The private `eden_private.submission_limits` table currently has RLS disabled, although its schema is non-exposed and direct public permissions are revoked. The Supabase advisor recommends enabling RLS after reviewing the permission model. This was NOT changed automatically.
