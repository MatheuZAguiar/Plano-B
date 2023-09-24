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

  // Verifica se o carrinho está vazio e recarrega a página se estiver
  if (carrinhoDeCompras.length === 0) {
    window.location.reload();
  }
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
    // Recarregue a página para refletir a remoção do produto
    window.location.reload();
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

function irParaProximoPasso() {
  // Esconde o carrinho de compras
  document.getElementById("carrinho").style.display = "none";
  
  // Exibe o formulário de medidas
  document.getElementById("formulario-medidas").style.display = "flex";
}


document.addEventListener("DOMContentLoaded", function () {
  // Carregar o carrinho do localStorage
  carregarCarrinhoDoLocalStorage();

  // Selecionar a lista de produtos no carrinho
  const listaProdutos = document.getElementById("lista-produtos");

// Função para calcular o valor total com base nos elementos "valor-total-checkout"
function calcularValorTotal() {
  const elementosPrecoTotal = document.querySelectorAll("#valor-total-checkout");
  let valorTotal = 0;

  elementosPrecoTotal.forEach((elemento) => {
    const precoTexto = elemento.textContent.split("R$ ")[1];
    const preco = parseFloat(precoTexto);
    valorTotal += preco;
  });

  return valorTotal.toFixed(2);
}
// Chame a função para calcular o valor total e atualizar o elemento "valor-total"
function atualizarValorTotal() {
  const valorTotal = calcularValorTotal();
  const valorTotalElement = document.getElementById("valor-total");
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

// Função para finalizar a compra e abrir o WhatsApp com a mensagem em uma nova janela
function finalizarCompra() {
  const altura = parseFloat(document.getElementById("altura").value);
  const busto = parseFloat(document.getElementById("busto").value);
  const cintura = parseFloat(document.getElementById("cintura").value);
  const quadril = parseFloat(document.getElementById("quadril").value);

  // Obtenha a quantidade, nome e valor subtotal de cada produto a partir dos elementos HTML
  const produtosInfo = [];
  const elementosQuantidade = document.querySelectorAll("#counterValue");
  const elementosNomeProduto = document.querySelectorAll("#produto-checkout");
  const elementosValorSubtotal = document.querySelectorAll("#valor-total-checkout");

  elementosQuantidade.forEach((elemento, index) => {
    const quantidade = parseInt(elemento.value, 10);
    const nomeProduto = elementosNomeProduto[index].textContent;
    const valorSubtotalTexto = elementosValorSubtotal[index].textContent.split("R$ ")[1];
    const valorSubtotal = parseFloat(valorSubtotalTexto);
    produtosInfo.push({ quantidade, nomeProduto, valorSubtotal });
  });

  // Calcula o valor total somando os subtotais de todos os produtos
  const valorTotal = produtosInfo.reduce((total, produto) => total + produto.valorSubtotal, 0);

  // Construa a mensagem com os dados da cliente, produtos, quantidades, nomes, valores subtotal e valor total
  const mensagem = `Oi! Tenho interesse nos seguintes produtos:\n\n${listaProdutosParaMensagem(
    produtosInfo
  )}\n\nMedidas:\nAltura: ${altura} cm\nBusto: ${busto} cm\nCintura: ${cintura} cm\nQuadril: ${quadril} cm\nValor Total: R$ ${valorTotal.toFixed(
    2
  )}`;

  // Encode a mensagem para que possa ser usada na URL
  const mensagemCodificada = encodeURIComponent(mensagem);

  // Substitua o número de telefone pela URL correta do WhatsApp
  const numeroWhatsApp = "45998143277"; // Substitua pelo número correto
  const linkWhatsApp = `https://wa.me/${numeroWhatsApp}/?text=${mensagemCodificada}`;

  // Abra o WhatsApp em uma nova janela ou guia
  window.open(linkWhatsApp, "_blank");
}

function listaProdutosParaMensagem(produtosInfo) {
  const produtos = produtosInfo.map((produtoInfo) => {
    const quantidade = produtoInfo.quantidade; // Pegue a quantidade do objeto produtosInfo
    return `${quantidade}x ${produtoInfo.nomeProduto} - Subtotal: R$ ${produtoInfo.valorSubtotal.toFixed(2)}`;
  });

  return produtos.join("\n");
}


// Função para verificar se todos os campos do formulário estão preenchidos
function verificarCampos() {
  const altura = parseFloat(document.getElementById("altura").value);
  const busto = parseFloat(document.getElementById("busto").value);
  const cintura = parseFloat(document.getElementById("cintura").value);
  const quadril = parseFloat(document.getElementById("quadril").value);
  const botaoFinalizar = document.getElementById("finalizar-compra");

  if (!isNaN(altura) && !isNaN(busto) && !isNaN(cintura) && !isNaN(quadril) &&
      altura >= 0 && busto >= 0 && cintura >= 0 && quadril >= 0) {
    botaoFinalizar.disabled = false;
    const botaoFinalizarCompra = document.getElementById("finalizar-compra");
botaoFinalizarCompra.addEventListener("click", finalizarCompra);
  } else {
    botaoFinalizar.disabled = true;
  }
}

// Adicionar um ouvinte de eventos de entrada para os campos
const campos = document.querySelectorAll("input[type=number]");
campos.forEach((campo) => {
  campo.addEventListener("input", verificarCampos);
});

function voltarAoCarrinho() {
  // Oculta o formulário de medidas
  document.getElementById("formulario-medidas").style.display = "none";

  // Mostra o carrinho de compras novamente
  document.getElementById("carrinho").style.display = "block";
}


// Função para agrupar produtos pelo nome e contar a quantidade
function agruparProdutosPorQuantidade(produtos) {
  const produtosAgrupados = [];
  produtos.forEach((produto) => {
    const produtoExistente = produtosAgrupados.find((p) => p.nome === produto.nome);
    if (produtoExistente) {
      produtoExistente.quantidade++;
    } else {
      produtosAgrupados.push({ nome: produto.nome, quantidade: 1 });
    }
  });
  return produtosAgrupados;
}