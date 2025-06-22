# React Conduit - Angular to React Migration Foundation

This project serves as the React foundation for converting the Angular RealWorld example app (Conduit) to React. It provides a complete project setup with all necessary dependencies and infrastructure to facilitate the Angular-to-React migration.

## Overview

Conduit is a Medium.com clone that demonstrates real-world application patterns including:

- User authentication and authorization
- Article creation, editing, and management
- Comment system
- User profiles and following
- Tag-based article filtering
- Social features (favoriting articles)

## Project Structure

The project follows a feature-based architecture that mirrors the original Angular application:

```
src/
├── core/                    # Core application services and utilities
│   ├── api/                # HTTP client configuration
│   ├── auth/               # Authentication services and state
│   │   ├── services/       # Auth service classes
│   │   ├── store/          # Zustand auth store
│   │   └── types/          # Auth-related TypeScript interfaces
│   ├── interceptors/       # HTTP interceptors (placeholder)
│   ├── layout/             # Layout components (placeholder)
│   └── models/             # Core data models and interfaces
├── features/               # Feature-specific modules
│   ├── article/            # Article management
│   │   ├── components/     # Article-related components
│   │   ├── pages/          # Article pages (home, editor, detail)
│   │   ├── services/       # Article API services
│   │   └── types/          # Article-related interfaces
│   ├── profile/            # User profile management
│   │   ├── components/     # Profile components
│   │   ├── pages/          # Profile pages
│   │   └── services/       # Profile API services
│   └── settings/           # User settings
├── shared/                 # Shared components and utilities
│   ├── components/         # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   └── utils/              # Utility functions
└── test/                   # Test configuration
```

## Technology Stack

### Core Dependencies

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **shadcn/ui** - Pre-built UI components

### State Management & Data Fetching

- **Zustand** - Lightweight state management (replaces RxJS patterns)
- **TanStack Query** - Server state management and caching
- **Axios** - HTTP client (replaces Angular HttpClient)

### Routing & Forms

- **React Router** - Client-side routing (replaces Angular Router)
- **React Hook Form** - Form handling (replaces Angular Reactive Forms)
- **Zod** - Schema validation

### Testing

- **Vitest** - Test runner (replaces Karma)
- **React Testing Library** - Component testing (replaces Angular testing utilities)
- **jsdom** - DOM environment for tests

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting (via lint-staged)

## Angular to React Migration Mapping

| Angular Concept      | React Equivalent             | Implementation                   |
| -------------------- | ---------------------------- | -------------------------------- |
| Services             | Service Classes + Hooks      | `AuthService`, `ArticlesService` |
| RxJS Observables     | Zustand + TanStack Query     | `useAuthStore`, `useQuery`       |
| Dependency Injection | React Context + Hooks        | Custom hooks like `useAuth`      |
| HTTP Interceptors    | Axios Interceptors           | `src/core/api/client.ts`         |
| Route Guards         | Protected Route Components   | Custom route wrapper components  |
| Reactive Forms       | React Hook Form + Zod        | Form validation and handling     |
| Angular CLI          | Vite                         | Build tool and dev server        |
| Karma/Jasmine        | Vitest/React Testing Library | Test runner and utilities        |

## Setup Instructions

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone or navigate to the project directory:

   ```bash
   cd react-conduit
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   # .env file is already created with default values
   # Update VITE_API_BASE_URL if needed
   ```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173/` with hot reloading enabled.

### Building

Create a production build:

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Testing

Run tests:

```bash
npm test          # Interactive mode
npm test -- --run # Run once
npm run test:coverage # With coverage report
```

### Linting

Run ESLint:

```bash
npm run lint
```

## Key Features Implemented

### ✅ Project Infrastructure

- [x] React + TypeScript setup with Vite
- [x] Tailwind CSS + shadcn/ui components
- [x] ESLint + Prettier configuration
- [x] Vitest + React Testing Library setup
- [x] Environment variable configuration

### ✅ Core Services

- [x] HTTP client with Axios interceptors
- [x] Authentication service and Zustand store
- [x] Articles service with full CRUD operations
- [x] TypeScript interfaces matching Angular models

### ✅ Development Workflow

- [x] Hot reloading development server
- [x] Production build optimization
- [x] Test runner configuration
- [x] Code quality tools (ESLint, Prettier)

### 🚧 Ready for Implementation

- [ ] React components (pages and UI components)
- [ ] Route protection and navigation
- [ ] Form implementations
- [ ] Error handling components
- [ ] Loading states and UI feedback

## Environment Variables

| Variable            | Description          | Default                        |
| ------------------- | -------------------- | ------------------------------ |
| `VITE_API_BASE_URL` | Backend API base URL | `https://api.realworld.io/api` |

## Available Scripts

| Script                  | Description              |
| ----------------------- | ------------------------ |
| `npm run dev`           | Start development server |
| `npm run build`         | Build for production     |
| `npm run preview`       | Preview production build |
| `npm test`              | Run tests in watch mode  |
| `npm test -- --run`     | Run tests once           |
| `npm run test:coverage` | Run tests with coverage  |
| `npm run lint`          | Run ESLint               |

## Next Steps for Migration

1. **Component Implementation**: Create React components for each Angular component
2. **Route Setup**: Implement protected routes and navigation
3. **Form Migration**: Convert Angular Reactive Forms to React Hook Form
4. **State Migration**: Move component state from RxJS to React patterns
5. **Testing**: Add comprehensive test coverage for all components
6. **Styling**: Implement responsive design with Tailwind CSS

## Contributing

This project follows the same patterns and conventions as the original Angular application to facilitate easy migration. When implementing new features:

1. Follow the established folder structure
2. Use TypeScript interfaces that match the Angular models
3. Implement services as classes with static methods
4. Use Zustand for global state management
5. Use TanStack Query for server state
6. Write tests for all new functionality

## License

MIT License - same as the original Angular RealWorld example app.
