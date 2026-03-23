const express = require('express'); // Importa o framework Express para criar o servidor e gerenciar rotas
const app = express(); // Cria uma instância do Express, que será usada para configurar o servidor e as rotas

app.use(express.json());

let tarefas = [];
let idAtual = 1;

// Criar tarefa 
app.post('/tarefas', (req, res) => {
    const { titulo, descricao, status } = req.body;

    // validação de título
    if (!titulo || titulo.trim() === "") {
        return res.status(400).json({ erro: 'Título é obrigatório' });
    }

    if (!descricao) {
        return res.status(400).json({ erro: 'Descrição é obrigatória' });
    }

    const novaTarefa = {
        id: idAtual++,
        titulo: titulo.trim(),
        descricao,
        status: status || 'pendente'
    };

    tarefas.push(novaTarefa);

    res.status(201).json(novaTarefa);
});

// Listar todas
app.get('/tarefas', (req, res) => {  
    res.status(200).json(tarefas);
});

// Buscar por ID 
app.get('/tarefas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tarefa = tarefas.find(t => t.id === id);

    if (!tarefa) {
        return res.status(404).json({ erro: 'Tarefa não encontrada' });  // Verifica se a tarefa existe e, se não existir, retorna um erro 404 (Not Found) informando que a tarefa não foi encontrada
    }

    res.status(200).json(tarefa);
});

// Atualizar tarefa
app.put('/tarefas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tarefa = tarefas.find(t => t.id === id);

    if (!tarefa) {
        return res.status(404).json({ erro: 'Tarefa não encontrada' });  // Verifica se a tarefa existe e, se não existir, retorna um erro 404 (Not Found) informando que a tarefa não foi encontrada
    }

    // não permitir alterar tarefa concluída
    if (tarefa.status === 'concluida') {
        return res.status(400).json({ erro: 'Não pode alterar tarefa concluída' });  // Verifica se a tarefa já está concluída e, se estiver, retorna um erro 400 (Bad Request) informando que não é possível alterar uma tarefa concluída
    }

    const { titulo, descricao, status } = req.body;

    // validação de título vazio
    if (titulo !== undefined && titulo.trim() === "") {
        return res.status(400).json({ erro: 'Título não pode ser vazio' });  // Verifica se o título foi fornecido e, se for o caso, se ele é vazio. Se o título for vazio, retorna um erro 400 (Bad Request) informando que o título não pode ser vazio
    }

    if (titulo !== undefined) tarefa.titulo = titulo.trim();  // Verifica se o título foi fornecido e, se for o caso, atualiza o título da tarefa com o valor fornecido, removendo espaços em branco no início e no final
    if (descricao !== undefined) tarefa.descricao = descricao;  // Verifica se a descrição foi fornecida e, se for o caso, atualiza a descrição da tarefa com o valor fornecido 
    if (status !== undefined) tarefa.status = status;  // Verifica se o status foi fornecido e, se for o caso, atualiza o status da tarefa com o valor fornecido

    res.status(200).json(tarefa);
});

// Deletar tarefa
app.delete('/tarefas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tarefas.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({ erro: 'Tarefa não encontrada' });
    }

    tarefas.splice(index, 1);

    res.status(204).send();
});

// Servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});