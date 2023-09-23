function redirectToHome() {
    window.location.href = "Home.html";
  }

// Função para carregar o carrinho do localStorage
function carregarCarrinhoDoLocalStorage() {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) {
      carrinhoDeCompras = JSON.parse(carrinhoSalvo);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    // Carregar o carrinho do localStorage
    carregarCarrinhoDoLocalStorage();

    // Selecionar a lista de produtos no carrinho
    const listaProdutos = document.getElementById("lista-produtos");

    // Preencher a lista de produtos com os produtos do carrinho
    carrinhoDeCompras.forEach((produto) => {
        const produtoItem = document.createElement("li");
        produtoItem.textContent = `${produto.nome} - R$ ${produto.preco.toFixed(2)}`;
        listaProdutos.appendChild(produtoItem);
    });
});

// Função para limpar o carrinho
function limparCarrinho() {
    // Limpa o array de carrinhoDeCompras
    carrinhoDeCompras = [];
    
    // Remove o carrinho do localStorage
    localStorage.removeItem('carrinho');
    
    // Atualiza a exibição do carrinho (no caso, a lista de produtos)
    atualizarCarrinho();
    
    // Atualiza o número de produtos no carrinho para 0
    atualizarNumeroCarrinho();
}