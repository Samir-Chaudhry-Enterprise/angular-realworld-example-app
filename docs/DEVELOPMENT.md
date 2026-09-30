# Development guide

How to set up, run, test and contribute to the Conduit Angular frontend. For how the code is organized, see [ARCHITECTURE.md](ARCHITECTURE.md).

## Local setup

### Requirements

- Node.js `^20.19.0 || ^22.12.0 || >=24.0.0` (the `engines` field in `package.json`)
- npm (ships with Node.js)
- Google Chrome (or Chromium) for Karma unit tests

If you use [nvm](https://github.com/nvm-sh/nvm): `nvm install 22 && nvm use 22`.

### Install dependencies

```bash
npm install --legacy-peer-deps
```

Why `--legacy-peer-deps`: `@rx-angular/cdk@18.0.0` / `@rx-angular/template@18.0.0` declare a peer dependency on `@angular/core@^18.0.0`, while the app uses Angular `20.0.0`. npm 7+ treats that as an `ERESOLVE` error without the flag. No lockfile is committed, so `npm install` generates a local `package-lock.json`; don't include it in unrelated PRs.

The `prepare` script (`husky install`) runs as part of install and points git's hooks directory at `.husky/`.

### Run the app

```bash
npm start            # ng serve (development configuration)
```

Open <http://localhost:4200/>. By default the app calls the public RealWorld API configured in `src/app/core/interceptors/api.interceptor.ts`. To use another backend, edit the URL in that file (see the README section "Configuring the API base URL" and [FULL_STACK.md](FULL_STACK.md)).

Useful Angular CLI variations (via `npx ng` or `npm run ng --`):

```bash
npx ng serve --port 4300                        # different port
npx ng serve --configuration production         # serve a production build
npx ng build --configuration development        # unoptimized build with source maps
```

### Build configurations (`angular.json`)

| Configuration                       | Used by         | Notes                                                                                                                 |
| ----------------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------- |
| `production` (default for `build`)  | `npm run build` | Optimized, `outputHashing: "all"`; budgets: initial warn 500 kB / error 1 MB, component styles warn 2 kB / error 4 kB |
| `development` (default for `serve`) | `npm start`     | No optimization, source maps, named chunks                                                                            |

Build output goes to `dist/angular-conduit/browser/` and includes `_redirects` copied from `src/`.

## Testing

Unit tests are wired up for **Karma + Jasmine** through the `@angular/build:karma` builder (`test` target in `angular.json`, `tsconfig.spec.json` includes `src/**/*.spec.ts`). There is no `karma.conf.js`, so the builder's defaults apply (Chrome launcher).

```bash
npm test                                          # ng test (watch mode, opens Chrome)
npx ng test --watch=false --browsers=ChromeHeadless   # single headless run, e.g. for CI
```

If Chrome is not found automatically, set `CHROME_BIN` to the Chrome/Chromium executable.

> **Current state:** the repository contains **no `*.spec.ts` files**, so `npm test` currently fails at compile time with
> `TS18003: No inputs were found in config file 'tsconfig.spec.json'`.
> Adding the first spec file next to the code it tests (e.g. `src/app/core/auth/services/jwt.service.spec.ts`) makes the test target usable.

There is no end-to-end test setup.

## Linting

`package.json` defines `"lint": "ng lint --force"`, but **no lint builder is configured** in `angular.json`, so the command does not work today (Angular CLI 20 reports `Unknown argument: force`, and `npx ng lint` reports `Cannot find "lint" target`). To add linting, run `npx ng add angular-eslint`.

Type checking is strict and happens during every build/serve (`strict`, `noImplicitReturns`, `noPropertyAccessFromIndexSignature`, `strictTemplates`, etc. in `tsconfig.json`), so `npm run build` is the most reliable pre-PR check.

## Code style

- **Prettier** (`prettier@^3.1.1`) with its default settings — there is no `.prettierrc`, so Prettier 3 defaults apply (double quotes, semicolons, trailing commas, 80-column wrap).
- **EditorConfig** (`.editorconfig`): UTF-8, 2-space indentation, final newline, trim trailing whitespace (except in Markdown).
- Format manually with:

  ```bash
  npx prettier --write "src/**/*.{ts,html,css,json}"
  npx prettier --check "src/**/*.{ts,html,css,json}"
  ```

### Conventions used in the codebase

- Standalone components only; declare dependencies in the component's `imports`.
- Page components are `export default class …` so routes can `loadComponent: () => import("…")`.
- Services are `@Injectable({ providedIn: "root" })` and return `Observable`s, unwrapping the RealWorld envelope with `map`.
- Clean up subscriptions with `takeUntilDestroyed(this.destroyRef)` (`destroyRef = inject(DestroyRef)`).
- Use typed reactive forms (`FormGroup<…>`, `FormControl<…>` with `nonNullable: true`).
- Use the built-in control flow (`@if`, `@for … track …`) in templates.
- Component selector prefix: `app` (`angular.json` → `prefix`).
- Put app-wide concerns in `core/`, feature code in `features/<feature>/{pages,components,services,models}`, and reusable UI in `shared/`.

## Git hooks (Husky)

Husky `^8.0.3` is installed and enabled by the `prepare` script. The only hook is `.husky/pre-commit`:

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

`lint-staged` is configured in `package.json`:

```json
"lint-staged": {
  "*.{ts,html,css,json,md}": "prettier --write"
}
```

So every commit runs Prettier on the staged `.ts`, `.html`, `.css`, `.json` and `.md` files and re-stages the formatted result.

Troubleshooting:

- **Hook doesn't run** — make sure dependencies were installed (which runs `husky install`), or run `npm run prepare` manually.
- **Commit changes your files** — that's Prettier formatting them; review with `git diff HEAD~1`.
- Don't bypass the hook with `--no-verify`.

## Pre-PR checklist

1. `npm run build` succeeds with no new warnings or budget errors.
2. The app works against a RealWorld API (`npm start`).
3. Tests you added pass (`npx ng test --watch=false --browsers=ChromeHeadless`).
4. Commit through the Husky hook so staged files are Prettier-formatted.
