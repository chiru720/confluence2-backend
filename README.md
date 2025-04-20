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

- `npm run start` - Start production server
- `npm run start:dev` - Start development server with hot reload
- `npm run start:debug` - Start server in debug mode
- `npm run build` - Build for production
- `npm run lint` - Run linting
- `npm run format` - Format code with Prettier
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests

## Future Enhancements

- Database integration with TypeORM
- Authentication with JWT and Google OAuth
- File upload functionality
- Real-time collaboration with WebSockets
- Redis caching for improved performance

## License

[MIT](LICENSE)
