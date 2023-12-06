# Braing ag - challenge

👋 Olá, este é um projeto com foco em desenvolver uma dashboard para visualizar dados referentes a fazendas e seus proprietários

obs.: devido ao pouco tempo não consegui desenvolver com todos os detalhes e testes.

### ⚙️ How to run ?

#### run db:
```$ cd infra && sudo docker compose up```<br />

#### run backend with nvm:(in root fold)
```$ cd backend && nvm use && npx prisma migrate dev && npm run start```<br />

#### run backend without nvm: (in root fold)
```$ cd backend && npx prisma migrate dev && npm run start```<br />
__obs.:  node(20.10)__

#### run frontend with nvm?(in root fold)
```$ cd frontend && nvm use && npm run dev``` <br />

#### run frontend without nvm?(in root fold)
```$ cd frontend && npm run dev```<br />
__obs.:  node(20.10)__