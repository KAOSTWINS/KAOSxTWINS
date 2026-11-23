-- KAOSTWINS Blood Moon Court. Non-destructive, standalone tables.
-- All writes/reads performed through validated Edge Function service account.
CREATE TABLE IF NOT EXISTS public.bmc_verdict_votes (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 choice text NOT NULL CHECK (choice IN ('rasmus','renato','esmond','all_three','nobody')),
 fingerprint_hash text NOT NULL CHECK (length(fingerprint_hash) = 64),
 vote_day date NOT NULL DEFAULT (now() AT TIME ZONE 'UTC')::date,
 created_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE (fingerprint_hash,vote_day)
);
CREATE INDEX IF NOT EXISTS bmc_verdict_choice_idx ON public.bmc_verdict_votes(choice);
ALTER TABLE public.bmc_verdict_votes ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.bmc_verdict_votes FROM anon, authenticated;
GRANT ALL ON public.bmc_verdict_votes TO service_role;

CREATE TABLE IF NOT EXISTS public.bmc_court_whispers (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 pen_name text NOT NULL CHECK (char_length(pen_name) BETWEEN 2 AND 36),
 message text NOT NULL CHECK (char_length(message) BETWEEN 5 AND 280),
 status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
 fingerprint_hash text NOT NULL CHECK (length(fingerprint_hash) = 64),
 created_at timestamptz NOT NULL DEFAULT now(),
 reviewed_at timestamptz
);
CREATE INDEX IF NOT EXISTS bmc_whispers_status_date_idx ON public.bmc_court_whispers(status,created_at DESC);
CREATE INDEX IF NOT EXISTS bmc_whispers_fingerprint_date_idx ON public.bmc_court_whispers(fingerprint_hash,created_at DESC);
ALTER TABLE public.bmc_court_whispers ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.bmc_court_whispers FROM anon, authenticated;
GRANT ALL ON public.bmc_court_whispers TO service_role;
