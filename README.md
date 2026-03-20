# Agents Labs Chat PRO

Agents Labs Chat PRO is a team communications platform. This repository is a product fork based on [Rocket.Chat](https://github.com/RocketChat/Rocket.Chat) (MIT), rebranded for Agents Labs with custom logos and defaults.

**GitHub:** [github.com/ojfernandess/Agentslabs.chat](https://github.com/ojfernandess/Agentslabs.chat)

## Branding

- **Product name:** Agents Labs Chat PRO  
- **Default logo:** `/images/agentslabslogo.png` (source file: `agentslabslogo.png` in the repo root). Workspace defaults in `app/assets/server/assets.ts` point `logo` / `logo_dark` here.  
- **Favicons & PWA icons:** PNGs under `apps/meteor/public/images/logo/` (16–512px, Apple touch, mstiles) are generated from `agentslabslogo.png` via `sharp` (contain on a transparent background, except `mstile-310x150` which uses cover). The app serves them through the usual `/assets/favicon_*` routes.  
- **i18n:** Every locale that defines `registration.page.poweredBy` now names **Agents Labs Chat PRO** inside the `<1>` tag (same key, updated copy).

## GitHub e EasyPanel

- **[docs/EASYPANEL.md](docs/EASYPANEL.md)** — publicar no GitHub, gerar imagem **GHCR** com o workflow *Publish Docker image (GHCR / EasyPanel)*, e montar o serviço no EasyPanel (imagem Docker ou Compose).
- **`.env.example`** — variáveis mínimas (`ROOT_URL`, `MONGO_URL`, `MONGO_OPLOG_URL`).
- **`docker-compose.easypanel.yml`** — exemplo com MongoDB em replica set + app; substitua a imagem `ghcr.io/...` pela sua.

## Development

- **CI / native builds / Jest:** see [docs/CI.md](docs/CI.md).

- **Node:** 22.16.0 (see root `package.json` `engines`)
- **Yarn:** 4.12.0  
- Install: `yarn install`  
- Dev server: `yarn dev` (requires Meteor CLI, MongoDB, and other dependencies as in upstream documentation)

## Legal / upstream

Rocket.Chat is a trademark of Rocket.Chat Technologies Corp. This fork retains the MIT license from the upstream project. See `LICENSE` and upstream notices in the codebase.

For original Rocket.Chat documentation, see [rocket.chat](https://rocket.chat) and the [developer docs](https://developer.rocket.chat).
