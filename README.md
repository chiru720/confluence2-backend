# Confluence 2.0 Backend API

Backend API for Confluence 2.0, a collaborative document management system built with NestJS.

## Tech Stack

- **Framework**: NestJS 11.0
- **Language**: TypeScript
- **API Documentation**: Swagger/OpenAPI
- **Validation**: class-validator
- **Authentication**: JWT

## Getting Started

### Prerequisites

- Node.js 20.x or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd conf-2-backend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
The project includes a `.env.example` file. Copy it to create a `.env` file:
```bash
cp .env.example .env
```
Then edit the `.env` file to customize your environment settings.

4. Run the development server:
```bash
npm run start:dev
# or
yarn start:dev
```

5. The API server will be running at [http://localhost:3333/api/v1](http://localhost:3333/api/v1)
6. Access the Swagger documentation at [http://localhost:3333/api/v1/docs](http://localhost:3333/api/v1/docs)

## Project Structure

- `/src` - Source code
  - `/common` - Common code shared across the application
    - `/config` - Configuration files
    - `/constants` - Application constants
    - `/utils` - Utility functions
  - `/core` - Core application code
    - `/health` - Health check module
  - `/modules` - Feature modules
    - `/users` - User management
    - `/documents` - Document management
  - `app.module.ts` - Root application module
  - `main.ts` - Application entry point

## API Endpoints

The API includes the following endpoints:

- **Health Check**
  - GET `/api/v1/health` - Check API health

- **Users**
  - POST `/api/v1/users` - Create a new user
  - GET `/api/v1/users` - Get all users
  - GET `/api/v1/users/:id` - Get user by ID
  - PATCH `/api/v1/users/:id` - Update user
  - DELETE `/api/v1/users/:id` - Delete user

- **Documents**
  - POST `/api/v1/documents` - Create a new document
  - GET `/api/v1/documents` - Get all accessible documents
  - GET `/api/v1/documents/:id` - Get document by ID
  - PATCH `/api/v1/documents/:id` - Update document
  - DELETE `/api/v1/documents/:id` - Delete document

## Available Scripts

- `yarn start` - Start production server
- `yarn start:dev` - Start development server with hot reload
- `yarn start:debug` - Start server in debug mode
- `yarn build` - Build for production
- `yarn lint` - Run linting
- `yarn format` - Format code with Prettier
- `yarn test` - Run unit tests
- `yarn test:e2e` - Run end-to-end tests
- `yarn openapi:generate` - Generate OpenAPI specification
- `yarn openapi:copy` - Copy OpenAPI spec to frontend
- `yarn openapi:update-frontend` - Generate and copy OpenAPI spec in one step
- `yarn generate:client` - Generate API client from OpenAPI spec

## Future Enhancements

- Database integration with TypeORM
- Authentication with JWT and Google OAuth
- File upload functionality
- Real-time collaboration with WebSockets
- Redis caching for improved performance

## Database Migrations

This project uses TypeORM migrations to manage database schema changes. Migrations run manually using the provided scripts.

### Important: Database Synchronization vs Migrations

There are two ways to handle database schema changes:

1. **Synchronization Mode** (`DATABASE_SYNCHRONIZE=true`)
   - Automatically updates database schema to match entity definitions
   - **Only use during early development**
   - **Never use in production** - it can cause data loss!
   - Set to `false` before deploying or when working with real data

2. **Migrations** (recommended)
   - Makes explicit, versioned schema changes
   - Safe for production use
   - Provides rollback capability
   - Set `DATABASE_SYNCHRONIZE=false` and use migrations

### Running Migrations

To apply all pending migrations:

```bash
yarn migration:run
```

### Creating Migrations

There are two ways to create migrations:

1. **Generate from entity changes** (recommended):
   ```bash
   # Create a migration based on entity changes
   yarn migration:generate ./src/core/database/migrations/MigrationName
   ```

2. **Create an empty migration**:
   ```bash
   # Create an empty migration file
   yarn migration:create
   ```

For example:
```bash
yarn migration:generate ./src/core/database/migrations/CreateUsersTable
```

### Reverting Migrations

To revert the last applied migration:

```bash
yarn migration:revert
```

### Migration Best Practices

1. Always run migrations in development before deploying
2. Test both up and down migrations
3. Commit migration files to version control
4. Don't modify existing migrations that have been applied to production
5. Use descriptive names for migrations

### Example Migration Workflow

1. Make changes to your entity files (e.g., add a new column)
2. Generate migration: `yarn migration:generate ./src/core/database/migrations/AddUserEmailVerified`
3. Review the generated migration file 
4. Run the migration: `yarn migration:run`
5. Commit the migration file to version control

## License

[MIT](LICENSE)

## API Documentation

### Swagger UI

Swagger UI is available at [http://localhost:3333/api/v1/docs](http://localhost:3333/api/v1/docs) when the server is running in development mode. It provides an interactive documentation for all API endpoints.

### OpenAPI JSON

The OpenAPI specification JSON is available at:
- URL: [http://localhost:3333/api/v1/openapi.json](http://localhost:3333/api/v1/openapi.json)
- File: `./openapi.json` (generated automatically in development mode)

### Generating and Using OpenAPI Specification

The project includes scripts to handle OpenAPI specification generation and integration with the frontend:

1. **Generate OpenAPI Specification**:
   ```bash
   yarn openapi:generate
   ```
   This builds the application and generates an `openapi.json` file in the project root.

2. **Copy OpenAPI Spec to Frontend**:
   ```bash
   yarn openapi:copy
   ```
   This copies the generated OpenAPI spec to the frontend project at `../conf-2/openapi/openapi.json`.

3. **Generate and Copy in One Step**:
   ```bash
   yarn openapi:update-frontend
   ```
   This combines both steps - generates the OpenAPI spec and copies it to the frontend.

4. **Generate TypeScript Client**:
   ```bash
   yarn generate:client
   ```
   This generates an Axios-based TypeScript client in `./src/client` using [openapi-typescript-codegen](https://github.com/ferdikoomen/openapi-typescript-codegen).

### Frontend Integration

The OpenAPI specification is copied to the frontend project's `openapi` directory, where it can be used to:

- Generate type-safe API clients
- Provide accurate typing for API responses and requests
- Ensure frontend-backend contract consistency
- Support API documentation tools
