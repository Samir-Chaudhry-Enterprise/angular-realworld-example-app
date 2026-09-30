[![RealWorld Frontend](https://img.shields.io/badge/realworld-frontend-%23783578.svg)](https://realworld-docs.netlify.app/)

# ![Angular Example App](logo.png)

> Angular codebase containing real-world examples (CRUD, auth, advanced patterns, etc.) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.

## Overview

This repository is the **Conduit** frontend — a social blogging site (a Medium.com clone) — implemented in Angular according to the [RealWorld](https://github.com/gothinkster/realworld) specification. It talks to any RealWorld-compliant REST backend and demonstrates CRUD operations, JWT authentication, routing with guards and lazy loading, pagination, and reactive forms using modern Angular (standalone components, functional interceptors and guards, the new control-flow syntax).

## Features

- Sign up / sign in with JWT authentication (token persisted in `localStorage`)
- Update your user settings (image, username, bio, email, password) and log out
- Create, view and delete articles (Markdown bodies rendered client-side with [marked](https://marked.js.org/))
- Add and delete comments on articles
- Paginated article lists: **Your Feed** (followed authors), **Global Feed**, and filtering by tag
- Popular tags sidebar
- Favorite / unfavorite articles
- Follow / unfollow other users
- Profile pages listing a user's own articles and their favorited articles

### Pages and routes

Routes are defined in `src/app/app.routes.ts` and `src/app/features/profile/profile.routes.ts` (HTML5 path-based URLs, no hash).

| Route                          | Page                                  | Guard                |
| ------------------------------ | ------------------------------------- | -------------------- |
| `/`                            | Home (feeds, tags, pagination)        | —                    |
| `/login`, `/register`          | Sign in / Sign up                     | Only when logged out |
| `/settings`                    | User settings + logout                | Only when logged in  |
| `/editor`, `/editor/:slug`     | Article editor                        | Only when logged in  |
| `/article/:slug`               | Article + comments                    | —                    |
| `/profile/:username`           | Profile — author's articles           | —                    |
| `/profile/:username/favorites` | Profile — author's favorited articles | —                    |

## Tech stack

Versions below are the ranges declared in `package.json`.

| Area                   | Package(s)                                                      | Version                         |
| ---------------------- | --------------------------------------------------------------- | ------------------------------- |
| Framework              | `@angular/*` (core, common, router, forms, platform-browser, …) | `20.0.0`                        |
| Build tooling / CLI    | `@angular/build`, `@angular/cli`                                | `^20.0.0`                       |
| Language               | `typescript`                                                    | `~5.8.3`                        |
| Reactive programming   | `rxjs`                                                          | `^7.4.0`                        |
| Rendering helpers      | `@rx-angular/template`, `@rx-angular/cdk`                       | `18.0.0`                        |
| Markdown               | `marked`                                                        | `^11.1.0`                       |
| Change detection       | `zone.js`                                                       | `~0.15.1`                       |
| Unit testing           | `karma` / `jasmine-core`                                        | `~6.4.1` / `~4.5.0`             |
| Formatting & git hooks | `prettier` / `husky` / `lint-staged`                            | `^3.1.1` / `^8.0.3` / `^15.2.0` |

Styling comes from the shared RealWorld/Conduit stylesheet, Ionicons and Google Fonts, all loaded from CDNs in `src/index.html`.

## Prerequisites

- **Node.js** `^20.19.0 || ^22.12.0 || >=24.0.0` (from the `engines` field in `package.json`)
- **npm** (bundled with Node.js)
- Google Chrome — only needed for running unit tests with Karma

The Angular CLI does not need to be installed globally; all commands below go through the npm scripts (or `npx ng …`).

## Getting started

### Install

```bash
npm install --legacy-peer-deps
```

> `--legacy-peer-deps` is currently required: `@rx-angular/cdk@18.0.0` declares a peer dependency on `@angular/core@^18.0.0`, which conflicts with Angular 20, so a plain `npm install` fails with `ERESOLVE`. The repository does not commit a lockfile.

Installing also runs the `prepare` script (`husky install`), which enables the git hooks in `.husky/`.

### Run the dev server

```bash
npm start
```

This runs `ng serve` with the `development` configuration. Open <http://localhost:4200/>; the app reloads automatically when source files change.

### Build

```bash
npm run build
```

Runs `ng build` with the default `production` configuration (optimized, hashed file names, bundle budgets). Output is written to `dist/angular-conduit/browser/`. Use `npx ng build --configuration development` for an unoptimized build with source maps.

### Available npm scripts

| Script            | Command           | Notes                                                                                                                                |
| ----------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `npm start`       | `ng serve`        | Dev server on port 4200                                                                                                              |
| `npm run build`   | `ng build`        | Production build into `dist/angular-conduit/`                                                                                        |
| `npm test`        | `ng test`         | Karma + Jasmine. **Currently fails**: there are no `*.spec.ts` files yet (see [Development guide](docs/DEVELOPMENT.md#testing))      |
| `npm run lint`    | `ng lint --force` | **Currently not functional**: no lint builder is configured in `angular.json` (see [Development guide](docs/DEVELOPMENT.md#linting)) |
| `npm run ng`      | `ng`              | Pass-through to the Angular CLI, e.g. `npm run ng -- generate component foo`                                                         |
| `npm run prepare` | `husky install`   | Runs automatically on install; sets up git hooks                                                                                     |

### Formatting

There is no dedicated format script. Prettier (default settings — there is no Prettier config file) is run automatically on staged files by the pre-commit hook. To format manually:

```bash
npx prettier --write "src/**/*.{ts,html,css,json}"
```

## Configuring the API base URL

The backend URL is hard-coded in the HTTP interceptor `src/app/core/interceptors/api.interceptor.ts`:

```ts
export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const apiReq = req.clone({ url: `https://api.realworld.io/api${req.url}` });
  return next(apiReq);
};
```

Services issue requests with relative paths (e.g. `/articles`, `/user`) and this interceptor prefixes every request. To point the app at a different RealWorld backend (for example one running locally), change that string, e.g. to `http://localhost:8080/api`. There are no `environment.ts` files or runtime configuration; the change requires a rebuild.

## Running with a backend

This app is a frontend only and needs a RealWorld-compatible API. See **[docs/FULL_STACK.md](docs/FULL_STACK.md)** for running it together with a backend.

## Project structure

```
.
├── angular.json              # Angular workspace: build / serve / test targets
├── package.json              # Dependencies, scripts, engines, lint-staged config
├── tsconfig*.json            # TypeScript config (strict mode, strict templates)
├── .husky/pre-commit         # Runs lint-staged (Prettier) before each commit
├── docs/                     # Additional documentation
└── src/
    ├── index.html            # Host page; loads Conduit CSS, Ionicons, fonts from CDNs
    ├── main.ts               # bootstrapApplication(AppComponent, appConfig)
    ├── styles.css            # Global styles
    ├── _redirects            # SPA fallback rule for static hosting (copied to build output)
    └── app/
        ├── app.component.*   # Root shell: header, <router-outlet>, footer
        ├── app.config.ts     # Providers: router, HttpClient + interceptors, auth initializer
        ├── app.routes.ts     # Top-level lazy routes and guards
        ├── core/
        │   ├── auth/         # Auth page, JwtService, UserService, User model, *ifAuthenticated
        │   ├── interceptors/ # api (URL prefix), token (Authorization header), error
        │   ├── layout/       # Header and footer
        │   └── models/       # Errors, LoadingState
        ├── features/
        │   ├── article/      # Home, article, editor pages; list/preview/meta/comment/favorite components; services
        │   ├── profile/      # Profile page + child routes, follow button, ProfileService
        │   └── settings/     # Settings page
        └── shared/
            ├── components/   # ListErrorsComponent
            └── pipes/        # MarkdownPipe (marked + DomSanitizer)
```

## Architecture summary

- **Standalone components** — there are no NgModules. The app is bootstrapped with `bootstrapApplication` and every component declares its own `imports`. Pages are lazy-loaded with `loadComponent` / `loadChildren`.
- **Functional HTTP interceptors** — registered via `provideHttpClient(withInterceptors([apiInterceptor, tokenInterceptor, errorInterceptor]))`:
  - `apiInterceptor` prefixes the API base URL,
  - `tokenInterceptor` adds `Authorization: Token <jwt>` when a token exists,
  - `errorInterceptor` unwraps `HttpErrorResponse` and re-throws the response body (`{ errors: { … } }`) for display by `ListErrorsComponent`.
- **JWT auth in localStorage** — `JwtService` reads/writes the `jwtToken` key. On startup, `provideAppInitializer` calls `GET /user` if a token is present to restore the session (the token is purged if that request fails).
- **Routing & guards** — inline functional `canActivate` guards based on `UserService.isAuthenticated`.
- **State** — no store library. `UserService` holds the current user in an RxJS `BehaviorSubject` and exposes `currentUser` / `isAuthenticated` observables; feature services are thin stateless `HttpClient` wrappers and page components keep local state. The `*ifAuthenticated` structural directive toggles UI by auth state, `RxLet` from RxAngular renders the tags stream, and subscriptions are cleaned up with `takeUntilDestroyed`.
- **Forms** — typed reactive forms for auth, settings, editor and comments.

See **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** for a component/service map, data and auth flows, and diagrams.

## Deployment

`npm run build` produces a static site in `dist/angular-conduit/browser/` that can be served by any static host.

Because the app uses path-based routing, the host must serve `index.html` for unknown paths. `src/_redirects` contains a Netlify-style rule that does this:

```
/*  /index.html 200
```

`angular.json` copies it to the root of the build output. On hosts that don't understand `_redirects`, configure an equivalent SPA fallback / rewrite rule. Remember to set the API base URL (see above) before building.

## Contributing

1. Fork the repo and create a feature branch.
2. Install dependencies and make your changes following the [development guide](docs/DEVELOPMENT.md).
3. Make sure `npm run build` succeeds. Commit normally — the Husky pre-commit hook formats staged files with Prettier; do not bypass it.
4. Open a pull request describing your change.

Please follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## License

[MIT](LICENSE)
