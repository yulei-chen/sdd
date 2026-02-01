---
name: nuxt-skills
description: Follows Nuxt 4 project structure, composables, and config. Use when editing or adding Nuxt pages, composables, or config in this project.
---

# Nuxt 4 (this project)

## Structure

- **Pages**: `app/pages/`. `app/pages/index.vue` maps to `/`. Use `<NuxtPage />` in `app/app.vue` to render the current page.
- **Composables**: `app/composables/`. Auto-imported; no explicit import needed in pages or components.
- **Config**: `nuxt.config.ts` at repo root using `defineNuxtConfig()`.

## VueUse in Nuxt

VueUse’s `useStorage` is **not** auto-imported in Nuxt (Nitro provides its own `useStorage`). When using localStorage via VueUse, use an explicit import:

```ts
import { useStorage } from '@vueuse/core'
```

Use this in composables that persist client-side state (e.g. settings). Do not rely on auto-import for `useStorage` from VueUse.

## Reference

- [Nuxt 4 docs](https://nuxt.com/docs/4.x)
- [Nuxt 4 directory structure (app)](https://nuxt.com/docs/4.x/directory-structure/app)
