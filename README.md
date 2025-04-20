# Confluence 2.0 Backend

A NestJS 11.0 application providing the API for the Confluence 2.0 document collaboration platform.

## Tech Stack

- **Framework**: NestJS 11.0
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM or Prisma
- **Authentication**: Passport.js with Google OAuth
- **API Documentation**: Swagger/OpenAPI
- **Testing**: Jest
- **Validation**: class-validator and class-transformer
- **Configuration**: NestJS ConfigModule with dotenv

## Project Structure

This project follows the recommended NestJS module-based architecture as outlined in our organization's coding standards:

```
/
├── .github/           # GitHub Actions workflows
├── .husky/            # Husky git hooks
├── .vscode/           # VSCode settings
├── src/               # Source code
│   ├── main.ts        # Application entry point
│   ├── app.module.ts  # Root application module
│   ├── common/        # Common code shared across modules
│   │   ├── constants/     # Application constants
│   │   ├── decorators/    # Custom decorators
│   │   ├── filters/       # Exception filters
│   │   ├── guards/        # Route guards
│   │   ├── interceptors/  # Request/response interceptors
│   │   ├── middleware/    # Custom middleware
│   │   ├── pipes/         # Validation pipes
│   │   └── utils/         # Utility functions
│   ├── config/        # Configuration modules and services
│   ├── core/          # Core application code
│   │   ├── database/      # Database connection and config
│   │   ├── auth/          # Authentication code
│   │   └── health/        # Health check endpoints
│   ├── modules/       # Feature modules
│   │   └── [module-name]/ # Each module follows standard structure
│   ├── shared/        # Shared resources between modules
│   └── types/         # TypeScript type definitions
├── test/              # End-to-end tests
├── .eslintrc.js       # ESLint configuration
├── .gitignore         # Git ignore file
├── .prettierrc        # Prettier configuration
├── nest-cli.json      # NestJS CLI configuration
├── package.json       # Project dependencies
├── tsconfig.json      # TypeScript configuration
└── tsconfig.build.json # TypeScript build configuration
```

## Module Structure

Each module follows a consistent structure:

```
/modules/[module-name]/
├── [module-name].module.ts      # Module definition
├── [module-name].controller.ts  # Controller for routing
├── [module-name].service.ts     # Service for business logic
├── [module-name].repository.ts  # Repository for data access (optional)
├── dto/                         # Data Transfer Objects
├── entities/                    # TypeORM entities
├── interfaces/                  # Interfaces for the module
└── tests/                       # Unit tests for the module
```

## Development Setup

### Prerequisites

- Node.js 18.17.0 or later
- npm or yarn or pnpm
- PostgreSQL 15+
- Git

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/chiru720/confluence2-backend.git
   cd confluence2-backend
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with your configuration settings (see Environment Variables section)

4. Start the development server
   ```bash
   npm run start:dev
   # or
   yarn start:dev
   # or
   pnpm start:dev
   ```

5. The API will be available at [http://localhost:3333](http://localhost:3333)

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Application
PORT=3333
NODE_ENV=development

# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=confluence_dev

# Authentication
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3333/auth/google/callback

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d
```

## Database Migrations

- Generate a migration: `npm run migration:generate -- -n MigrationName`
- Run migrations: `npm run migration:run`
- Revert migrations: `npm run migration:revert`

## API Documentation

Swagger documentation is available at [http://localhost:3333/api](http://localhost:3333/api) when the application is running.

## Branching Strategy

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - Feature branches (e.g., `feature/auth`, `feature/documents`)
- `bugfix/*` - Bug fix branches
- `release/*` - Release preparation branches

## Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - A new feature
- `fix:` - A bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code changes that neither fix bugs nor add features
- `test:` - Adding or updating tests
- `chore:` - Changes to build process or auxiliary tools

## Code Quality and Testing

- Run linting: `npm run lint`
- Run type checking: `npm run typecheck`
- Run tests: `npm run test`
- Run e2e tests: `npm run test:e2e`

## Deployment

The application is configured for deployment on AWS or similar cloud services using Docker containers.

## License

This project is proprietary and confidential.