# CI / CD (GitHub Actions)

## Native modules (Linux, including ARM64)

Jobs use `ubuntu-24.04` / `ubuntu-24.04-arm`. Some dependencies ship prebuilt binaries only for x64; on **ARM64** (or when a prebuild is missing), packages compile from source:

- `bcrypt`, `sharp`, `isolated-vm`, `@swc/core`, `esbuild`, `@kaciras/deasync`, `mongodb-memory-server` (download + optional tools), etc.

The composite action [`.github/actions/setup-node`](../.github/actions/setup-node/action.yml) runs on Linux, before `yarn install`:

- `build-essential`, `python3`, `g++`, `make`
- `PYTHON=/usr/bin/python3` for **node-gyp**

Local dev on Linux ARM: install the same packages (`sudo apt install build-essential python3`).

## TypeScript + Jest (`@rocket.chat/jest-presets/client`)

[`packages/tsconfig/base.json`](../packages/tsconfig/base.json) sets `"moduleResolution": "node16"` and **`"module": "Node16"`** (TypeScript requires matching `module` / `moduleResolution` for the `node16` resolver). Packages that override `module` must keep the same pairing.

## Workspace build order

Run **`yarn build`** before jobs that need `packages/*/dist` (e.g. `packages/i18n/dist/resources` for Meteor). CI `packages-build` / typecheck / test jobs follow the monorepo dependency graph via Turborepo.

## Meteor `rocketchat-i18n`

If `apps/meteor/packages/rocketchat-i18n/i18n` is a placeholder file (typical on Windows checkouts), [`package.js`](../apps/meteor/packages/rocketchat-i18n/package.js) copies from `packages/i18n/dist/resources` after workspace packages are built.
