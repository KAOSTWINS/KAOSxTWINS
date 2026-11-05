-- KAOSTWINS COMMUNITY WALL · V19
-- Run ONCE in Supabase Dashboard -> SQL Editor -> New query -> Run.
-- This intentionally does not alter any pre-existing non-KAOSTWINS tables.
-- All four tables deny direct browser access; visitors use narrowly scoped functions.

create table if not exists public.kaos_rounds (
  id integer primary key,
  title text not null,
  subtitle text not null,
  active boolean not null default false,
  open boolean not null default true,
  created_at timestamptz not null default now()
);
create unique index if not exists kaos_one_active_round on public.kaos_rounds (active) where active;
insert into public.kaos_rounds (id,title,subtitle,active,open)
values (1,'YOU PICK. WE PANIC.','Season 01 · Vote for the next fictional catastrophe',true,true)
on conflict (id) do nothing;

create table if not exists public.kaos_poll_options (
  round_id integer not null references public.kaos_rounds(id) on delete cascade,
  code text not null,
  title text not null,
  tagline text not null,
  emoji text not null,
  sort_order smallint not null,
  primary key(round_id,code)
);
insert into public.kaos_poll_options(round_id,code,title,tagline,emoji,sort_order) values
  (1,'fable','Fable: The Heroic Complaint Department','Albion needs a Hero. The Oracle needs a holiday.','⚔️',1),
  (1,'motel','The Last Check-In','Five stars. Seven unexplained deaths.','🛎️',2),
  (1,'vampirehr','The Villain''s HR Department','Evil has benefits. Unfortunately.','📋',3),
  (1,'pirates','Mutiny & Margaritas','Pirates, romance and no survival instincts.','🏴‍☠️',4),
  (1,'monsters','Monster Support Group','Feelings, fangs and spectacular denial.','🧛',5)
on conflict(round_id,code) do update set title=excluded.title, tagline=excluded.tagline,emoji=excluded.emoji,sort_order=excluded.sort_order;

create table if not exists public.kaos_votes (
  round_id integer not null references public.kaos_rounds(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  code text not null,
  updated_at timestamptz not null default now(),
  primary key(round_id,user_id),
  foreign key(round_id,code) references public.kaos_poll_options(round_id,code)
);
create index if not exists kaos_votes_choice_idx on public.kaos_votes(round_id,code);

create table if not exists public.kaos_comments (
  id bigint generated always as identity primary key,
  round_id integer not null references public.kaos_rounds(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  parent_id bigint references public.kaos_comments(id) on delete set null,
  nickname text not null check(char_length(nickname) between 2 and 40),
  content text not null check(char_length(content) between 8 and 1200),
  kind text not null check(kind in ('idea','chat')) default 'chat',
  approved boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists kaos_comments_visible_idx on public.kaos_comments(round_id,approved,created_at desc);
create index if not exists kaos_comments_rate_idx on public.kaos_comments(user_id,created_at desc);

create table if not exists public.kaos_hearts (
  comment_id bigint not null references public.kaos_comments(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key(comment_id,user_id)
);

-- Defense in depth: do not expose raw votes, commenter user IDs or hidden comments.
alter table public.kaos_rounds enable row level security;
alter table public.kaos_poll_options enable row level security;
alter table public.kaos_votes enable row level security;
alter table public.kaos_comments enable row level security;
alter table public.kaos_hearts enable row level security;
revoke all on public.kaos_rounds,public.kaos_poll_options,public.kaos_votes,public.kaos_comments,public.kaos_hearts from public,anon,authenticated;

-- Only aggregate counts are returned, and only after the current visitor voted.
create or replace function public.kaos_poll_state()
returns jsonb language plpgsql stable security definer set search_path = '' as $$
declare r_id integer; r_title text; r_subtitle text; is_open boolean; selected_code text;
  options_data jsonb; total_votes integer;
begin
  if auth.uid() is null then raise exception 'Sign in anonymously first'; end if;
  select r.id,r.title,r.subtitle,r.open into r_id,r_title,r_subtitle,is_open
    from public.kaos_rounds r where r.active = true order by r.id desc limit 1;
  if r_id is null then raise exception 'No active poll'; end if;
  select v.code into selected_code from public.kaos_votes v
    where v.round_id = r_id and v.user_id = auth.uid();
  select coalesce(jsonb_agg(jsonb_build_object(
    'code',o.code,'title',o.title,'tagline',o.tagline,'emoji',o.emoji,
    'count',case when selected_code is null then null else
      (select count(*) from public.kaos_votes vv where vv.round_id=r_id and vv.code=o.code)
    end
  ) order by o.sort_order),'[]'::jsonb)
    into options_data from public.kaos_poll_options o where o.round_id = r_id;
  select count(*) into total_votes from public.kaos_votes v where v.round_id=r_id;
  return jsonb_build_object('roundId',r_id,'title',r_title,'subtitle',r_subtitle,
     'open',is_open,'selected',selected_code,'options',options_data,
     'total',case when selected_code is null then null else total_votes end);
end $$;

create or replace function public.kaos_cast_vote(p_code text)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare r_id integer;
begin
  if auth.uid() is null then raise exception 'Sign in anonymously first'; end if;
  select id into r_id from public.kaos_rounds where active and open limit 1;
  if r_id is null then raise exception 'Voting is closed'; end if;
  if not exists(select 1 from public.kaos_poll_options o where o.round_id=r_id and o.code=p_code)
    then raise exception 'Invalid ballot option'; end if;
  insert into public.kaos_votes(round_id,user_id,code)
    values(r_id,auth.uid(),p_code)
    on conflict(round_id,user_id) do update set code=excluded.code,updated_at=now();
  return public.kaos_poll_state();
end $$;

-- Approved public comments and the caller's own pending ones only.
create or replace function public.kaos_comment_feed()
returns jsonb language plpgsql stable security definer set search_path = '' as $$
declare r_id integer; items jsonb;
begin
  if auth.uid() is null then raise exception 'Sign in anonymously first'; end if;
  select id into r_id from public.kaos_rounds where active limit 1;
  if r_id is null then return '[]'::jsonb; end if;
  select coalesce(jsonb_agg(jsonb_build_object(
    'id',c.id,'parentId',c.parent_id,'nickname',c.nickname,'content',c.content,
    'kind',c.kind,'approved',c.approved,'own',c.user_id=auth.uid(),
    'createdAt',c.created_at,
    'hearts',(select count(*) from public.kaos_hearts h where h.comment_id=c.id),
    'hearted',exists(select 1 from public.kaos_hearts h where h.comment_id=c.id and h.user_id=auth.uid())
  ) order by c.created_at asc),'[]'::jsonb)
    into items from (
      select * from public.kaos_comments cc
      where cc.round_id=r_id and (cc.approved or cc.user_id=auth.uid())
      order by cc.created_at desc limit 90
    ) c;
  return items;
end $$;

create or replace function public.kaos_post_comment(
  p_nickname text, p_content text, p_kind text default 'chat', p_parent_id bigint default null
) returns jsonb language plpgsql security definer set search_path = '' as $$
declare r_id integer; new_id bigint;
begin
  if auth.uid() is null then raise exception 'Sign in anonymously first'; end if;
  select id into r_id from public.kaos_rounds where active limit 1;
  if r_id is null then raise exception 'Comments are unavailable'; end if;
  p_nickname:=btrim(coalesce(p_nickname,''));p_content:=btrim(coalesce(p_content,''));
  if char_length(p_nickname) < 2 or char_length(p_nickname) > 40
    then raise exception 'Nickname must contain 2 to 40 characters'; end if;
  if char_length(p_content) < 8 or char_length(p_content) > 1200
    then raise exception 'Comment must contain 8 to 1200 characters'; end if;
  if p_kind not in ('chat','idea') then raise exception 'Unknown comment type'; end if;
  if exists(select 1 from public.kaos_comments c
     where c.user_id=auth.uid() and c.created_at>now()-interval '60 seconds')
    then raise exception 'Please wait one minute between comments'; end if;
  if (select count(*) from public.kaos_comments c
      where c.user_id=auth.uid() and c.created_at>now()-interval '1 hour') >= 5
    then raise exception 'Comment limit reached. Please return in an hour'; end if;
  if p_parent_id is not null and not exists(
    select 1 from public.kaos_comments c
     where c.id=p_parent_id and c.round_id=r_id and c.approved
  ) then raise exception 'Cannot reply to that comment'; end if;
  insert into public.kaos_comments(round_id,user_id,parent_id,nickname,content,kind)
  values(r_id,auth.uid(),p_parent_id,p_nickname,p_content,p_kind)
  returning id into new_id;
  return jsonb_build_object('id',new_id,'pending',true);
end $$;

create or replace function public.kaos_toggle_heart(p_comment_id bigint)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare insert_count integer; final_count integer;
begin
  if auth.uid() is null then raise exception 'Sign in anonymously first'; end if;
  if not exists(select 1 from public.kaos_comments c
       join public.kaos_rounds r on c.round_id=r.id
       where c.id=p_comment_id and c.approved and r.active)
    then raise exception 'Comment not available'; end if;
  insert into public.kaos_hearts(comment_id,user_id) values(p_comment_id,auth.uid())
    on conflict do nothing;
  get diagnostics insert_count = row_count;
  if insert_count=0 then
    delete from public.kaos_hearts where comment_id=p_comment_id and user_id=auth.uid();
  end if;
  select count(*) into final_count from public.kaos_hearts where comment_id=p_comment_id;
  return jsonb_build_object('hearted',insert_count > 0,'count',final_count);
end $$;

-- Never grant table reads/writes to site visitors. Expose only these functions.
revoke execute on function public.kaos_poll_state() from public,anon,authenticated;
revoke execute on function public.kaos_cast_vote(text) from public,anon,authenticated;
revoke execute on function public.kaos_comment_feed() from public,anon,authenticated;
revoke execute on function public.kaos_post_comment(text,text,text,bigint) from public,anon,authenticated;
revoke execute on function public.kaos_toggle_heart(bigint) from public,anon,authenticated;
grant execute on function public.kaos_poll_state() to authenticated;
grant execute on function public.kaos_cast_vote(text) to authenticated;
grant execute on function public.kaos_comment_feed() to authenticated;
grant execute on function public.kaos_post_comment(text,text,text,bigint) to authenticated;
grant execute on function public.kaos_toggle_heart(bigint) to authenticated;

-- ADMIN: In Supabase -> Table Editor -> kaos_comments, set approved=true
-- for individual submissions you want to publish. Do not share admin keys.
