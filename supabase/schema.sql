-- Enable pgvector extension
create extension if not exists vector;

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
  category text, -- Frontend, Backend, DevOps, Design, etc.
  proficiency integer check (proficiency between 1 and 100),
  icon_url text,
  display_order integer default 0,
  created_at timestamptz default now()
);

-- Documents Table (For RAG Source Material)
create table if not exists documents (
  id uuid default gen_random_uuid() primary key,
  title text,
  source_type text not null, -- 'pdf', 'url', 'text'
  source_url text,
  content text not null, -- Full content
  metadata jsonb,
  created_at timestamptz default now()
);

-- Embeddings Table (For RAG Vectors)
create table if not exists document_embeddings (
  id uuid default gen_random_uuid() primary key,
  document_id uuid references documents(id) on delete cascade,
  content text, -- Chunk content
  embedding vector(768), -- Gemini text-embedding-004 dimension
  metadata jsonb,
  created_at timestamptz default now()
);

-- Create index for faster vector similarity search
create index on document_embeddings using ivfflat (embedding vector_cosine_ops)
with (lists = 100);

-- Chat Logs Table
create table if not exists chat_sessions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid, -- Nullable for anonymous guests
  created_at timestamptz default now()
);

create table if not exists chat_messages (
  id uuid default gen_random_uuid() primary key,
  session_id uuid references chat_sessions(id) on delete cascade,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null,
  created_at timestamptz default now()
);

-- Leads Table (Contact Form / Chat Leads)
create table if not exists leads (
  id uuid default gen_random_uuid() primary key,
  name text,
  email text,
  message text,
  source text, -- 'contact_form', 'chat'
  status text default 'new', -- 'new', 'contacted', 'archived'
  created_at timestamptz default now()
);

-- RLS Policies (Basic Setup - Adjust in Supabase Dashboard as needed)

-- Projects: Public Read, Admin Write
alter table projects enable row level security;
create policy "Public projects are viewable by everyone" on projects for select using (true);
create policy "Users can insert their own projects" on projects for insert with check (auth.role() = 'authenticated');
create policy "Users can update their own projects" on projects for update using (auth.role() = 'authenticated');
create policy "Users can delete their own projects" on projects for delete using (auth.role() = 'authenticated');

-- Skills: Public Read, Admin Write
alter table skills enable row level security;
create policy "Public skills are viewable by everyone" on skills for select using (true);
create policy "Authenticated users can insert skills" on skills for insert with check (auth.role() = 'authenticated');

-- Documents/Embeddings: Private (Admin only usually, unless chat needs access? Chat uses service role mostly)
alter table documents enable row level security;
alter table document_embeddings enable row level security;

-- Leads: Private (Admin only)
alter table leads enable row level security;
