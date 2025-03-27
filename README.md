# Votação

# Instruções para execução do projeto

### Usando Docker

**Requisitos**

- [**Git**](https://git-scm.com/downloads)
- [**Docker**](https://www.docker.com)

#### Passo a passo

1. Clone o repositório
    ```bash
    git clone https://github.com/laboratorio-de-praticas/votacao-fe.git
    ```

2. Acesse a pasta do projeto
    ```bash
    cd votacao-fe
    ```

3. Crie o Contêiner
    ```bash
    docker compose up
    ```

### Usando Node js (Sem Docker)

**Requisitos**

- [**Git**](https://git-scm.com/downloads)
- [**Node**](https://nodejs.org/)

#### Passo a passo

1. Clone o repositório
    ```bash
    git clone https://github.com/laboratorio-de-praticas/votacao-fe.git
    ```

2. Acesse a pasta do projeto
    ```bash
    cd votacao-fe
    ```

3. Instale as depêndencias:
    ```bash
    npm install
    ```

4. Execute o projeto em ambiente de desenvolvimento:
    ```bash
    npm run dev
    ```

5. (Opcional) Execute o projeto em ambiente de produção:
    ```bash
    npm run build && npm start
    ```