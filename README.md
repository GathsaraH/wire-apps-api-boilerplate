<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://www.wireapps.co.uk/images/morph-crow-1.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

   

<p align="center"><b>Wire Apps: The Ultimate <a href="http://nodejs.org" target="_blank">Nest.js</a> API Boilerplate</b></p>

---

## Introduction

Welcome to the **Wire Apps API Boilerplate**, your go-to solution for quickly building robust, scalable, and modular backend systems using the **Nest.js** framework. Designed with flexibility and scalability in mind, this boilerplate is perfect for:

- **Multi-Tenant Architectures:** Easily manage tenant-specific schemas and configurations.
- **Modular Applications:** Build maintainable systems with clear separation of concerns.
- **Rapid Development:** Pre-configured scripts and setup for fast deployment.

Whether you're building a SaaS application or enterprise-level APIs, this boilerplate has everything you need to hit the ground running.




## Features

- **Modular Architecture**: Separate feature modules for better code organization and scalability.
- **Multi-Tenancy Support**: Tenant-specific schemas and services.
- **CQRS Pattern**: Command and Query segregation for handling complex business logic.
- **Caching**: Built-in caching mechanisms with extensible strategies.
- **Logging**: SeriLog and Pino for advanced logging.
- **Database Management**: Prisma ORM with support for migrations and seeds.
- **API Response Standardization**: Consistent API responses across all endpoints.
- **Extensible**: Easily integrates with third-party services like Stripe and Redis.
- **Global Error Handling**: Centralized error handling with custom error codes.
- **File Uploading**: Provides pre-configured support for handling file uploads with secure validation, storage options, and customizable file limits. Easily integrate storage solutions like AWS S3 or local storage.


---

## Project Structure

---

```
.
├── prisma/                                  // Prisma-related files
│   ├── schema.prisma                        // Main schema for tenant-independent models
│   ├── tenant/                              // (Optional) Folder for tenant-specific schemas
│   └── migrations/                          // Migration files
├── src/
│   ├── main.ts                              // Application entry point
│   ├── app.module.ts                        // Root application module
│   ├── common/                              // Cross-cutting concerns
│   │   ├── decorators/
│   │   │   ├── cache.decorator.ts           // Decorator to enable caching
│   │   │   ├── roles.decorator.ts           // Example @Roles() decorator
│   │   │   └── user.decorator.ts            // Example @User() decorator
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts     // Handles HTTP exceptions globally
│   │   ├── interceptors/
│   │   │   ├── response-logging.interceptor.ts // Logs responses for debug purposes
│   │   │   └── transform-response.interceptor.ts // Transforms all responses into a consistent format
│   │   ├── constants/
│   │   │   └── error-codes.ts               // Centralized error codes
│   │   ├── types/
│   │   │   └── global.types.ts             // Shared types and interfaces
│   │   └── response/
│   │       └── api-response.ts             // API response structure (e.g., { data, error })
│   ├── core/                                // Core application services
│   │   ├── config/
│   │   │   ├── config.module.ts             // Configuration module
│   │   │   └── config.service.ts            // Provides environment variables
│   │   ├── database/
│   │   │   ├── prisma.service.ts            // Prisma client service
│   │   │   ├── prisma-tenant.service.ts     // Multi-tenant schema manager
│   │   │   └── database.module.ts           // Database module
│   │   ├── logging/
│   │   │   ├── serial-logger.module.ts      // Logging module
│   │   │   ├── serial-logger.service.ts     // Injectable logger
│   │   │   └── pino.config.ts               // Pino configuration file
│   │   └── cache/
│   │       ├── cache.module.ts              // Caching module
│   │       ├── cache.service.ts             // Injectable caching service
│   │       └── cache-strategy.interface.ts  // Cache strategy abstraction
│   ├── modules/                             // Application feature modules
│   │   ├── user/                            // Example: User module
│   │   │   ├── dto/
│   │   │   │   ├── create-user.dto.ts       // DTO: Create user
│   │   │   │   ├── update-user.dto.ts       // DTO: Update user
│   │   │   ├── user.controller.ts           // User-related HTTP routes
│   │   │   ├── user.module.ts               // User module setup
│   │   │   ├── user.repository.ts           // Data access for User
│   │   │   └── user.service.ts              // Business logic for User
│   │   ├── tenant/                          // Example: Tenant module
│   │   │   ├── dto/
│   │   │   │   ├── create-tenant.dto.ts     // DTO: Create tenant
│   │   │   │   ├── update-tenant.dto.ts     // DTO: Update tenant
│   │   │   ├── tenant.controller.ts         // Tenant-related HTTP routes
│   │   │   ├── tenant.module.ts             // Tenant module setup
│   │   │   └── tenant.service.ts            // Business logic for Tenant
│   │   └──
│   ├── shared/                              // Shared reusable components
│   │   ├── cqrs/
│   │   │   ├── command-bus.ts               // Handles command dispatching
│   │   │   ├── query-bus.ts                 // Handles query dispatching
│   │   │   ├── event-bus.ts                 // Event dispatching (if applicable)
│   │   │   ├── decorators/
│   │   │   │   ├── command-handler.decorator.ts // Decorator for command handlers
│   │   │   │   └── query-handler.decorator.ts   // Decorator for query handlers
│   │   ├── caching/
│   │   │   └── tenant-cache.decorator.ts    // Example: Cache decorator for tenant-specific data
│   │   └── response/
│   │       └── standardized-response.ts     // API response structure helper
│   ├── utils/                               // Utility functions
│   │   ├── date.util.ts                     // Date-related utilities
│   │   ├── validation.util.ts               // Validation utilities
│   │   └── encryption.util.ts               // Encryption and hashing utilities
├── .env                                     // Default environment variables
├── .eslintignore                            // ESLint ignore rules
├── .eslintrc.js                             // ESLint configuration
├── .gitignore                               // Git ignore rules
├── package.json                             // Node.js dependencies and scripts
├── tsconfig.json                            // TypeScript configuration
└── README.md                                // Project documentation
```
---
## Getting Started

### Multi-Tenancy Setup

If you want to use this boilerplate with multi-tenancy architecture, ensure you use the following commands:

- **Generate Prisma Client for Tenant Schema:**
  ```bash
  pnpm run db:generate:tenant
  ```
  This generates the Prisma client for the tenant-specific schema located in `prisma/tenant-schema.prisma`.

- **Push Tenant Schema to the Database:**
  ```bash
  pnpm run db:push:tenant
  ```
  This pushes the tenant-specific schema to the database.

- **Generate Prisma Client for Public Schema:**
  ```bash
  pnpm run db:generate:public
  ```
  This generates the Prisma client for the public schema located in `prisma/public-schema.prisma`.

- **Push Public Schema to the Database:**
  ```bash
  pnpm run db:push:public
  ```
  This pushes the public schema to the database.

### Default Modular Architecture

If you prefer the default modular architecture without multi-tenancy, you can remove `public-schema.prisma` and `tenant-schema.prisma` files. Use the following commands for Prisma migrations and client generation:

- **Run Prisma Migrations (Development):**
  ```bash
  pnpm run migrate:dev
  ```
  Applies migrations and creates a migration history.

- **Deploy Prisma Migrations (Production):**
  ```bash
  pnpm run migrate:deploy
  ```
  Deploys migrations to the production database.

- **Generate Prisma Client:**
  ```bash
  pnpm run generate
  ```
  Generates the Prisma client for the default schema.

---

### Prerequisites

- **Node.js** v18+
- **npm** v9+ or **pnpm** v8+
- **Docker** (optional, for services like Redis)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/gathsarah/nestjs-api-boilerplate.git
   cd nestjs-api-boilerplate
   ```

2. Install dependencies using pnpm:
   ```bash
   pnpm install
   ```

3. Configure environment variables by copying the example file:
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your database credentials and other environment-specific values.

4. Start the development server:
   ```bash
   pnpm run start:dev
   ```

5. Access the API at:
   ```
   http://localhost:5601
   ```

---

## Available Scripts

### Development

- **Start Development Server:**
  ```bash
  pnpm run start:dev
  ```
  Runs the application in development mode.

### Building

- **Build Application with Multi-Tenancy Support:**
  ```bash
  pnpm run build:tenant
  ```
  This command ensures tenant-specific schemas are generated and the application is built.

- **Build Application with Default Modular Architecture:**
  ```bash
  pnpm run build:public
  ```
  Builds the application using the default public schema.

### Prisma

- **Run Migrations:**
  ```bash
  pnpm run migrate:dev
  ```
  Creates and applies migrations to the database.

- **Deploy Migrations:**
  ```bash
  pnpm run migrate:deploy
  ```
  Deploys existing migrations to the database.

- **Generate Prisma Client:**
  ```bash
  pnpm run generate
  ```
  Generates the Prisma client for your schema.

### Testing

- **Run Unit Tests:**
  ```bash
  pnpm run test
  ```
  Executes unit tests.

- **Run E2E Tests:**
  ```bash
  pnpm run test:e2e
  ```
  Executes end-to-end tests.

### Linting

- **Run Linter:**
  ```bash
  pnpm run lint
  ```
  Lints the codebase for errors and enforces style rules.


---

## Key Concepts

### Multi-Tenancy

- Tenant-specific schemas are stored in the `prisma/tenant/` directory.
- `PrismaTenantService` manages tenant-specific database interactions.

### CQRS

- Commands and Queries are separated for better maintainability.
- Command handlers execute state-changing actions.
- Query handlers fetch data without modifying state.

### Logging

- Logging is managed via SeriLog and Pino.
- Customize log formatting in `core/logging/log-formatter.ts`.

### Caching

- Caching strategies are abstracted via `CacheStrategy` interface.
- Use `CacheService` to manage caching in your application.

---

## Technologies

- [NestJS](https://nestjs.com/) - Framework
- [Prisma](https://www.prisma.io/) - ORM
- [Redis](https://redis.io/) - Caching
- [Docker](https://www.docker.com/) - Containerization
- [Pino](https://getpino.io/) - Logging


---

## Contact

For questions or feedback, feel free to open an issue or contact the maintainer at `hello@gathsaraumesh.com`.

