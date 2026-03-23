# API - Node.Js + Express

API REST

## Descrição
 - Um sistema interno simples para organizzação de equipe.


## Pré-requisitos

- Node.js instalado
 
## Como rodar
 
### Instalar dependências

```bash

npm i

```
 
### Iniciar o servidor

```bash

npm index.js

```
 
### Acessar

Abra o navegador em `http://localhost:3000`
 
## Endpoints

 | Método | Endpoint | Descrição |
 | ----- | ----- | ----- |
 | GET | '/tarefas' | Lista todas tarefas |
 | GET | '/tarefas/:id' | Buscar uma tarefa específica |
 | POST | '/tarefas' | Cria uma nova tarefa |
 | PUT | '/tarefas/:id' | Atualiza uma tarefa |
 | DELETE | '/tarefas/:id' | Remove uma tarefa |



 ##Tecnologias 
 - Node.js
 - Express
 - Os dados são armazenados em memória RAM (reiniciar o servidor apaga tudo)


  -

 
