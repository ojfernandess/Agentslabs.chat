# Abrir localmente no Docker (Docker Desktop)

Guia para executar o **Agents Labs Chat PRO** na sua máquina com [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Windows ou macOS), usando a imagem do **GitHub Container Registry (GHCR)**.

## Pré-requisitos

1. **Docker Desktop** instalado e **em execução** (ícone na bandeja → estado “Running”).
2. **Docker Compose v2.20+** (incluso no Docker Desktop recente — necessário para `include` em `docker-compose.local.yml`).
3. **Imagem no GHCR**, por padrão: `ghcr.io/ojfernandess/agentslabs.chat:latest`, gerada pelo workflow **Publish Docker image (GHCR / EasyPanel)** no GitHub. Sem build concluído com sucesso, o `docker pull` falha.

## Importante: um arquivo completo

Use **`docker-compose.local.yml`** na raiz do repositório. Ele **inclui** o stack (Mongo + app) e **publica a porta 3000** para o navegador.

**Não** execute só `docker-compose.docker-desktop.yml` — esse arquivo é só um *override* (portas) e **não** contém Mongo nem a definição completa da app; o comando falha ou sobe algo incompleto.

## Passo 1 — Obter o projeto

```bash
git clone https://github.com/ojfernandess/Agentslabs.chat.git
cd Agentslabs.chat
```

Você precisa dos arquivos `docker-compose.easypanel.yml` e `docker-compose.local.yml` na mesma pasta.

## Passo 2 — Login no GHCR (somente pacote privado)

Se o pacote da imagem estiver **público**, pode pular.

1. [Personal Access Token (classic)](https://github.com/settings/tokens) com escopo **`read:packages`**.
2. No terminal:

   ```bash
   docker login ghcr.io -u SEU_USUARIO_GITHUB
   ```

   Cole o **token** quando pedir senha.

## Passo 3 — Baixar as imagens

Na **raiz** do repositório:

```bash
docker compose -f docker-compose.local.yml pull
```

## Passo 4 — Subir e abrir no navegador

```bash
docker compose -f docker-compose.local.yml up -d
```

- **URL local:** **http://localhost:3000**
- A imagem já vem pronta do GHCR — **não** é necessário `--build` (isso só faria sentido se houvesse um `Dockerfile` nesse compose como contexto de build).

O `ROOT_URL` padrão no compose já é `http://localhost:3000`, adequado para acesso local.

## Alternativa (dois arquivos)

Se preferir não usar `include`:

```bash
docker compose -f docker-compose.easypanel.yml -f docker-compose.docker-desktop.yml pull
docker compose -f docker-compose.easypanel.yml -f docker-compose.docker-desktop.yml up -d
```

O resultado é o mesmo: **http://localhost:3000**.

## Porta 3000 ocupada

1. Edite `docker-compose.local.yml` (ou `docker-compose.docker-desktop.yml`, se usar a alternativa de dois arquivos) e altere para, por exemplo:

   ```yaml
   ports:
     - '3001:3000'
   ```

2. Suba de novo e defina `ROOT_URL` compatível, por exemplo no arquivo `.env` na raiz:

   ```env
   ROOT_URL=http://localhost:3001
   ```

3. Acesse **http://localhost:3001**.

## Variáveis opcionais (`.env` na raiz)

Exemplo:

```env
ROOT_URL=http://localhost:3000
```

## Ver logs

```bash
docker compose -f docker-compose.local.yml logs -f app
```

`Ctrl+C` para sair do *follow* (os containers continuam rodando).

## Parar

```bash
docker compose -f docker-compose.local.yml down
```

Com volumes (apaga dados do Mongo e uploads):

```bash
docker compose -f docker-compose.local.yml down -v
```

## Atualizar a imagem

```bash
docker compose -f docker-compose.local.yml pull
docker compose -f docker-compose.local.yml up -d
```

O `docker-compose.local.yml` usa **imagem pronta** do GHCR (`image:`), não um `Dockerfile` local — **`docker compose build` não reconstrói essa app**. Para obter uma imagem nova, o workflow **Publish Docker image** tem de ter corrido no GitHub; depois faça `pull` como acima.

## Container a reiniciar / erro `hono` ou `MODULE_NOT_FOUND`

1. **Imagem desatualizada** — faça `pull` da tag mais recente (`:latest` ou o SHA do commit que publicou a imagem).
2. **Mongo** — confirme que o serviço `mongo` está `Up` (`docker compose -f docker-compose.local.yml ps`). Sem Mongo com replica set, a app também pode falhar depois de arrancar.
3. A imagem inclui um *entrypoint* que instala `hono` e cria **shims** em `node_modules/hono/factory` e `.../combine` (o Meteor não usa `package.json#exports` para subpaths como `hono/factory`). É preciso **rede** no primeiro arranque se o *entrypoint* tiver de correr `npm install`.

## Resumo

| Ação | Comando |
|------|---------|
| Subir (local) | `docker compose -f docker-compose.local.yml up -d` |
| Abrir | **http://localhost:3000** |
| Parar | `docker compose -f docker-compose.local.yml down` |

## Se `include` não for suportado

Atualize o Docker Desktop ou use a **alternativa de dois arquivos** acima. Em versões muito antigas do Compose, faça *pull*/`up` com os dois `-f` manualmente.

## Ver também

- [EASYPANEL.md](./EASYPANEL.md) — deploy em servidor (EasyPanel).
- [README.md](../README.md) — visão geral do repositório.
