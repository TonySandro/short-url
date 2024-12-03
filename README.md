# SHORT URL API

Um encurtador de URL desenvolvido em **Node.js** utilizando **TypeScript**, seguindo os princípios da **Arquitetura Limpa** para manter alta modularidade e organização. O projeto oferece funcionalidades para encurtar URLs, autenticar usuários e redirecionar URLs encurtadas para seus destinos originais.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** e **Express**: Para construção do servidor.
- **TypeScript**: Tipagem estática e organização do projeto.
- **TypeORM**: ORM para gerenciamento de banco de dados relacional (**MySQL**).
- **Jest** e **Supertest**: Para testes unitários e de integração.
- **bcrypt** e **jsonwebtoken**: Para autenticação e segurança.
- **nanoid**: Geração de URLs encurtadas únicas.
- **validator**: Validação de entradas.

---

## 🚀 Funcionalidades

- **Cadastro de Usuários**: Registra novos usuários com validação de entrada.
- **Autenticação**: Login de usuários utilizando JWT.
- **Encurtamento de URLs**: Criação de URLs curtas que redirecionam para URLs originais.
- **Redirecionamento**: Acessa a URL original a partir de um código encurtado.
- **Contador de Cliques**: Incrementa automaticamente os cliques em URLs encurtadas.
- **Logs de Erros**: Registra erros no banco para análise posterior.

---

## 📂 Estrutura do Projeto

```
src/
├── data/               # Casos de uso e repositórios
├── domain/             # Interfaces e entidades de domínio
├── infra/              # Implementações de banco de dados e outros serviços
├── main/               # Configurações principais (rotas, server, etc.)
├── presentation/       # Controladores, validações e protocolos

```

---

## ⚙️ Scripts Disponíveis

No arquivo `package.json`, os seguintes scripts estão configurados:

| Comando            | Descrição                                                                 |
|--------------------|---------------------------------------------------------------------------|
| `yarn dev`         | Inicia o servidor em ambiente de desenvolvimento com **nodemon**.         |
| `yarn test`        | Executa os testes com **Jest**.                                           |
| `yarn test:verbose`| Executa os testes com mais detalhes.                                      |
| `yarn test:stg`    | Executa os testes em modo watch.                                          |
| `yarn test:ci`     | Executa os testes com cobertura para integração contínua.                |

---

## 🖥️ Configuração e Uso

### 1. **Pré-requisitos**

- Node.js (v16 ou superior)
- MySQL
- Yarn (opcional)

### 2. **Clone o Repositório**

```bash
git clone https://github.com/tonysduarte/url-shortener-api.git
cd url-shortener-api
```

### 3. **Instale as Dependências**

```bash
yarn
```

ou

```bash
npm i
```


### 4. **Inicie o Servidor**

```bash
yarn dev
```

O servidor será iniciado em `http://localhost:3000`.

---

## 🔗 Endpoints Principais

### **1. Cadastro de Usuário**

**POST** `/user`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

### **2. Encurtar URL**

**POST** `/url`

```json
{
  "originalUrl": "https://example.com"
}
```

**Resposta:**

```json
{
  "data": {
    "originalUrl": "https://example.com",
    "shortUrl": "abc123"
  },
  "newUrl": "http://localhost:3000/abc123"
}
```

### **3. Redirecionar URL**

**GET** `/:shortUrl`

Acesse `http://localhost:3000/abc123` e será redirecionado para a URL original.

---

## 🧪 Testes

Execute os testes configurados no projeto:

```bash
yarn test
```

Para executar com cobertura:

```bash
yarn test:ci
```

---

## ✍️ Autor

Desenvolvido por **Tony S. Duarte A.**.

---

## 📜 Licença

Este projeto está licenciado sob a **ISC License**.
