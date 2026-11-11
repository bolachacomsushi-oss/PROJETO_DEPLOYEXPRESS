let produto = JSON.parse(localStorage.getItem("produtoSelecionado"));

// Mostra as informações do produto
if (produto) {
    document.getElementById("nome").innerText = produto.nome;
    document.getElementById("descricao").innerText = produto.descricao;
    document.getElementById("preco").innerText = produto.preco;
    document.getElementById("imagem").src = produto.imagem;
}

// Adiciona o produto ao pedido
function adicionarPedido() {

    if (!produto) {
        alert("Não foi possível encontrar o produto!");
        return;
    }

    let quantidade = Number(document.getElementById("quantidade").value);
    let observacao = document.getElementById("observacao").value;

    if (quantidade < 1 || !Number.isInteger(quantidade)) {
        alert("Digite uma quantidade válida!");
        return;
    }

    // Recupera os produtos que já estão no carrinho
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    // Adiciona cada unidade escolhida
    for (let i = 0; i < quantidade; i++) {

        carrinho.push({
            nome: produto.nome,
            preco: produto.valor,
            observacao: observacao
        });

    }

    // Salva o carrinho
    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    alert("Produto adicionado ao pedido!");

    // Vai para a página do pedido
    window.location.href = "pedido.html";
}