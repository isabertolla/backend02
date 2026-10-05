const express = require('express');
const cors = require('cors');
const supabase = require('./supabase');
const app = express();
const PORT = process.env.PORT || 3000;

//Middleware essenciais
app.use(cors());//Permite que o frontend acesse este backend sem erros de CORS
app.use(express.json());//Permite que o Express entenda requisições com corpo em JSON

//Passo 1 memória ram do servidor
let produtosEmMemoria=[
    {id:1, nome: 'Teclado Mecânico RGB', preco: 150.00},
    {id:2, nome: 'Mouse Gamer 3200 DPI', preco: 85.50}
];

//Rota GET 
app.get('/produtos', async (req, res) =>{
    console.log('[GET /produtos] Enviando produtos em memoria...')
    // res.json(produtosEmMemoria);
    const {data, error} = await supabase
    .from ('proddutos')
    .select('*')
    .order('id', {ascending: true});
    if (error) {
        return res.status(500).json({erro: error.message});
    }
    res.json(data);
});
//Rota POST 
app.post('/produtos', (req, res) =>{
    const {nome, preco} = req.body;
    if(!nome || !preco){
        return res.status(400).json({erro:'nome e preço são obrigatórios!'});
    }

    const novoProduto = {
        id:Date.now(),//gera um id temporario baseado no timestamp
        nome,
        preco: parseFloat(preco)
    };

    produtosEmMemoria.push(novoProduto);
    console.log(`[POST /produtos]Produto adicionado na RAM: ${novoProduto.nome}`);

    res.status(201).json(novoProduto);
});
//Rota de PUT: alterar um produto
app.put('/produtos/:id', (req, res) =>{
    const id = Number(req.params.id);
    const {nome, preco} = req.body;
    const produto = produtosEmMemoria.find((item) => item.id === id)

    if(!produto) {
        return res.status(404).json({mensagem: "Produto não Encontrado."});
    }
    if(typeof nome !=='string' || nome.trim() === '' || !Number.ifFinite(Number(preco))) {
        return res.status(400).json({ mensagem: "Informe um nome e preco válidos."});
    }
    produto.nome = nome.trim();
    produto.preco = parseFloat(preco);

    res.json(produto);
});
//Rota DELETE: remove um produto pelo id
app.delete('/produtos/:id', (req, res) => {
    const id = Number(req.params.id);
    const indice = produtos.findIndex((produtos) => produto.id === id);

    if (indice === -1) {
        return res.status(404).json({ mensagem: 'Produto não encontrado'});
    }

    const [produtoRemovido] = produtosEmMemoria.splice(indice, 1);
    res.json(produtoRemovido);
});
//listen
app.listen(PORT, () =>{
    console.log('============================================================');
    console.log(`Servidor Back-end rodando http://localhost:${PORT}`);
    console.log('Rota de produtos ativa em: http://localhost:300/produtos');
    console.log('Status: MODO MEMORIA RAM ATIVO');
    console.log('============================================================')
});
