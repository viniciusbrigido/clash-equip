# Clash of Clans - Visualizador de Equipamentos dos Heróis

Uma aplicação React com backend Node.js para visualizar os equipamentos dos heróis de jogadores do Clash of Clans.

## 🚀 Como Executar

### 1. Configuração de Ambiente

**Backend:**
```bash
cd server
cp .env.example .env
# Edite o arquivo .env e adicione seu token da API do Clash of Clans
```

**Frontend:**
```bash
# Na raiz do projeto
cp .env.example .env
# O arquivo .env já vem configurado para desenvolvimento local
```

### 2. Backend (Node.js + Express)

```bash
cd server
npm install
npm run dev
```

O backend rodará na porta 5000.

### 3. Frontend (React)

```bash
# Na raiz do projeto
npm install
npm start
```

O frontend rodará na porta 3000.

## ⚙️ Configuração

### Variáveis de Ambiente

**Backend (`server/.env`):**
```env
CLASH_API_TOKEN=seu_token_da_api_aqui
PORT=5000
```

**Frontend (`.env`):**
```env
REACT_APP_API_URL=http://localhost:5000
```

### Como Obter o Token da API

1. Acesse https://developer.clashofclans.com/
2. Faça login com sua conta Supercell
3. Crie uma nova chave de API
4. Copie o token e cole no arquivo `server/.env`

## 🎯 Funcionalidades

- **Busca por Jogador**: Digite o ID do jogador para carregar seus dados
- **Visualização de Equipamentos**: Exibe todos os equipamentos dos heróis com imagens e níveis
- **Filtro por Herói**: Filtre equipamentos por herói específico
- **Interface Moderna**: Design clean em dark mode com cores do Clash of Clans
- **Responsivo**: Funciona perfeitamente em desktop e mobile

## 🏗️ Arquitetura

### Backend (`/server`)
- **Express.js**: Servidor web
- **CORS**: Permite requisições do frontend
- **Token fixo**: API token do Clash of Clans já configurado

### Frontend (`/src`)
```
src/
├── components/
│   ├── Header/              # Menu superior
│   ├── PlayerSearch/        # Busca de jogador
│   ├── HeroFilter/          # Filtros por herói
│   ├── EquipmentCard/       # Card individual de equipamento
│   └── EquipmentGrid/       # Grid de equipamentos
├── contexts/
│   └── ApiContext.js        # Gerenciamento da API
├── pages/
│   └── HeroEquipment/       # Página principal
└── App.js                   # Componente raiz
```

## 🎨 Design

- **Dark Mode**: Interface totalmente em modo escuro
- **Cores do Clash of Clans**: Laranja (#ff7730) e gradientes
- **Layout Clean**: Design minimalista e moderno
- **Animações**: Hover effects e transições suaves
- **Badges de Nível**: Coloridos por raridade do equipamento

## 🔧 Tecnologias

**Backend:**
- Node.js
- Express.js
- CORS
- node-fetch

**Frontend:**
- React 18
- React Router
- Context API
- CSS3 com gradientes e animações

## 📱 Como Usar

1. Execute o backend e frontend
2. Digite o ID do jogador (ex: Y292PGP0V)
3. Os equipamentos serão exibidos em um grid
4. Use os filtros de herói para ver equipamentos específicos

## 🔐 API e Segurança

- **Token seguro**: Token da API armazenado em variável de ambiente
- **URL configurável**: URL da API configurável via variável de ambiente
- **CORS configurado**: Permite requisições do frontend
- **Validação de entrada**: Validação de IDs de jogador

## 📝 Endpoints do Backend

- `GET /api/player/:playerId` - Busca dados do jogador
- `GET /api/test` - Teste de funcionamento

## 🎮 Como Obter o ID do Jogador

1. Abra o Clash of Clans
2. Vá para o seu perfil
3. O ID aparece no formato #XXXXXXX
4. Use apenas a parte após o # na aplicação (ex: Y292PGP0V)