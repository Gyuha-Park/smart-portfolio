-- 1. Enable pgvector extension
create extension if not exists vector
with
  schema public;

-- 2. Create Tables

-- Projects Table
create table if not exists projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  short_description text,
  full_description text,
  tech_stack text[],
  thumbnail_url text,
  project_url text,
  github_url text,
  start_date date,
  end_date date,
  images text[],
  is_featured boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Skills Table
create table if not exists skills (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  category text, 
  proficiency integer check (proficiency between 1 and 100),
  icon_url text,
  display_order integer default 0,
  created_at timestamptz default now()
);

-- Profile Table (Singleton - one row)
create table if not exists profile (
  id uuid default gen_random_uuid() primary key,
  name text not null default '',
  title text default '',
  bio text default '',
  avatar_url text,
  resume_url text,
  email text,
  github_url text,
  linkedin_url text,
  website_url text,
  location text,
  updated_at timestamptz default now()
);

-- Careers Table (Work Experience)
create table if not exists careers (
  id uuid default gen_random_uuid() primary key,
  company text not null,
  role text not null,
  description text,
  start_date text not null,
  end_date text,
  is_current boolean default false,
  display_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Documents Table (For RAG Source Material)
create table if not exists documents (
  id uuid default gen_random_uuid() primary key,
  title text,
  source_type text not null,
  source_url text,
  content text not null,
  metadata jsonb,
  created_at timestamptz default now()
);

-- Embeddings Table (For RAG Vectors)
create table if not exists document_embeddings (
  id uuid default gen_random_uuid() primary key,
  document_id uuid references documents(id) on delete cascade,
  content text, 
  embedding vector(768), 
  metadata jsonb,
  created_at timestamptz default now()
);

-- Create index for faster vector similarity search
create index on document_embeddings using ivfflat (embedding vector_cosine_ops)
with (lists = 100);

-- Chat Logs Table
create table if not exists chat_sessions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid,
  created_at timestamptz default now()
);

create table if not exists chat_messages (
  id uuid default gen_random_uuid() primary key,
  session_id uuid references chat_sessions(id) on delete cascade,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null,
  created_at timestamptz default now()
);

-- Leads Table
create table if not exists leads (
  id uuid default gen_random_uuid() primary key,
  name text,
  email text,
  message text,
  source text,
  status text default 'new',
  created_at timestamptz default now()
);

-- 3. RLS Policies

-- Projects: Public Read, Authenticated Write
alter table projects enable row level security;
create policy "Public projects are viewable by everyone" on projects for select using (true);
create policy "Authenticated users can insert projects" on projects for insert with check (auth.role() = 'authenticated');
create policy "Authenticated users can update projects" on projects for update using (auth.role() = 'authenticated');
create policy "Authenticated users can delete projects" on projects for delete using (auth.role() = 'authenticated');

-- Skills: Public Read, Authenticated Write
alter table skills enable row level security;
create policy "Public skills are viewable by everyone" on skills for select using (true);
create policy "Authenticated users can insert skills" on skills for insert with check (auth.role() = 'authenticated');
create policy "Authenticated users can update skills" on skills for update using (auth.role() = 'authenticated');
create policy "Authenticated users can delete skills" on skills for delete using (auth.role() = 'authenticated');

-- Profile: Public Read, Authenticated Write
alter table profile enable row level security;
create policy "Public profile is viewable by everyone" on profile for select using (true);
create policy "Authenticated users can insert profile" on profile for insert with check (auth.role() = 'authenticated');
create policy "Authenticated users can update profile" on profile for update using (auth.role() = 'authenticated');
create policy "Authenticated users can delete profile" on profile for delete using (auth.role() = 'authenticated');

-- Careers: Public Read, Authenticated Write
alter table careers enable row level security;
create policy "Public careers are viewable by everyone" on careers for select using (true);
create policy "Authenticated users can insert careers" on careers for insert with check (auth.role() = 'authenticated');
create policy "Authenticated users can update careers" on careers for update using (auth.role() = 'authenticated');
create policy "Authenticated users can delete careers" on careers for delete using (auth.role() = 'authenticated');

-- Documents & Embeddings: Authenticated (Admin) Read/Write
alter table documents enable row level security;
create policy "Authenticated users can manage documents" on documents for all using (auth.role() = 'authenticated');

alter table document_embeddings enable row level security;
create policy "Authenticated users can manage embeddings" on document_embeddings for all using (auth.role() = 'authenticated');

-- Chat: Public Insert (for guests), Authenticated Read
alter table chat_sessions enable row level security;
create policy "Anyone can create chat sessions" on chat_sessions for insert with check (true);
create policy "Authenticated users can view chat sessions" on chat_sessions for select using (auth.role() = 'authenticated');

alter table chat_messages enable row level security;
create policy "Anyone can insert chat messages" on chat_messages for insert with check (true);
create policy "Authenticated users can view chat messages" on chat_messages for select using (auth.role() = 'authenticated');

-- Leads: Public Insert, Authenticated Read
alter table leads enable row level security;
create policy "Anyone can insert leads" on leads for insert with check (true);
create policy "Authenticated users can view leads" on leads for select using (auth.role() = 'authenticated');

-- 4. Storage Buckets (Projects)
insert into storage.buckets (id, name, public)
values ('projects', 'projects', true)
on conflict (id) do nothing;

create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'projects' );

create policy "Authenticated Upload"
on storage.objects for insert
with check ( bucket_id = 'projects' and auth.role() = 'authenticated' );

create policy "Authenticated Update"
on storage.objects for update
using ( bucket_id = 'projects' and auth.role() = 'authenticated' );

create policy "Authenticated Delete"
on storage.objects for delete
using ( bucket_id = 'projects' and auth.role() = 'authenticated' );
