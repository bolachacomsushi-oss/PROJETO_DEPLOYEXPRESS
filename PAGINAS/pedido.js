
// RECUPERAR CARRINHO SALVO
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// ATUALIZAR CARRINHO NA TELA
function atualizarCarrinho() {

    let lista = document.getElementById("itens");
    let total = 0;

    lista.innerHTML = "";

    carrinho.forEach((produto, index) => {

        let item = document.createElement("li");

        item.innerHTML = `
            ${produto.nome} - R$ ${produto.preco.toFixed(2)}
            <button onclick="remover(${index})">X</button>
        `;

        lista.appendChild(item);

        total += produto.preco;
    });

    if (carrinho.length === 0) {
        lista.innerHTML = "<li>Nenhum produto adicionado.</li>";
    }

    document.getElementById("total").textContent =
        total.toFixed(2);

    // SALVAR CARRINHO
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// REMOVER PRODUTO
function remover(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();
}

// FINALIZAR PEDIDO
function finalizarPedido(event) {

    event.preventDefault();

    if (carrinho.length === 0) {
        alert("Adicione produtos ao seu pedido!");
        return;
    }

    let nome = document.getElementById("nome").value;
    let pagamento = document.getElementById("pagamento").value;

    let total = carrinho.reduce(
        (soma, produto) => soma + produto.preco, 0
    );

    alert(
        "Pedido realizado!\n" +
        "Cliente: " + nome + "\n" +
        "Pagamento: " + pagamento + "\n" +
        "Total: R$ " + total.toFixed(2)
    );

    carrinho = [];

    atualizarCarrinho();
}

function mostrarPedido() {

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    let lista = document.getElementById("itens");
    let total = 0;

    lista.innerHTML = "";

    carrinho.forEach(function(produto) {

        let item = document.createElement("li");

        item.innerText = produto.nome + " - R$ " +
            produto.preco.toFixed(2).replace(".", ",");

        if (produto.observacao) {
            item.innerText += " | Observação: " + produto.observacao;
        }

        lista.appendChild(item);

        total += produto.preco;

    });

    document.getElementById("total").innerText =
        "R$ " + total.toFixed(2).replace(".", ",");
}

mostrarPedido();

// MOSTRAR PRODUTOS AO ABRIR A PÁGINA
atualizarCarrinho();
