# Curadoria

Interface web de uma aplicação de curadoria cultural com inteligência artificial. Envie trechos de músicas, livros ou falas e receba interpretações profundas que revelam as camadas filosóficas, psicológicas e sociológicas do conteúdo.

## Acesse

**[curadoria.vercel.app](https://curadoria-front.vercel.app/curadorias)**

## Funcionalidades

- Cadastro e login com persistência de sessão
- Criação de curadorias com geração automática de insight por IA
- Listagem e visualização de curadorias salvas
- Regeneração de insight para curadorias sem análise
- Interface responsiva para mobile e desktop

## Tecnologias

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Shadcn/ui
- React Router DOM
- Axios
- Context API para gerenciamento de autenticação

## Como rodar localmente

**Pré-requisito:** backend rodando localmente ou apontar para a API em produção

1. Clone o repositório

```bash
git clone https://github.com/Guilherme-stack/curadoria-front.git
cd curadoria-front
```

2. Instale as dependências

```bash
npm install
```

3. Configure a variável de ambiente

```bash
cp .env.example .env
```

VITE_API_URL=http://localhost:3000 4. Rode o projeto

```bash
npm run dev
```

Acesse `http://localhost:5173`

## Estrutura do projeto

## Variáveis de ambiente

| Variável     | Descrição               |
| ------------ | ----------------------- |
| VITE_API_URL | URL base da API backend |

## Repositório do backend

[curadoria-app](https://github.com/Guilherme-stack/curadoria-app)
