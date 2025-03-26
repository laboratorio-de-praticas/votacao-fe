<p align="center">
  <a href="https://fatecregistro.cps.sp.gov.br/" target="blank"><img src="https://bkpsitecpsnew.blob.core.windows.net/uploadsitecps/sites/40/2024/03/fatec_registro.png" width="300" alt="Fatec Logo" /></a>
</p>

  <p align="center">Laboratório de Práticas é de realização da <a href="https://fatecregistro.cps.sp.gov.br/" target="_blank">Fatec Registro</a> com o objetivo de acrescentar aos alunos um portfólio, e não menos importante, experiência!</p>
    <p align="center">
<a href="https://www.instagram.com/fatecregistro/" target="_blank"><img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Fatec Registro Instagram" /></a>
</p>

<h1 align="center">Votação</h1>

## 📖 Descrição do Projeto

Este projeto consiste no desenvolvimento de um sistema de votação para a faculdade, permitindo dois tipos de votação:

- **Votação interna e segura** para escolha de representantes de turma.
- **Votação pública** para eleger o melhor projeto das feiras tecnológicas **FTX e HubTec**.

O sistema deve ser seguro, acessível e funcional tanto para usuários internos (alunos e professores) quanto para o público externo. Além disso, o sistema contará com **dashboards e relatórios** detalhados para garantir transparência e permitir auditorias.

## 🛠️ Tecnologias Utilizadas

- JavaScript | React.js | Next.js |

## ⚙️ Como Rodar o Projeto

### 🔧 Pré-requisitos com Docker

- [**Git**](https://git-scm.com/downloads)
- [**Docker**](https://www.docker.com)

#### 🚀 Instalação e Execução

1. Clone o repositório
    ```bash
    git clone https://github.com/laboratorio-de-praticas/votacao-fe.git
    ```

2. Acesse a pasta do projeto
    ```bash
    cd votacao-fe
    ```
    
3. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie o Contêiner
    ```bash
    docker compose up
    ```

### 🔧 Pré-requisitos sem Docker

Antes de começar, certifique-se de ter instalado:

- [**Git**](https://git-scm.com/downloads)
- [**Node.js**](https://nodejs.org/)

#### 🚀 Instalação e Execução

1. Clone o repositório:
   ```bash
   git clone https://github.com/laboratorio-de-praticas/votacao-fe.git
   ```
   
2. Acesse a pasta do projeto
    ```bash
    cd votacao-fe
    ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Rodar o sistema em ambiente de desenvolvimento:
   ```bash
   npm run dev
   ```

O sistema estará rodando em `http://localhost:3000`.

## 🔍 Entendendo o Sistema

### 🎓 Votação dos Representantes

- Candidatos se inscrevem no sistema com o e-mail institucional.
- Apenas alunos da mesma turma podem votar (cada aluno pode votar apenas em um candidato).
- Candidatos indicam sua turma de ingresso ao se inscreverem.
- Após a inscrição, a candidatura ficará pendente até aprovação pelos superiores.

### 🏆 Votação dos Projetos na Feira

- Visitantes deverão fazer um **check-in** na recepção da feira com seu telefone.
- Para votar, o visitante informará seu telefone para validação.
- A votação será feita através de um **QR Code** disponível na bancada de cada equipe.
- Cada visitante poderá votar em quantos projetos quiser desde que seja **apenas um voto por projeto**.

## Votação dos Projetos por Avaliadores Externos

- O avaliador é obrigado a escolher entre dois critérios de avaliação (Projeto acolhedor e Projeto inovador), que serão classificados em 5 estrelas e uma caixa de comentário opcional.

### 🗳️ Tela de Votação

- Para a escolha do representante, a tela irá conter as informações do candidato junto de um botão **"Votar"**.
- Para a votação de um projeto da feira, a tela irá conter as informações do projeto junto de um botão **"Votar"**.
- A interface da votação conterá apenas um botão para registrar o voto.
- Além do voto, haverá **5 perguntas de avaliação**.
- As perguntas seguirão um critério de resposta: “ruim”, “bom” e “ótimo” (detalhes ainda a serem definidos).

---


📌 **Desenvolvido para proporcionar uma votação segura e transparente!**
