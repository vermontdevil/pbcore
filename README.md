# PBCore - Pickleball Tournament Management System

A full-stack web application for managing pickleball tournaments, players, events, and scheduling.

## Tech Stack

### Frontend
- **Framework**: Astro with Svelte components
- **Language**: TypeScript
- **Auth**: Supabase JWT
- **Styling**: CSS-in-Svelte

### Backend
- **Framework**: Fastify (Express alternative)
- **Language**: TypeScript
- **Database ORM**: Prisma
- **Database**: PostgreSQL (via Supabase)
- **Auth**: Supabase JWT verification
- **Validation**: Zod

## Project Structure

```
pbcore/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── routes/          # API route definitions
│   │   ├── services/        # Business logic
│   │   ├── middleware/      # Auth, validation, error handling
│   │   ├── models/          # Data models
│   │   ├── schemas/         # Validation schemas
│   │   ├── config/          # Configuration (env, supabase, etc)
│   │   ├── db/             # Database utilities
│   │   ├── engine/         # Core tournament logic
│   │   ├── utils/          # Helper utilities
│   │   ├── app.ts          # Express app setup
│   │   └── server.ts       # Server entry point
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   └── migrations/     # Database migrations
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/          # Astro pages
│   │   │   ├── index.astro
│   │   │   ├── register.astro
│   │   │   └── tournaments/
│   │   │       └── create.astro
│   │   ├── lib/            # Shared utilities
│   │   │   └── auth.ts     # Auth store and client
│   │   └── components/     # Svelte components
│   └── package.json
│
└── SETUP.md                # Detailed setup instructions
```

## Features (Current)

### Authentication
- User registration with Supabase Auth
- Support for two user types: Players and Tournament Directors
- JWT-based session management
- Auth middleware protecting routes

### Tournaments
- Create tournaments (Tournament Directors only)
- View owned tournaments
- Tournament with dates and location

## Features (Planned)

- User login/authentication
- Tournament dashboard
- Event management within tournaments
- Participant registration
- Bracket generation (Single/Double Elimination, Round Robin)
- Match scheduling and scrambling
- Scoring and results tracking
- Player profiles and ratings
- Tournament reporting

## Getting Started

### Prerequisites
- Node.js 22.12.0 or higher
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
```bash
git clone <repo>
cd pbcore
```

2. **Set up Supabase** (see [SETUP.md](./SETUP.md) for detailed instructions)

3. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your Supabase credentials
npx prisma migrate deploy
npm run dev
```

4. **Frontend Setup** (in new terminal)
```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
npm run dev
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `GET /auth/me` - Get current user (requires Bearer token)

### Tournaments
- `POST /tournaments` - Create tournament (auth required)
- `GET /tournaments` - List user's tournaments (auth required)

## Development

### Running the Dev Server

**Backend** (Terminal 1):
```bash
cd backend
npm run dev
# Runs on http://localhost:4000
```

**Frontend** (Terminal 2):
```bash
cd frontend
npm run dev
# Runs on http://localhost:3000
```

### Building for Production

**Backend**:
```bash
cd backend
npm run build
npm run start
```

**Frontend**:
```bash
cd frontend
npm run build
npm run preview
```

## Authentication Flow

1. User registers via `/register` page
2. Credentials sent to Supabase Auth
3. JWT token returned from Supabase
4. Backend verifies token via Supabase API
5. User profile created in database
6. Token stored in browser local storage
7. Subsequent requests include Authorization header with Bearer token

## Database Schema

### User
- `id` (String, UUID from Supabase)
- `email` (String, unique)
- `firstName` (String)
- `lastName` (String)
- `userType` (Enum: PLAYER, TOURNAMENT_DIRECTOR)
- `createdAt` (DateTime)

### Tournament
- `id` (Int)
- `name` (String)
- `location` (String, optional)
- `startDate` (DateTime)
- `endDate` (DateTime, optional)
- `createdBy` (String, User ID)
- `createdAt` (DateTime)

### Player, Event, Team, Match
See `prisma/schema.prisma` for complete schema

## Environment Variables

### Backend (.env)
```
PORT=4000
SUPABASE_URL=https://yourproject.supabase.co
SUPABASE_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key
DATABASE_URL=postgresql://...
```

### Frontend (.env.local)
```
PUBLIC_SUPABASE_URL=https://yourproject.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Test locally
4. Submit a pull request

## License

MIT

## Support

For issues, questions, or contributions, please open an issue on GitHub.
