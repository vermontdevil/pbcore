# PBCore Setup Guide

## Prerequisites
- Node.js 22.12.0+
- A Supabase account (https://supabase.com)

## Supabase Setup

### 1. Create a Supabase Project
1. Go to https://supabase.com and create a new project
2. Note down your:
   - Project URL (e.g., `https://yourproject.supabase.co`)
   - Anon Key (Public API Key)
   - Service Key (Can be found in Project Settings > API Keys)

### 2. Set Environment Variables

#### Backend (.env)
Create `/pbcore/backend/.env`:
```
PORT=4000
SUPABASE_URL=https://yourproject.supabase.co
SUPABASE_KEY=your_anon_key_here
SUPABASE_SERVICE_KEY=your_service_key_here
DATABASE_URL=postgresql://postgres:password@yourproject.supabase.co:5432/postgres
```

#### Frontend (.env.local)
Create `/pbcore/frontend/.env.local`:
```
PUBLIC_SUPABASE_URL=https://yourproject.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 3. Run Database Migrations
From the backend directory:
```bash
cd pbcore/backend
npx prisma migrate deploy
```

This will create all the necessary tables in your Supabase database.

## Running the Application

### Terminal 1: Start the Backend
```bash
cd pbcore/backend
npm run dev
```
The backend will run on `http://localhost:4000`

### Terminal 2: Start the Frontend
```bash
cd pbcore/frontend
npm run dev
```
The frontend will run on `http://localhost:3000`

## Features

### Registration Page (`/register`)
- Register as either a Player or Tournament Director
- Uses Supabase Authentication
- Creates user profile in the database

### Create Tournament Page (`/tournaments/create`)
- Available only to Tournament Directors
- Create new tournaments with name, location, and dates
- Tournaments are linked to the creating user

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `GET /auth/me` - Get current user (requires Bearer token)

### Tournaments
- `POST /tournaments` - Create a new tournament (requires auth)
- `GET /tournaments` - Get user's tournaments (requires auth)

## Authentication Flow
1. User registers via the register page
2. Supabase creates an auth user
3. Backend creates a corresponding database user record
4. JWT token is returned and stored in browser
5. All subsequent requests include the JWT token in the Authorization header

## Next Steps
- Add login page
- Create dashboard for players
- Add tournament details/editing
- Add event management within tournaments
- Add participant registration for events
