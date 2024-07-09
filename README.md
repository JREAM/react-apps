# React Password Generator

- Vite Transpiler
- TypeScript
-

```bash
pnpm i
pnpm start
pnpm build
```

## Deploy to GH-Pages

At the moment I'm using Vite so I modify `vite.config.ts` with the proper `base` URL so that it appears on GH-Pages without a invalid `text/html` MIME type.

These two items in `package.json` are part of the `gh-pages` npm package:

```json
  "predeploy": "pnpm run build",
  "deploy": "gh-pages -d dist",
```

Simply run, `npm run deploy` and it will create a branch and transpile the project.

---

MIT Open Source

&copy; 2024 JREAM | Jesse Boyer
