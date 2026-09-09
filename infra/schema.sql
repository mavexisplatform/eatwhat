-- EatWhat Database Schema (Supabase)
create extension if not exists "uuid-ossp";

create table users (
  id uuid primary key default uuid_generate_v4(),
  username text unique,
  display_name text not null default 'Guest',
  email text unique,
  is_guest boolean default false,
  created_at timestamptz default now()
);

create table sessions (
  id uuid primary key default uuid_generate_v4(),
  mode text not null,
  status text not null default 'pending',
  creator_id uuid references users(id),
  house_mode text,
  context jsonb,
  candidate_set jsonb,
  created_at timestamptz default now()
);

create table house_copy (
  copy_key text primary key,
  house_state text not null,
  mode text not null,
  trigger text not null,
  text text not null
);
