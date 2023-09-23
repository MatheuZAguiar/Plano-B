function redirectToHome() {
  window.location.href = "Home.html";
}

const produtos = [
  {
    id: 1,
    nome: "Vestido Floral",
    preco: 99.99,
    imagem: "https://source.unsplash.com/800x600/?dress",
  },
  {
    id: 2,
    nome: "Blusa de Verão",
    preco: 49.99,
    imagem: "https://source.unsplash.com/800x600/?summer-blouse",
  },
  {
    id: 3,
    nome: "Calça Jeans Skinny",
    preco: 79.99,
    imagem: "https://source.unsplash.com/800x600/?skinny-jeans",
  },
  {
    id: 4,
    nome: "Sapato de Salto Alto",
    preco: 129.99,
    imagem: "https://source.unsplash.com/800x600/?high-heels",
  },
  {
    id: 5,
    nome: "Bolsa Elegante",
    preco: 69.99,
    imagem: "https://source.unsplash.com/800x600/?elegant-purse",
  },
  {
    id: 6,
    nome: "Colar de Pérolas",
    preco: 29.99,
    imagem: "https://source.unsplash.com/800x600/?pearl-necklace",
  },
];

let carrinhoDeCompras = [];

function adicionarProdutoAoCarrinho(produtoId) {
  // Você deve buscar os detalhes do produto com base no produtoId
  const produto = produtos.find((p) => p.id === produtoId);

  // Verifique se o produto foi encontrado
  if (produto) {
    carrinhoDeCompras.push(produto);
    localStorage.setItem('carrinho', JSON.stringify(carrinhoDeCompras));

    // Atualize o número de produtos no carrinho
    atualizarNumeroCarrinho();

    // Atualize o botão para mostrar "Adicionado ao Carrinho" e desabilite-o
    const botao = document.querySelector(`#produto-${produtoId} button`);
    botao.textContent = "Adicionado ao Carrinho";
    botao.style.backgroundColor = "green";
    botao.disabled = true;

    // Configure um atraso para reverter o botão após 2 segundos (2000 milissegundos)
    setTimeout(() => {
      botao.textContent = "Adicionar ao Carrinho";
      botao.style.backgroundColor = "#007bff"; // Volte à cor original
      botao.disabled = false; // Reative o botão
    }, 2000);
  }
}

function atualizarNumeroCarrinho() {
  const numeroProdutosNoCarrinho = carrinhoDeCompras.length;

  // Atualize o conteúdo do elemento <span> no ícone do carrinho
  const numeroCarrinhoElement = document.getElementById("numero-carrinho");
  numeroCarrinhoElement.textContent = numeroProdutosNoCarrinho;
}

// Função para carregar o carrinho do localStorage
function carregarCarrinhoDoLocalStorage() {
  const carrinhoSalvo = localStorage.getItem('carrinho');
  if (carrinhoSalvo) {
    carrinhoDeCompras = JSON.parse(carrinhoSalvo);
  }
}

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

// Função para remover um produto do carrinho
function removerProdutoDoCarrinho(produtoId) {
  // Encontre o índice do produto no carrinho
  const indiceProduto = carrinhoDeCompras.findIndex((produto) => produto.id === produtoId);

  // Se o produto estiver no carrinho, remova-o
  if (indiceProduto !== -1) {
    carrinhoDeCompras.splice(indiceProduto, 1);
    // Atualize o carrinho no armazenamento local
    localStorage.setItem('carrinho', JSON.stringify(carrinhoDeCompras));
    // Atualize a exibição do carrinho
    atualizarCarrinho();
    // Atualize o número de produtos no carrinho
    atualizarNumeroCarrinho();
  }
}

// Preencher a lista de produtos com os produtos do carrinho
carrinhoDeCompras.forEach((produto) => {
  const produtoItem = document.createElement("li");
  produtoItem.textContent = `${produto.nome} - R$ ${produto.preco.toFixed(2)}`;

  // Botão para remover o produto do carrinho
  const botaoRemover = document.createElement("button");
  botaoRemover.textContent = "Remover";
  botaoRemover.onclick = () => removerProdutoDoCarrinho(produto.id);

  // Adicionar o botão de remoção ao item do produto
  produtoItem.appendChild(botaoRemover);

  listaProdutos.appendChild(produtoItem);
});



document.addEventListener("DOMContentLoaded", function () {
  // Carregar o carrinho do localStorage
  carregarCarrinhoDoLocalStorage();

  // Selecionar a lista de produtos no carrinho
  const listaProdutos = document.getElementById("lista-produtos");

// Função para calcular o valor total com base nos elementos "valor-total-checkout"
function calcularValorTotal() {
  let valorTotal = 0;

  carrinhoDeCompras.forEach((produto) => {
    const elementoProduto = document.querySelector(`#produto-${produto.id}`);
    const precoTotalText = elementoProduto.querySelector("#valor-total-checkout").textContent;
    const precoTotal = parseFloat(precoTotalText.match(/R\$\s(\d+\.\d{2})/)[1]);
    valorTotal += precoTotal;
  });

  return valorTotal.toFixed(2);
}


// Função para atualizar o valor total exibido
function atualizarValorTotal() {
  const valorTotalElement = document.getElementById("valor-total");
  const valorTotal = calcularValorTotal();
  valorTotalElement.textContent = `Valor Total: R$ ${valorTotal}`;
}

  // Criar o elemento <p id="valor-total"> e adicionar antes do botão "Limpar Carrinho"
  const valorTotalElement = document.createElement("p");
  valorTotalElement.id = "valor-total";
  valorTotalElement.textContent = `Valor Total: R$ 0.00`; // Valor inicial
  const botaoLimparCarrinho = document.getElementById("limpar-carrinho");
  botaoLimparCarrinho.parentNode.insertBefore(valorTotalElement, botaoLimparCarrinho);

  // Preencher a lista de produtos com os produtos do carrinho
  carrinhoDeCompras.forEach((produto) => {
    const produtoItem = document.createElement("li");
    produtoItem.classList.add("itens-checkout"); // Adicione uma classe para estilizar

    // Imagem do produto
    const imagemProduto = document.createElement("img");
    imagemProduto.src = produto.imagem;
    imagemProduto.alt = produto.nome; // Altura da imagem é o nome do produto
    produtoItem.appendChild(imagemProduto);

    // Informações do produto
    const infoProduto = document.createElement("div");
    infoProduto.classList.add("item-valor-checkout", "FGtam3");

    // Nome do produto
    const nomeProduto = document.createElement("p");
    nomeProduto.id = "produto-checkout";
    nomeProduto.textContent = produto.nome;
    infoProduto.appendChild(nomeProduto);

    // Preço subtotal
    const precoSubtotal = document.createElement("p");
    precoSubtotal.id = "valor-checkout";
    precoSubtotal.textContent = `Subtotal: R$ ${produto.preco.toFixed(2)}`;
    infoProduto.appendChild(precoSubtotal);

    // Adicionar informações do produto ao item do produto
    produtoItem.appendChild(infoProduto);

    // Div para quantidade
    const divQuantidade = document.createElement("div");
    divQuantidade.classList.add("qtde-checkout", "FGtam2");

    // Botão de decremento
    const botaoDecremento = document.createElement("button");
    botaoDecremento.id = "btnmenos-checkout";
    botaoDecremento.textContent = "-";
    divQuantidade.appendChild(botaoDecremento);

    // Quantidade
    const quantidadeInput = document.createElement("span");
    const quantidadeInputValue = document.createElement("input");
    quantidadeInputValue.type = "text";
    quantidadeInputValue.value = "1";
    quantidadeInputValue.disabled = true;
    quantidadeInputValue.id = "counterValue";
    quantidadeInput.appendChild(document.createTextNode("Qt: "));
    quantidadeInput.appendChild(quantidadeInputValue);
    divQuantidade.appendChild(quantidadeInput);

    // Botão de incremento
    const botaoIncremento = document.createElement("button");
    botaoIncremento.id = "btnmais-checkout";
    botaoIncremento.textContent = "+";
    divQuantidade.appendChild(botaoIncremento);

    // Adicionar a div de quantidade ao item do produto
    produtoItem.appendChild(divQuantidade);

    // Preço total
    const precoTotal = document.createElement("p");
    precoTotal.id = "valor-total-checkout";
    precoTotal.textContent = `Preço Total: R$ ${produto.preco.toFixed(2)}`;
    produtoItem.appendChild(precoTotal);

    // Botão para remover o produto do carrinho
    const botaoRemover = document.createElement("button");
    botaoRemover.classList.add("remover-checkout", "FGtam1");
    const imagemRemover = document.createElement("img");
    imagemRemover.src = "./imagens/clear.png";
    imagemRemover.alt = "clear";
    botaoRemover.appendChild(imagemRemover);
    botaoRemover.addEventListener("click", () => removerProdutoDoCarrinho(produto.id));

    // Adicionar o botão de remoção ao item do produto
    produtoItem.appendChild(botaoRemover);

    // Adicionar o item do produto à lista de produtos
    listaProdutos.appendChild(produtoItem);

    // Event listener para o botão de incremento
    botaoIncremento.addEventListener("click", () => {
      const quantidadeInput = produtoItem.querySelector("#counterValue");
      let quantidade = parseInt(quantidadeInput.value, 10);
      quantidade++;
      quantidadeInput.value = quantidade;
      atualizarPrecoTotal(produtoItem, quantidade, produto.preco);
      atualizarValorTotal(); // Atualizar o valor total ao alterar a quantidade
    });

    // Event listener para o botão de decremento
    botaoDecremento.addEventListener("click", () => {
      const quantidadeInput = produtoItem.querySelector("#counterValue");
      let quantidade = parseInt(quantidadeInput.value, 10);
      if (quantidade > 1) {
        quantidade--;
        quantidadeInput.value = quantidade;
        atualizarPrecoTotal(produtoItem, quantidade, produto.preco);
        atualizarValorTotal(); // Atualizar o valor total ao alterar a quantidade
      }
    });
  });

  // Função para atualizar o preço total com base na quantidade
  function atualizarPrecoTotal(produtoItem, quantidade, precoUnitario) {
    const precoTotalElement = produtoItem.querySelector("#valor-total-checkout");
    const novoPrecoTotal = quantidade * precoUnitario;
    precoTotalElement.textContent = `Preço Total: R$ ${novoPrecoTotal.toFixed(2)}`;
  }

  // Chame a função para atualizar o valor total inicialmente
  atualizarValorTotal();
});