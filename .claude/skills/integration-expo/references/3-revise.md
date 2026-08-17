---
title: PostHog Setup - Revise
description: Review and fix any errors in the PostHog integration implementation
---

Check the project for errors. Read the package.json file for any type checking or build scripts that may provide input about what to fix. Remember that you can find the source code for any dependency in the node_modules directory. Do not spawn subagents.

Ensure that any components created were actually used.

Before considering this phase complete, run the repository's `npm run lint` script and its type-check script (`npm run typecheck` if defined in package.json, otherwise `npx tsc --noEmit`) and fix every error they report. This is required, not optional — do not finish this phase with outstanding lint or type errors in code you touched.

Additionally, once all other tasks are complete, run any prettier-like formatting script found in package.json, but ONLY on the files you have edited or created during this session. Do not run formatting across the entire project's codebase. This formatting pass is an extra step on top of the required lint/typecheck run above, not a substitute for it.

## Status

Status to report in this phase:

- Finding and correcting errors
- Report details of any errors you fix
- Linting, building and prettying

---

**Upon completion, continue with:** [4-conclude.md](4-conclude.md)