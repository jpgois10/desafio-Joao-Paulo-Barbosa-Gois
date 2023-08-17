import cardapio from './cardapio-lanchonete.js';

class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens) {
    metodoDePagamento = metodoDePagamento.toLowerCase();
    metodoDePagamento = metodoDePagamento.replace(/é/g, "e");

    if (
      metodoDePagamento !== "dinheiro" &&
      metodoDePagamento !== "debito" &&
      metodoDePagamento !== "credito"
    ) {
      return "Forma de pagamento inválida!";
    }

    if (itens.length === 0) return "Não há itens no carrinho de compra!";

    const carrinho = {};
    let valorTotal = 0;

    for (const item of itens) {
      const itemFormatado = item.split(",");
      const codigo = itemFormatado[0];
      const quantidade = parseInt(itemFormatado[1]);

      if (!cardapio[codigo]) {
        return "Item inválido!";
      }

      if (!carrinho[codigo]) {
        carrinho[codigo] = 0;
      }

      carrinho[codigo] += quantidade;
    }

    for (const codigo in carrinho) {
      const item = cardapio[codigo];
      const quantidade = carrinho[codigo];

      if (codigo === "chantily" && !carrinho["cafe"]) {
        return "Item extra não pode ser pedido sem o principal";
      }

      if (codigo === "queijo" && !carrinho["sanduiche"]) {
        return "Item extra não pode ser pedido sem o principal";
      }

      if (quantidade <= 0) {
        return "Quantidade inválida!";
      }

      valorTotal += item.valor * quantidade;
    }

    if (metodoDePagamento === "dinheiro") {
      valorTotal -= valorTotal * 0.05;
    } else if (metodoDePagamento === "credito") {
      valorTotal += valorTotal * 0.03;
    }

    return `R$ ${valorTotal.toFixed(2).replace(".", ",")}`;
  }
}

const caixa = new CaixaDaLanchonete();
console.log(caixa.calcularValorDaCompra("debito", ["chantily,1"])); // "Item extra não pode ser pedido sem o principal"
console.log(caixa.calcularValorDaCompra("debito", ["cafe,1", "chantily,1"])); // "R$ 4.50"
console.log(caixa.calcularValorDaCompra("credito", ["combo1,1", "cafe,2"])); // "R$ 15.96"

export { CaixaDaLanchonete };
