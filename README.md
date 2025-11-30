# Avaliação Formadora 4 – Módulo de Programação Móvel

Este repositório contém o código-fonte da aplicação para a Avaliação Formadora 4. O projeto é uma agenda de contatos digital criada com Ionic e Angular, consumindo dados de uma API pública e integrando Firebase.

## Tema

- Planejar a Gerência de Configuração, Controle de Versão e Mudança
- Gerar Script de Build e Produção para Aplicações Nativas

## Contexto

- Você foi designado para criar uma pequena aplicação de contatos usando Ionic e Firebase.
- Objetivo: demonstrar os conceitos básicos de controle de versão, criação de páginas e componentes, consumo de API RESTful, CRUD com Firebase e geração de build para produção.

## Objetivos do App

- Controle de versão com Git
- Criação de componentes e páginas
- Consumo de API RESTful
- CRUD com Firebase
- Geração de build para produção

## Tecnologias Utilizadas

- Ionic + Angular (`@ionic/angular`, Angular 20)
- Firebase SDK (`firebase`) com inicialização e Firestore
- Angular HttpClient para consumo de API REST
- ESLint com `@angular-eslint`
- Testes com Jasmine/Karma

## Tarefas a Serem Executadas

### Etapa 1 – Planejamento e Configuração Inicial 

- Criar pasta `projeto-contatos`
- Inicializar Git e criar `README.md` com: nome do projeto, objetivo do app, tecnologias utilizadas
- Fazer primeiro commit com a mensagem: `Versão inicial - Configuração de projeto`

Pista: usar `git init`, `git add .`, `git commit -m "mensagem"`.

### Etapa 2 – Criação de Componentes e Páginas 

- Criar projeto Ionic básico (template `blank`)
- Gerar páginas `listar-contatos` e `adicionar-contato`
- Gerar componente `contato-item`

Pista: `ionic start`, `ionic generate page`, `ionic generate component`.

### Etapa 3 – Consumo de Serviço RESTful 

- Criar serviço `api.service.ts` para consumir `https://jsonplaceholder.typicode.com/users`
- Exibir nome e e-mail dos usuários em `listar-contatos`

Pista: usar `HttpClient.get()` e `*ngFor` no HTML.

### Etapa 4 – CRUD com Firebase 

- Criar projeto no Firebase
- Configurar Firebase no projeto Ionic
- Implementar em `firebase.service.ts` funções para adicionar e listar contatos

Pista: habilitar Firebase e usar funções do SDK (ex.: `addDoc`, `collectionData`).

### Etapa 5 – Script de Build e Produção 

- No `package.json`, adicionar os scripts:
  - `start`: `ionic serve`
  - `build`: `ionic build --prod`
- Executar o build e fazer commit final: `Versão estável - Build gerado com sucesso`

Pista: `npm run build` gera a produção em `www/`.

## Como Executar

- Instalar dependências: `npm install`
- Desenvolvimento: `npm start` (abre `http://localhost:8101/`)
- Lint: `npm run lint`
- Testes: `npm test`
- Build de produção: `npm run build` (saída em `www/`)

## Proteção de Chaves

- Copiar `src/environments/firebase.config.example.ts` para `src/environments/firebase.config.ts` e preencher credenciais
- Arquivo real ignorado pelo Git:
  - `src/environments/firebase.config.ts`
  - `.env` e variações
  - `android/app/google-services.json`, `ios/**/GoogleService-Info.plist`
- `environment.ts` e `environment.prod.ts` importam `firebase.config`

