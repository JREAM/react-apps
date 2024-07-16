# React Apps

A small playground of miniature React Components for fun.

- **Preview**
  - [https://jream.github.io/react-apps/](https://jream.github.io/react-apps/)
- **Transpile**
  - [PNPM](https://pnpm.io/)
  - [Vite](https://vitejs.dev/)
    - [Vite Plugin Checker](https://www.npmjs.com/package/vite-plugin-checker) - For Live TypeScript Checking
  - [TypeScript](https://www.typescriptlang.org/)
- **Core**
  - [React](https://react.dev/)
  - [React Router](https://reactrouter.com/en/main)
- **Testing**
  - [Vitest](https://vitest.dev/)
  - [JSDom](https://github.com/jsdom/jsdom)
  - [@testing-library/react](https://testing-library.com/)
- **Frontend**
  - [Bootstrap](https://getbootstrap.com/)
  - [PopperJS](https://popper.js.org/)
  - [SASS](https://www.npmjs.com/package/sass)
- **Considering**
  - Might want [PurgeCSS](https://purgecss.com/) also later..

## Installation

```bash
# For PNPM
pnpm i
pnpm start

# For NPM
npm i
npm run start
```

## Deploy

I normally deploy to [Vercel](https://vercel.com/) but I'm using [GitHub](https://github.com/) Pages at the moment. The npm package `gh-pages` make this very nice.

At the moment I'm using [Vite](https://vitejs.dev/) and a minimal React setup.
These two items in `package.json` are part of the `gh-pages` npm package:

```json
"predeploy": "pnpm run build",
"deploy": "gh-pages -d dist",
```

Simply run, `npm run deploy` and it will create a branch and transpile the project.

### In GitHub Pages

- Add the URL for `homepage` in `package.json`
- Add a `404.html` by adding in `build`: `... cp dist/index.html dist/404.html`
- Change `createBrowserRouter` to `createHashRouter`
- There is a delay when the page is updated.
- I modified `vite.config.ts` with the `base` URL set to `./`
  - Allows it to appear on GitHub Pages without getting an invalid `text/html` MIME type.

---

> MIT Open Source

> &copy; 2024 [JREAM](https://jream.com) | Jesse Boyer
