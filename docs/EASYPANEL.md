# GitHub + EasyPanel

Guia para publicar o **Agents Labs Chat PRO** no GitHub e correr no [EasyPanel](https://easypanel.io).

## 1. Repositório no GitHub

Na pasta do projeto (com Git):

```bash
git init
git branch -M main
git remote add origin https://github.com/ojfernandess/Agentslabs.chat.git
git add .
git commit -m "chore: Agents Labs Chat PRO"
git push -u origin main
```

- Garanta que **não** commita ficheiros ignorados (`.env`, `node_modules`, `.tools/`).
- Obrigatório para publicar no GHCR: **Settings → Actions → General** → *Workflow permissions* → **Read and write permissions** → guardar. Sem isto, o workflow não consegue fazer *push* da imagem.

## 2. Imagem Docker no GitHub Container Registry (GHCR)

1. No GitHub: **Actions** → workflow **Publish Docker image (GHCR / EasyPanel)** → **Run workflow** (ou crie uma tag `v1.0.0` para disparar automaticamente).
2. A primeira compilação pode levar **muito tempo** (pacotes + Meteor).
3. Se o monorepo precisar de pacotes npm privados, adicione o secret **`NPM_TOKEN`** nas *Settings → Secrets*.
4. Ao terminar, a imagem fica em:

   `ghcr.io/ojfernandess/agentslabs.chat:latest`  
   (o nome do pacote no GHCR segue o repositório em **minúsculas**.)

## 3. MongoDB

O Rocket.Chat exige **MongoDB com replica set** (mesmo que seja um único nó).

- **Opção A:** Use o serviço `mongo` em `docker-compose.easypanel.yml` (já com `rs.initiate`).
- **Opção B:** MongoDB Atlas ou outro serviço gerido — use `MONGO_URL` e `MONGO_OPLOG_URL` com `replicaSet` na query string.

Variáveis típicas (ver também `.env.example`):

| Variável          | Exemplo |
|-------------------|---------|
| `ROOT_URL`        | `https://chat.seudominio.com` |
| `MONGO_URL`       | `mongodb://mongo:27017/rocketchat?replicaSet=rs0` |
| `MONGO_OPLOG_URL` | `mongodb://mongo:27017/local?replicaSet=rs0` |
| `PORT`            | `3000` |

## 4. EasyPanel

### Serviço só com imagem (recomendado)

1. **Project** → **Add Service** → **App**.
2. **Source:** Docker image (ou Registry).
3. **Image:** `ghcr.io/ojfernandess/agentslabs.chat:latest`  
   - Se o pacote for privado: nas credenciais do registry, utilize um PAT do GitHub com `read:packages`.
4. **Port:** `3000`.
5. **Environment:** cole `ROOT_URL`, `MONGO_URL`, `MONGO_OPLOG_URL`, etc.
6. Crie um serviço **MongoDB** à parte (ou use compose abaixo) e aponte `MONGO_URL` para esse host.

### Docker Compose

1. **Add Service** → **Compose**.
2. Copie o conteúdo de `docker-compose.easypanel.yml`.
3. Confirme `image: ghcr.io/ojfernandess/agentslabs.chat:latest` (ou a tag que publicou no GHCR).
4. Defina `ROOT_URL` para o domínio HTTPS que o EasyPanel associar ao serviço (pode usar variáveis mágicas da documentação do EasyPanel, ex. domínio primário).

## 5. Domínio e HTTPS

No EasyPanel, associe um domínio ao serviço da app e use **HTTPS**. O valor de **`ROOT_URL`** deve coincidir com a URL pública (incluindo `https://`).

## 6. Falhas comuns

- **Build Actions a falhar por memória:** usamos swap no workflow; em self-hosted runners, reserve pelo menos **8 GB RAM** + espaço em disco.
- **App não liga ao Mongo:** confirme replica set e que `MONGO_URL` inclui `replicaSet=...`.
- **`Head ... ghcr.io/.../manifests/latest: denied` (EasyPanel / docker pull):** o registo recusou o pedido. Ordem de verificação:
  1. O workflow **Publish Docker image** correu até ao fim com sucesso? Em **Actions** deve estar verde; em **github.com/ojfernandess?tab=packages** (ou a página *Packages* do repo) deve existir o pacote `agentslabs.chat` com tag `latest`.
  2. Se o workflow nunca publicou, não há imagem — corra o workflow ou corrija erros (permissões, `NPM_TOKEN`, etc.).
  3. Pacotes GHCR novos costumam ser **privados**. Para o EasyPanel puxar **sem** utilizador/senha: no GitHub abra o pacote → **Package settings** → **Change package visibility** → **Public**.
  4. Se quiser manter **privado**, no EasyPanel (Imagem Docker) preencha **Nome de utilizador** = `ojfernandess` e **Senha** = [Personal Access Token](https://github.com/settings/tokens) com scope **`read:packages`** (não use a password da conta).
  5. Nome da imagem: `ghcr.io/ojfernandess/agentslabs.chat:latest` (repositório em minúsculas; confira o nome exato na página do pacote no GitHub).
